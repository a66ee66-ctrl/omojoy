// Builds usable logo assets from the business's original logo file
// (assets/legacy-logo.png) — a flat raster with a transparent background,
// the colourful starburst icon and black wordmark text.
//
// Produces, in src/assets/logo/:
//  - logo-dark.png   icon + black text, trimmed  (for light/ivory backgrounds)
//  - logo-light.png  icon + ivory text, trimmed   (for dark backgrounds)
//  - mark.png        icon only, trimmed square-ish crop (for favicon/OG use)
//
// Usage: node scripts/process-logo.mjs
import sharp from "sharp";
import fs from "node:fs/promises";

const SRC = "assets/legacy-logo.png";
const OUT = "src/assets/logo";
const IVORY = [248, 243, 236];

await fs.mkdir(OUT, { recursive: true });

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

// Recolour near-black (text) pixels to ivory for the "light" variant.
// Saturated icon pixels (red/green/yellow) are left untouched.
const light = Buffer.from(data);
for (let i = 0; i < light.length; i += channels) {
  const [r, g, b, a] = [light[i], light[i + 1], light[i + 2], light[i + 3]];
  if (a > 0 && Math.max(r, g, b) < 90) {
    light[i] = IVORY[0];
    light[i + 1] = IVORY[1];
    light[i + 2] = IVORY[2];
  }
}

const base = (buf) =>
  sharp(buf, { raw: { width, height, channels } }).png().trim();

await base(data).toFile(`${OUT}/logo-dark.png`);
await base(light).toFile(`${OUT}/logo-light.png`);

// Icon-only crop: find the bounding box of saturated (coloured) pixels only,
// so the overlapping black "...FUL ARTISTRY" lettering is excluded even
// though it shares the same region as the starburst icon.
let minX = width,
  minY = height,
  maxX = 0,
  maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels;
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    const saturated = a > 10 && Math.max(r, g, b) - Math.min(r, g, b) > 40;
    if (!saturated) continue;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
}
// The icon and wordmark overlap in the source composition, so a plain
// rectangular crop would catch stray letters. Most of the text (and its
// anti-aliased blend with the white background) is grayscale — R≈G≈B —
// but where a letter overlaps a coloured stroke, the blend is a dark,
// muddy version of that colour (still somewhat saturated, but dim). The
// icon's own paint is both saturated *and* bright, so require both to
// keep a pixel.
const iconOnly = Buffer.from(data);
for (let i = 0; i < iconOnly.length; i += channels) {
  const [r, g, b] = [iconOnly[i], iconOnly[i + 1], iconOnly[i + 2]];
  const saturated = Math.max(r, g, b) - Math.min(r, g, b) > 18;
  const bright = Math.max(r, g, b) >= 62;
  if (!(saturated && bright)) {
    // Zero the colour too (not just alpha) so any downstream resize/composite
    // that mishandles unpremultiplied alpha can't reveal leftover dark pixels.
    iconOnly[i] = 0;
    iconOnly[i + 1] = 0;
    iconOnly[i + 2] = 0;
    iconOnly[i + 3] = 0;
  }
}
const pad = 6;
const left = Math.max(0, minX - pad);
const top = Math.max(0, minY - pad);
const cropW = Math.min(width, maxX + pad) - left;
const cropH = Math.min(height, maxY + pad) - top;
await sharp(iconOnly, { raw: { width, height, channels } })
  .png()
  .extract({ left, top, width: cropW, height: cropH })
  .toFile(`${OUT}/mark.png`);

console.log("Wrote logo-dark.png, logo-light.png and mark.png to", OUT);
