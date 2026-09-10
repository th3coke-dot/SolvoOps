import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { createServer } from 'node:net'
import path from 'node:path'
import { connect, launchChrome, newPage } from './cdp.mjs'

const DEFAULT_BASE = 'http://127.0.0.1:4173'
const DEFAULT_OUT = 'artifacts/home-measure'
const DEFAULT_VIEWPORTS = [
  '1440x900',
  '1280x800',
  '1024x768',
  '390x844',
  '360x780',
  '320x720',
]
const MOBILE_NAV_MAX_WIDTH = 959
const PREVIEW_PORT = 4173
const SETTLE_MS = 900

function parseViewport(spec) {
  const match = /^(\d+)x(\d+)$/.exec(spec ?? '')
  if (!match) {
    throw new Error(`invalid --viewport ${spec}`)
  }
  return {
    label: spec,
    width: Number(match[1]),
    height: Number(match[2]),
  }
}

function parseArgs(argv) {
  let url
  let out = DEFAULT_OUT
  const viewports = []
  for (let i = 0; i < argv.length; i += 1) {
    const flag = argv[i]
    if (flag === '--url') {
      url = argv[i + 1]
      i += 1
      continue
    }
    if (flag === '--out') {
      out = argv[i + 1]
      i += 1
      continue
    }
    if (flag === '--viewport') {
      viewports.push(parseViewport(argv[i + 1]))
      i += 1
      continue
    }
    throw new Error(`unknown argument: ${flag}`)
  }
  return {
    url,
    out,
    viewports:
      viewports.length > 0
        ? viewports
        : DEFAULT_VIEWPORTS.map(parseViewport),
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function waitForOk(url, timeoutMs = 30000) {
  const started = Date.now()
  let lastError = 'no attempt'
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url)
      if (response.ok) {
        return
      }
      lastError = `${response.status} ${response.statusText}`
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error)
    }
    await sleep(150)
  }
  throw new Error(`timeout waiting for ${url}: ${lastError}`)
}

function freePort() {
  return new Promise((resolve, reject) => {
    const server = createServer()
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      const port = typeof address === 'object' && address ? address.port : 0
      server.close((error) => {
        if (error) {
          reject(error)
          return
        }
        resolve(port)
      })
    })
    server.on('error', reject)
  })
}

function spawnPreview() {
  return spawn(
    'npx',
    ['vite', 'preview', '--port', String(PREVIEW_PORT), '--strictPort'],
    {
      cwd: '/workspace',
      stdio: ['ignore', 'pipe', 'pipe'],
      detached: true,
    },
  )
}

function killProcess(proc) {
  if (!proc || proc.exitCode != null) {
    return
  }
  try {
    process.kill(-proc.pid, 'SIGTERM')
  } catch {
    try {
      proc.kill('SIGTERM')
    } catch {
      return
    }
  }
}

function once(client, event, timeoutMs = 30000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`timeout waiting for ${event}`))
    }, timeoutMs)
    client.on(event, (params) => {
      clearTimeout(timer)
      resolve(params)
    })
  })
}

