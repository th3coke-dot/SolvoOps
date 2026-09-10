// Rebuild the editable share artwork with the site's original logo and scene.
// Usage: node scripts/generate-share-card.mjs [output.jpg]
// Build-time artwork only; this renderer is not shipped to visitors.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const output = resolve(process.argv[2] || `${root}/public/og-solvoops-aurora-v1.jpg`)
const asset = async (path, mime) => `data:${mime};base64,${(await readFile(`${root}/public/${path}`)).toString('base64')}`
const scene = await readFile(`${root}/src/components/BrandScene.tsx`, 'utf8')
const edge = scene.match(/const SKY_EDGE = '([^']+)'/)[1]
const terrain = await asset('scene/blue-hour.jpg', 'image/jpeg')
// Encode the existing sky as PNG for SVG rasterizers without embedded WebP support.
const sky = `data:image/png;base64,${(await sharp(`${root}/public/scene/aurora-sky.webp`).png().toBuffer()).toString('base64')}`
const logo = await asset('brand/solvoops-horizontal-dark.png', 'image/png')
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <clipPath id="sky"><path d="${edge}"/></clipPath>
    <clipPath id="water"><rect y="401" width="1280" height="319"/></clipPath>
    <linearGradient id="shade"><stop stop-color="#041520" stop-opacity=".88"/><stop offset=".65" stop-color="#041520" stop-opacity=".22"/><stop offset="1" stop-color="#041520" stop-opacity=".04"/></linearGradient>
    <linearGradient id="base" x2="0" y2="1"><stop offset=".6" stop-color="#06171d" stop-opacity="0"/><stop offset="1" stop-color="#06171d" stop-opacity=".92"/></linearGradient>
    <g id="landscape">
      <image xlink:href="${terrain}" width="1280" height="720"/>
      <image xlink:href="${sky}" width="1280" height="335" preserveAspectRatio="none" clip-path="url(#sky)"/>
    </g>
  </defs>
  <svg width="1200" height="630" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice">
    <use xlink:href="#landscape"/>
    <g clip-path="url(#water)">
      <use xlink:href="#landscape" transform="translate(0 802) scale(1 -1)"/>
      <rect y="401" width="1280" height="319" fill="#041520" opacity=".28"/>
    </g>
  </svg>
  <rect width="1200" height="630" fill="url(#shade)"/>
  <rect width="1200" height="630" fill="url(#base)"/>
  <image xlink:href="${logo}" x="46" y="35" width="355" height="108"/>
  <g font-family="Nimbus Sans, Arial, sans-serif" fill="#f0f3ef">
    <text x="62" y="267" font-size="64" letter-spacing="-1.5">Clarity for</text>
    <text x="62" y="338" font-size="64" letter-spacing="-1.5" fill="#e9bf72">complex delivery.</text>
    <text x="65" y="401" font-size="24" fill="#d0dfdf">Understand the bid. Plan the work.</text>
    <text x="65" y="436" font-size="24" fill="#d0dfdf">Find the right partners.</text>
    <text x="65" y="570" font-size="22" fill="#e9bf72">SolvoPlan · SolvoFind · SolvoBid</text>
    <text x="1137" y="570" font-size="21" text-anchor="end" fill="#d0dfdf">solvoops.com</text>
  </g>
</svg>`
await mkdir(dirname(output), { recursive: true })
await writeFile(output, await sharp(Buffer.from(svg)).jpeg({ quality: 95, chromaSubsampling: '4:4:4' }).toBuffer())
console.log(output)
