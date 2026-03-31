/**
 * Generates all PNG icon variants from public/favicon.svg
 * Run once after changing the SVG:  node scripts/generate-icons.mjs
 * Requires:  npm install --save-dev sharp
 */
import sharp from 'sharp'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root      = join(__dirname, '..')
const svg       = readFileSync(join(root, 'public/favicon.svg'))

const icons = [
  { file: 'icon-192.png',         size: 192 },
  { file: 'icon-512.png',         size: 512 },
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'favicon-32x32.png',    size: 32  },
]

for (const { file, size } of icons) {
  await sharp(svg)
    .resize(size, size)
    .png()
    .toFile(join(root, 'public', file))
  console.log(`✓  ${file}  (${size}×${size})`)
}

console.log('\nAll icons generated. Commit the files in public/ and run npm run build.')
