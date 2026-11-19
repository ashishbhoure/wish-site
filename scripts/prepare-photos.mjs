#!/usr/bin/env node
// Usage: node scripts/prepare-photos.mjs <photos-folder> <site>/photos [--max 24] [--size 1100]
// Resizes + compresses photos for fast phone loading (fixes phone-rotation too) and writes
// photos/manifest.js, which the site reads automatically.
//
// Resizing needs the optional `sharp` package:   cd scripts && npm install
// Without sharp the photos are just copied (still works, just heavier).
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); if (i < 0) return d; const [, v] = args.splice(i, 2); return Number(v); };
const max = flag('--max', 24), size = flag('--size', 1100);
const [srcArg, destArg] = args;
if (!srcArg || !destArg) { console.error('Usage: node prepare-photos.mjs <photos-folder> <site>/photos [--max 24] [--size 1100]'); process.exit(1); }
const src = resolve(srcArg), dest = resolve(destArg);
if (!existsSync(src)) { console.error('✗ Folder not found: ' + src); process.exit(1); }
mkdirSync(dest, { recursive: true });

let sharp = null;
try { sharp = (await import('sharp')).default; } catch { console.warn('! sharp not installed → copying photos without resizing (run `npm install` inside scripts/ for best results)'); }

const ok = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const files = readdirSync(src).filter(f => ok.has(extname(f).toLowerCase())).sort()
  .map(f => ({ f, size: statSync(join(src, f)).size })).filter(x => x.size > 15 * 1024); // skip tiny junk
if (!files.length) { console.error('No photos found in', src); process.exit(1); }

// keep up to --max, spread evenly through the folder
const step = Math.max(1, files.length / max), chosen = [];
for (let i = 0; i < files.length && chosen.length < max; i += step) chosen.push(files[Math.floor(i)]);

const out = [];
let n = 1;
for (const { f } of chosen) {
  const name = `p${String(n++).padStart(2, '0')}.jpg`;
  try {
    if (sharp) await sharp(join(src, f)).rotate().resize({ width: size, height: size, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 82 }).toFile(join(dest, name));
    else copyFileSync(join(src, f), join(dest, name));
    out.push(name); console.log(`✓ ${f} → ${name}`);
  } catch (e) { console.warn(`✗ skipped ${f}: ${e.message}`); }
}
writeFileSync(join(dest, 'manifest.js'), `window.PHOTOS = ${JSON.stringify(out, null, 2)};\n`);
console.log(`\n${out.length} photos ready. manifest.js written. Tip: open the folder and delete any you don't want, then edit manifest.js.`);
