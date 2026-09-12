/**
 * One-off asset pass: downscale and re-encode the profile photo.
 * Run with `npm run optimize:img` after dropping a new source image in public/.
 */
import { stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const target = path.join(root, 'public', 'rishav.jpg')

const before = (await stat(target)).size
const meta = await sharp(target).metadata()

// sharp can't write to the file it's reading — buffer first.
const output = await sharp(target)
  .resize({ width: 900, withoutEnlargement: true })
  .jpeg({ quality: 82, mozjpeg: true })
  .toBuffer()

await sharp(output).toFile(target)
const after = (await stat(target)).size

const kb = (n) => `${(n / 1024).toFixed(0)} KB`
console.log(`${meta.width}x${meta.height} ${kb(before)}  ->  900w ${kb(after)}`)
console.log(`saved ${(100 - (after / before) * 100).toFixed(1)}%`)