function measureHome(width, height) {
  const round1 = (n) => Math.round(n * 10) / 10
  const rectOf = (el) => {
    if (!el) {
      return null
    }
    const box = el.getBoundingClientRect()
    return {
      top: round1(box.top),
      left: round1(box.left),
      right: round1(box.right),
      bottom: round1(box.bottom),
      width: round1(box.width),
      height: round1(box.height),
    }
  }
  const intersects = (a, b) => {
    if (!a || !b) {
      return false
    }
    return (
      a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
    )
  }

  const doc = document.documentElement
  const documentHeight = round1(doc.scrollHeight)
  const innerHeight = round1(window.innerHeight)
  const title =
    document.querySelector('.cinematic-hero__title') ??
    document.querySelector('h1')
  const lineEls = document.querySelectorAll('.cinematic-hero__title-line')
  const titleLines =
    lineEls.length > 0
      ? [...lineEls].map((el) => el.textContent ?? '')
      : [title?.textContent ?? '']
  const eyebrowRect = rectOf(document.querySelector('.cinematic-hero__eyebrow'))
  const navRect = rectOf(document.querySelector('.cinematic-nav'))
  const gapAboveEyebrowPx =
    eyebrowRect && navRect ? round1(eyebrowRect.top - navRect.bottom) : null
  const cards = [...document.querySelectorAll('.cinematic-product')].map(
    (el) => {
      const rect = rectOf(el)
      return {
        name: el.querySelector('h3')?.textContent ?? '',
        rect,
        fullyInFold: Boolean(
          rect &&
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= height &&
            rect.right <= width,
        ),
        previewRect: rectOf(el.querySelector('.product-example')),
      }
    },
  )
  const sceneControlsRect = rectOf(
    document.querySelector('.cinematic-scene__controls'),
  )
  const clipsViewport = (rect) =>
    Boolean(rect && (rect.left < 0 || rect.right > width))
  const controlButtons = [
    ...document.querySelectorAll('.cinematic-controls__btn'),
  ].map(rectOf)
  const toggle = document.querySelector('.cinematic-nav__toggle')
  const toggleRect = rectOf(toggle)
  const toggleHit =
    toggleRect &&
    document.elementFromPoint(
      toggleRect.left + toggleRect.width / 2,
      toggleRect.top + toggleRect.height / 2,
    )

  return {
    viewport: { width, height },
    scroll: {
      documentHeight,
      innerHeight,
      verticalOverflowPx: round1(doc.scrollHeight - window.innerHeight),
      horizontalOverflowPx: round1(doc.scrollWidth - window.innerWidth),
    },
    hero: {
      titleRect: rectOf(title),
      ledeRect: rectOf(document.querySelector('.cinematic-hero__lede')),
      actionsRect: rectOf(document.querySelector('.cinematic-hero__actions')),
      eyebrowRect,
      titleLines,
      gapAboveEyebrowPx,
    },
    cards,
    nav: {
      toggleRect,
      toggleShown: Boolean(toggle) && getComputedStyle(toggle).display !== 'none',
      toggleHitsSelf: Boolean(toggleHit?.closest('.cinematic-nav__toggle')),
      toggleClipped: clipsViewport(toggleRect),
      toggleOverlapsBrand: intersects(
        toggleRect,
        rectOf(document.querySelector('.cinematic-nav__brand')),
      ),
    },
    controlButtonCount: controlButtons.length,
    controlsClipped:
      clipsViewport(sceneControlsRect) || controlButtons.some(clipsViewport),
    sceneControlsRect,
    sceneControlsOverlapsCard: cards.some((card) =>
      intersects(sceneControlsRect, card.rect),
    ),
    ctaRadii: [...document.querySelectorAll('.cinematic-hero__actions a')].map(
      (el) => getComputedStyle(el).borderRadius,
    ),
  }
}

function measureNavOpen(width, height) {
  const round1 = (n) => Math.round(n * 10) / 10
  const rectOf = (el) => {
    if (!el) {
      return null
    }
    const box = el.getBoundingClientRect()
    return {
      top: round1(box.top),
      left: round1(box.left),
      right: round1(box.right),
      bottom: round1(box.bottom),
      width: round1(box.width),
      height: round1(box.height),
    }
  }
  const overlaps = (a, b) =>
    Boolean(
      a &&
        b &&
        a.left < b.right &&
        a.right > b.left &&
        a.top < b.bottom &&
        a.bottom > b.top,
    )

  const panel = document.querySelector('.cinematic-nav__mobile')
  const panelRect = rectOf(panel)
  const links = [...(panel?.querySelectorAll('a') ?? [])].map((el) =>
    rectOf(el),
  )
  const controls = document.querySelector('.cinematic-scene__controls')
  const controlsHidden =
    !controls || getComputedStyle(controls).visibility === 'hidden'

  return {
    expanded:
      document
        .querySelector('.cinematic-nav__toggle')
        ?.getAttribute('aria-expanded') ?? null,
    dataOpen: panel?.getAttribute('data-open') ?? null,
    panelRect,
    panelClipped: Boolean(
      panelRect && (panelRect.left < 0 || panelRect.right > width),
    ),
    linkCount: links.length,
    smallestLinkHeight:
      links.length > 0 ? Math.min(...links.map((rect) => rect?.height ?? 0)) : null,
    linksBelowFold: links.filter((rect) => (rect?.bottom ?? 0) > height).length,
    controlsHidden,
    controlsCollide: !controlsHidden && overlaps(panelRect, rectOf(controls)),
  }
}

function formatRect(rect) {
  if (!rect) {
    return 'null'
  }
  return `${rect.width}x${rect.height} @ ${rect.left},${rect.top} bottom=${rect.bottom}`
}

