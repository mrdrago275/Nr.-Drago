/**
 * Usage: npm run optimize:images
 * Requires sharp (devDependency).
 * Source: ./public/assets/background1.jpg
 * Output: ./public/assets/optimized/{8k,4k,2k,1k}.{avif,webp}
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const src = path.resolve(process.cwd(), "public/assets/background1.jpg");
const outDir = path.resolve(process.cwd(), "public/assets/optimized");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const sizes = [
  { name: "8k", width: 7680 },
  { name: "4k", width: 3840 },
  { name: "2k", width: 2048 },
  { name: "1k", width: 1200 }
];

(async () => {
  if (!fs.existsSync(src)) {
    console.error("Source image not found at:", src);
    process.exit(1);
  }
  for (const s of sizes) {
    await sharp(src)
      .resize({ width: s.width })
      .avif({ quality: 70 })
      .toFile(path.join(outDir, `${s.name}.avif`));
    await sharp(src)
      .resize({ width: s.width })
      .webp({ quality: 75 })
      .toFile(path.join(outDir, `${s.name}.webp`));
    console.log(`wrote optimized ${s.name}`);
  }
  console.log("Done. Optimized assets are in /public/assets/optimized/");
})();
