// يصنع أيقونات التطبيق (PNG) من الشعار. شغّله بعد أي تغيير في الشعار:
//   node scripts/make-icons.mjs
import { mkdir, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const RING = 'M34.19 14.13A18 18 0 1 0 49.87 29.81'
const DOT = { cx: 44.73, cy: 19.27, r: 5 }

// scale: حجم الشعار نسبة إلى الأيقونة. الأيقونة القابلة للقص (maskable) تحتاج هامشاً أكبر
function iconSvg(scale) {
  const offset = 32 - 32 * scale
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#FBF8F2"/>
  <g transform="translate(${offset} ${offset}) scale(${scale})">
    <path d="${RING}" fill="none" stroke="#BF9730" stroke-width="8" stroke-linecap="round"/>
    <circle cx="${DOT.cx}" cy="${DOT.cy}" r="${DOT.r}" fill="#000000"/>
  </g>
</svg>`
}

const ICONS = [
  { file: 'pwa-192.png', size: 192, scale: 0.86 },
  { file: 'pwa-512.png', size: 512, scale: 0.86 },
  { file: 'pwa-1024.png', size: 1024, scale: 0.86 },
  { file: 'maskable-512.png', size: 512, scale: 0.66 },
  { file: 'apple-touch-icon.png', size: 180, scale: 0.8 },
]

await mkdir('public/icons', { recursive: true })
for (const icon of ICONS) {
  const png = await sharp(Buffer.from(iconSvg(icon.scale)), { density: 1200 })
    .resize(icon.size, icon.size, { kernel: 'lanczos3' })
    .png()
    .toBuffer()
  await writeFile(`public/icons/${icon.file}`, png)
  console.log(`public/icons/${icon.file}`)
}
