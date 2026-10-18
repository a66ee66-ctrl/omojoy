// Optimises original photographs for the web.
// Usage: npm run images
// Reads every image in assets/originals/<folder>/ and writes a resized,
// metadata-stripped JPEG to src/assets/images/<folder>/ with the same name.
// next/image then serves modern formats (AVIF/WebP) at responsive sizes.
import fs from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const SRC = path.resolve("assets/originals")
const OUT = path.resolve("src/assets/images")
const MAX_EDGE = 2000

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((e) => {
      const p = path.join(dir, e.name)
      return e.isDirectory() ? walk(p) : [p]
    })
  )
  return files.flat().filter((f) => /\.(jpe?g|png|webp|heic|tiff?)$/i.test(f))
}

const files = await walk(SRC)
await Promise.all(
  files.map(async (file) => {
    const rel = path.relative(SRC, file).replace(/\.[^.]+$/, ".jpg")
    const dest = path.join(OUT, rel)
    await fs.mkdir(path.dirname(dest), { recursive: true })
    const info = await sharp(file)
      .rotate()
      .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 84, mozjpeg: true, progressive: true })
      .toFile(dest)
    console.log(`${rel}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}kB`)
  })
)
console.log(`Optimised ${files.length} images.`)
