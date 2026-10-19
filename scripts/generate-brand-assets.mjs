// Generates favicon/app icons and the Open Graph share image, using the
// business's own logo (src/assets/logo/, built by scripts/process-logo.mjs).
// Usage: npm run brand-assets  (run after `npm run images` and `npm run process-logo`)
import sharp from "sharp";

const IVORY = "#f8f3ec";
const ESPRESSO = "#2b211c";
const ROSE = "#b98b7f";
const SERIF = "Cormorant Garamond, Georgia, 'Times New Roman', serif";
const SANS = "Manrope, 'Helvetica Neue', Arial, sans-serif";
const MARK = "src/assets/logo/mark.png";
const LOGO = "src/assets/logo/logo-dark.png";

// Favicon / app icon: the starburst mark, centred on an espresso square.
async function icon(size) {
  const markSize = Math.round(size * 0.72);
  const mark = await sharp(MARK)
    .resize(markSize, markSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: ESPRESSO },
  })
    .composite([{ input: mark, gravity: "center" }])
    .png();
}

await (await icon(512)).toFile("src/app/icon.png");
await (await icon(180)).toFile("src/app/apple-icon.png");

// Open Graph: three-image editorial strip + wordmark panel.
const W = 1200;
const H = 630;
const photos = [
  ["src/assets/images/portfolio/golden-glam.jpg", 300, "attention"],
  ["src/assets/images/portfolio/bridal-updo-pearls.jpg", 210, "attention"],
  ["src/assets/images/portfolio/maternity-studio-hat.jpg", 210, "attention"],
];
let x = 0;
const layers = [];
for (const [file, w, position] of photos) {
  layers.push({
    input: await sharp(file)
      .resize(w, H, { fit: "cover", position })
      .toBuffer(),
    left: x,
    top: 0,
  });
  x += w + 6;
}
const panelX = x + 34;
const logoWidth = 360;
const logoMeta = await sharp(LOGO).metadata();
const logoHeight = Math.round((logoMeta.height / logoMeta.width) * logoWidth);
const logo = await sharp(LOGO).resize(logoWidth, logoHeight).toBuffer();

const panel =
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect x="${panelX}" y="372" width="48" height="1.5" fill="${ROSE}"/>
  <text x="${panelX}" y="420" font-family="${SANS}" font-size="17" letter-spacing="3.5" fill="${ESPRESSO}">MAKEUP · HAIR · PHOTOGRAPHY</text>
  <text x="${panelX}" y="452" font-family="${SERIF}" font-style="italic" font-size="25" fill="#6b5a4f">Beaverton &amp; Portland, Oregon</text>
</svg>`);

await sharp({ create: { width: W, height: H, channels: 3, background: IVORY } })
  .composite([
    ...layers,
    { input: logo, left: panelX - 10, top: 230 - Math.round(logoHeight / 2) },
    { input: panel, left: 0, top: 0 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile("src/app/opengraph-image.jpg");

console.log("Generated icon.png, apple-icon.png and opengraph-image.jpg");