function printReport(rows) {
  for (const row of rows) {
    const label = `${row.viewport.width}x${row.viewport.height}`
    console.log(label)
    console.log(
      `  scroll  doc=${row.scroll.documentHeight} inner=${row.scroll.innerHeight} v=${row.scroll.verticalOverflowPx} h=${row.scroll.horizontalOverflowPx}`,
    )
    console.log(`  hero    title ${formatRect(row.hero.titleRect)}`)
    console.log(`          lede ${formatRect(row.hero.ledeRect)}`)
    console.log(`          actions ${formatRect(row.hero.actionsRect)}`)
    console.log(`          eyebrow ${formatRect(row.hero.eyebrowRect)}`)
    console.log(`          lines ${JSON.stringify(row.hero.titleLines)}`)
    console.log(`          gapAboveEyebrowPx=${row.hero.gapAboveEyebrowPx}`)
    if (row.cards.length === 0) {
      console.log('  cards   (none)')
    } else {
      for (const card of row.cards) {
        console.log(
          `  card    ${card.name} ${formatRect(card.rect)} inFold=${card.fullyInFold}`,
        )
      }
    }
    console.log(
      `  scene   ${formatRect(row.sceneControlsRect)} overlapsCard=${row.sceneControlsOverlapsCard}`,
    )
    console.log(
      `  cta     ${row.ctaRadii.length > 0 ? row.ctaRadii.join(' | ') : '(none)'}`,
    )
    console.log(
      `  nav     toggle ${formatRect(row.nav.toggleRect)} shown=${row.nav.toggleShown} hitsSelf=${row.nav.toggleHitsSelf} clipped=${row.nav.toggleClipped} overlapsBrand=${row.nav.toggleOverlapsBrand}`,
    )
    console.log(
      `  menu    expanded=${row.navOpen.expanded} links=${row.navOpen.linkCount} minLinkH=${row.navOpen.smallestLinkHeight} belowFold=${row.navOpen.linksBelowFold} clipped=${row.navOpen.panelClipped} ctrlHidden=${row.navOpen.controlsHidden} ctrlCollide=${row.navOpen.controlsCollide}`,
    )
    console.log(
      `  ctrls   buttons=${row.controlButtonCount} clipped=${row.controlsClipped}`,
    )
    console.log('')
  }
}

function ctaIsPill(value) {
  const text = String(value)
  if (text.includes('%')) {
    return true
  }
  const px = [...text.matchAll(/(-?[\d.]+)px/g)].map((match) => Number(match[1]))
  return px.length > 0 && px.every((n) => n >= 100)
}

function atViewport(rows, width, height) {
  return rows.find(
    (row) => row.viewport.width === width && row.viewport.height === height,
  )
}

/** @typedef {'pass' | 'fail' | 'skip'} CheckStatus */

/** @returns {CheckStatus} */
function statusFor(measured, ok) {
  if (!measured) return 'skip'
  return ok ? 'pass' : 'fail'
}

function evaluateChecks(rows) {
  const desktop = atViewport(rows, 1440, 900)
  const mobile = atViewport(rows, 390, 844)
  const narrow = rows.filter(
    (row) => row.viewport.width <= MOBILE_NAV_MAX_WIDTH,
  )
  const lastCard = desktop?.cards.at(-1)
  return [
    {
      name: '1440x900: all three cards fully in fold',
      status: statusFor(
        desktop,
        desktop?.cards.length === 3 &&
          desktop.cards.every((card) => card.fullyInFold === true),
      ),
    },
    {
      name: '1440x900: no vertical overflow of the hero+deck composition',
      status: statusFor(desktop, lastCard?.rect && lastCard.rect.bottom <= 900),
    },
    {
      name: '390x844: no horizontal overflow',
      status: statusFor(mobile, mobile?.scroll.horizontalOverflowPx <= 0),
    },
    {
      name: 'all viewports: scene controls clear of cards',
      status: statusFor(
        rows.length > 0,
        rows.every((row) => row.sceneControlsOverlapsCard === false),
      ),
    },
    {
      name: 'all viewports: CTA buttons are pills',
      status: statusFor(
        rows.length > 0,
        rows.every((row) => row.ctaRadii.every((radius) => ctaIsPill(radius))),
      ),
    },
    {
      name: 'all viewports: scene controls are not clipped',
      status: statusFor(
        rows.length > 0,
        rows.every((row) => row.controlsClipped === false),
      ),
    },
    {
      name: 'narrow viewports: nav toggle is visible and hit-testable',
      status: statusFor(
        narrow.length > 0,
        narrow.every(
          (row) =>
            row.nav.toggleShown &&
            row.nav.toggleHitsSelf &&
            !row.nav.toggleClipped &&
            !row.nav.toggleOverlapsBrand &&
            (row.nav.toggleRect?.width ?? 0) >= 44 &&
            (row.nav.toggleRect?.height ?? 0) >= 44,
        ),
      ),
    },
    {
      name: 'narrow viewports: open menu is reachable and tappable',
      status: statusFor(
        narrow.length > 0,
        narrow.every(
          (row) =>
            row.navOpen.expanded === 'true' &&
            row.navOpen.dataOpen === 'true' &&
            row.navOpen.linkCount >= 4 &&
            (row.navOpen.smallestLinkHeight ?? 0) >= 44 &&
            row.navOpen.linksBelowFold === 0 &&
            !row.navOpen.panelClipped,
        ),
      ),
    },
    {
      name: 'narrow viewports: open menu does not bury the scene controls',
      status: statusFor(
        narrow.length > 0,
        narrow.every((row) => row.navOpen.controlsCollide === false),
      ),
    },
  ]
}

