// Generates favicon/app icons and the Open Graph share image.
// Usage: npm run brand-assets  (run after `npm run images`)
import sharp from "sharp"

const IVORY = "#f8f3ec"
const ESPRESSO = "#2b211c"
const ROSE = "#b98b7f"
const SERIF = "Cormorant Garamond, Georgia, 'Times New Roman', serif"
const SANS = "Manrope, 'Helvetica Neue', Arial, sans-serif"

const monogram = (size) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="${ESPRESSO}"/>
  <rect x="7" y="7" width="86" height="86" fill="none" stroke="${ROSE}" stroke-width="1.2"/>
  <text x="50" y="66" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="52" fill="${IVORY}">JA</text>
</svg>`)

await sharp(monogram(512)).png().toFile("src/app/icon.png")
await sharp(monogram(180)).png().toFile("src/app/apple-icon.png")

// Open Graph: three-image editorial strip + wordmark panel.
const W = 1200
const H = 630
const photos = [
  ["src/assets/images/portfolio/golden-glam.jpg", 300, "attention"],
  ["src/assets/images/portfolio/bridal-updo-pearls.jpg", 210, "attention"],
  ["src/assets/images/portfolio/maternity-studio-hat.jpg", 210, "attention"],
]
let x = 0
const layers = []
for (const [file, w, position] of photos) {
  layers.push({ input: await sharp(file).resize(w, H, { fit: "cover", position }).toBuffer(), left: x, top: 0 })
  x += w + 6
}
const panelX = x + 34
const panel = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <text x="${panelX}" y="250" font-family="${SANS}" font-weight="600" font-size="20" letter-spacing="9" fill="${ESPRESSO}">JOYFUL</text>
  <text x="${panelX - 4}" y="335" font-family="${SERIF}" font-style="italic" font-size="96" fill="${ESPRESSO}">Artistry</text>
  <rect x="${panelX}" y="372" width="48" height="1.5" fill="${ROSE}"/>
  <text x="${panelX}" y="420" font-family="${SANS}" font-size="17" letter-spacing="3.5" fill="${ESPRESSO}">MAKEUP · HAIR · PHOTOGRAPHY</text>
  <text x="${panelX}" y="452" font-family="${SERIF}" font-style="italic" font-size="25" fill="#6b5a4f">Beaverton &amp; Portland, Oregon</text>
</svg>`)

await sharp({ create: { width: W, height: H, channels: 3, background: IVORY } })
  .composite([...layers, { input: panel, left: 0, top: 0 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile("src/app/opengraph-image.jpg")

console.log("Generated icon.png, apple-icon.png and opengraph-image.jpg")
