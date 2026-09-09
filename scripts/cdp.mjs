import { spawn } from 'node:child_process'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = '/usr/local/bin/google-chrome'

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function waitForOk(url, timeoutMs = 20000) {
  const started = Date.now()
  let lastError = 'no attempt'
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url)
      if (response.ok) {
        return response
      }
      lastError = `${response.status} ${response.statusText}`
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error)
    }
    await sleep(100)
  }
  throw new Error(`timeout waiting for ${url}: ${lastError}`)
}

export async function launchChrome({ port }) {
  const userDataDir = await mkdtemp(join(tmpdir(), 'cdp-chrome-'))
  const stderr = []
  const proc = spawn(
    CHROME,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars=false',
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${userDataDir}`,
      'about:blank',
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] },
  )
  proc.stderr.on('data', (chunk) => {
    stderr.push(chunk)
  })
  try {
    await waitForOk(`http://127.0.0.1:${port}/json/version`)
  } catch (error) {
    proc.kill('SIGKILL')
    const text = Buffer.concat(stderr).toString()
    const reason = error instanceof Error ? error.message : String(error)
    throw new Error(`${reason}\nchrome stderr:\n${text}`)
  }
  return proc
}

export function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl)
    let nextId = 1
    let opened = false
    const pending = new Map()
    const listeners = new Map()

    function rejectAll(error) {
      for (const waiter of pending.values()) {
        waiter.reject(error)
      }
      pending.clear()
    }

    ws.addEventListener('open', () => {
      opened = true
      resolve({
        send(method, params) {
          const id = nextId
          nextId += 1
          return new Promise((res, rej) => {
            pending.set(id, { resolve: res, reject: rej })
            ws.send(JSON.stringify({ id, method, params }))
          })
        },
        on(event, handler) {
          const list = listeners.get(event) ?? []
          list.push(handler)
          listeners.set(event, list)
        },
        close() {
          ws.close()
        },
      })
    })

    ws.addEventListener('message', (event) => {
      const message = JSON.parse(String(event.data))
      if (message.id != null) {
        const waiter = pending.get(message.id)
        if (!waiter) {
          return
        }
        pending.delete(message.id)
        if (message.error) {
          waiter.reject(
            new Error(message.error.message ?? JSON.stringify(message.error)),
          )
          return
        }
        if (message.result?.error) {
          waiter.reject(
            new Error(
              message.result.error.message ??
                JSON.stringify(message.result.error),
            ),
          )
          return
        }
        waiter.resolve(message.result)
        return
      }
      if (message.method) {
        for (const handler of listeners.get(message.method) ?? []) {
          handler(message.params)
        }
      }
    })

    ws.addEventListener('error', () => {
      const error = new Error(`WebSocket error for ${wsUrl}`)
      if (!opened) {
        reject(error)
        return
      }
      rejectAll(error)
    })

    ws.addEventListener('close', () => {
      rejectAll(new Error('WebSocket closed'))
    })
  })
}

export async function newPage(port) {
  const created = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {
    method: 'POST',
  })
  if (created.ok) {
    const target = await created.json()
    return target.webSocketDebuggerUrl
  }
  if (created.status !== 405) {
    throw new Error(
      `POST /json/new failed: ${created.status} ${created.statusText}`,
    )
  }
  const versionResponse = await fetch(`http://127.0.0.1:${port}/json/version`)
  if (!versionResponse.ok) {
    throw new Error(`GET /json/version failed: ${versionResponse.status}`)
  }
  const version = await versionResponse.json()
  const browser = await connect(version.webSocketDebuggerUrl)
  try {
    const { targetId } = await browser.send('Target.createTarget', {
      url: 'about:blank',
    })
    return `ws://127.0.0.1:${port}/devtools/page/${targetId}`
  } finally {
    browser.close()
  }
}