async function measureViewport(page, base, viewport) {
  await page.send('Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.width < 600,
  })
  const loaded = once(page, 'Page.loadEventFired')
  await page.send('Page.navigate', { url: `${base}/` })
  await loaded
  await sleep(SETTLE_MS)
  const evaluated = await page.send('Runtime.evaluate', {
    expression: `(${measureHome.toString()})(${viewport.width}, ${viewport.height})`,
    returnByValue: true,
  })
  if (evaluated.exceptionDetails) {
    throw new Error(
      evaluated.exceptionDetails.text ??
        JSON.stringify(evaluated.exceptionDetails),
    )
  }
  const shot = await page.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false,
  })

  await page.send('Runtime.evaluate', {
    expression: `document.querySelector('.cinematic-nav__toggle')?.click()`,
  })
  await sleep(250)
  const opened = await page.send('Runtime.evaluate', {
    expression: `(${measureNavOpen.toString()})(${viewport.width}, ${viewport.height})`,
    returnByValue: true,
  })
  const openShot = await page.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false,
  })

  return {
    measurement: { ...evaluated.result.value, navOpen: opened.result.value },
    png: Buffer.from(shot.data, 'base64'),
    openPng: Buffer.from(openShot.data, 'base64'),
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const ownsPreview = args.url == null
  const base = (args.url ?? DEFAULT_BASE).replace(/\/$/, '')
  await mkdir(args.out, { recursive: true })

  let preview
  let chrome
  let page
  let failed = true
  try {
    if (ownsPreview) {
      preview = spawnPreview()
      await waitForOk(`${base}/`)
    }
    const port = await freePort()
    chrome = await launchChrome({ port })
    const wsUrl = await newPage(port)
    page = await connect(wsUrl)
    await page.send('Page.enable')
    await page.send('Runtime.enable')

    const rows = []
    for (const viewport of args.viewports) {
      const { measurement, png, openPng } = await measureViewport(
        page,
        base,
        viewport,
      )
      await writeFile(path.join(args.out, `${viewport.label}.png`), png)
      await writeFile(
        path.join(args.out, `${viewport.label}-menu-open.png`),
        openPng,
      )
      rows.push(measurement)
    }

    await writeFile(
      path.join(args.out, 'measurements.json'),
      `${JSON.stringify(rows, null, 2)}\n`,
    )

    printReport(rows)
    const checks = evaluateChecks(rows)
    failed = false
    for (const check of checks) {
      switch (check.status) {
        case 'pass':
          console.log(`PASS  ${check.name}`)
          break
        case 'fail':
          console.log(`FAIL  ${check.name}`)
          failed = true
          break
        case 'skip':
          console.log(`SKIP  ${check.name} (viewport not measured)`)
          break
        default: {
          const exhaustive = check.status
          throw new Error(`unhandled check status: ${exhaustive}`)
        }
      }
    }
  } finally {
    try {
      page?.close()
    } catch {}
    try {
      chrome?.kill('SIGKILL')
    } catch {}
    killProcess(preview)
  }
  process.exit(failed ? 1 : 0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
