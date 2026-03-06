/**
 * Generates OG image + app icons for thomasbustosv2
 * Design: V11 — white bg, T=purple, B=orange, rest black
 * Uses rsvg-convert (brew install librsvg)
 *
 * Usage: node scripts/generate-assets.mjs
 */

import { execSync } from 'child_process'
import { writeFileSync } from 'fs'
import { join } from 'path'
import { tmpdir } from 'os'

const ROOT = new URL('..', import.meta.url).pathname
const PURPLE = '#7C6AC4'
const ORANGE = '#F89151'

// Font installed at ~/Library/Fonts/DMSerifDisplay.ttf — rsvg-convert picks it up via fontconfig

// ─── Letter-color helper ───────────────────────────────────────

function coloredLetters(name, fontSize, defaultColor = '#111111') {
  let letterIdx = 0
  let spans = ''
  for (const char of name) {
    if (char === ' ') {
      spans += `<tspan dx="${fontSize * 0.28}">\u200B</tspan>`
      continue // spaces don't count toward letterIdx
    }
    let color = defaultColor
    if (letterIdx === 0) color = PURPLE   // T
    if (letterIdx === 6) color = ORANGE   // B
    spans += `<tspan fill="${color}">${char}</tspan>`
    letterIdx++
  }
  // dot — black
  spans += `<tspan fill="${defaultColor}">.</tspan>`
  return spans
}

// ─── OG Image — 1200×630 ──────────────────────────────────────

function ogSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">

  <rect width="1200" height="630" fill="#ffffff"/>

  <!-- Name: T=purple, B=orange, rest black -->
  <text
    x="110" y="325"
    font-family="'DM Serif Display', Georgia, serif"
    font-size="118"
    font-weight="normal"
    letter-spacing="-1"
    dominant-baseline="middle"
  >${coloredLetters('Thomas Bustos', 118)}</text>

  <!-- Tagline -->
  <text
    x="112" y="416"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="21"
    font-weight="400"
    fill="#a3a3a3"
    letter-spacing="3.5"
  >2X COFOUNDER  ·  BUILDER  ·  WRITER</text>

  <!-- URL -->
  <text
    x="1090" y="578"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="19"
    font-weight="300"
    fill="#d4d4d4"
    text-anchor="end"
    letter-spacing="1"
  >thomasbustos.com</text>
</svg>`
}

// ─── Icon — square, TB centered ───────────────────────────────

function iconSvg(size) {
  const fontSize = Math.round(size * 0.54)
  const y = Math.round(size * 0.68)
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">

  <rect width="${size}" height="${size}" fill="#ffffff"/>
  <text
    x="${size / 2}" y="${y}"
    text-anchor="middle"
    font-family="'DM Serif Display', Georgia, serif"
    font-size="${fontSize}"
    font-weight="normal"
    letter-spacing="-${Math.round(fontSize * 0.03)}"
  >
    <tspan fill="${PURPLE}">T</tspan><tspan fill="${ORANGE}">B</tspan>
  </text>
</svg>`
}

// ─── Write SVG → convert to PNG ───────────────────────────────

function svgToPng(svgContent, outPath, width, height) {
  const tmp = join(tmpdir(), `tb-${Date.now()}-${Math.random().toString(36).slice(2)}.svg`)
  writeFileSync(tmp, svgContent, 'utf8')
  execSync(`rsvg-convert -w ${width} -h ${height} "${tmp}" -o "${outPath}"`)
  console.log(`✓ ${outPath.replace(ROOT, '')}`)
}

// ─── Generate ─────────────────────────────────────────────────

console.log('Generating assets...\n')

// OG image
svgToPng(ogSvg(), join(ROOT, 'public/og-default.png'), 1200, 630)

// app/icon.png — 512×512 (used by Next.js for icon metadata)
svgToPng(iconSvg(512), join(ROOT, 'app/icon.png'), 512, 512)

// app/apple-icon.png — 180×180
svgToPng(iconSvg(512), join(ROOT, 'app/apple-icon.png'), 180, 180)

// app/favicon.ico — Next.js serves this at /favicon.ico
// rsvg-convert outputs PNG; we rename to .ico (modern browsers accept PNG-in-ICO path)
svgToPng(iconSvg(512), join(ROOT, 'app/favicon.ico'), 32, 32)

console.log('\nDone. Files written to public/ and app/')
