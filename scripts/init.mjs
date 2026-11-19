#!/usr/bin/env node
// Usage: node scripts/init.mjs <new-site-folder>
// Copies the template into a new folder so you can edit config.js and add photos.
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dest = resolve(process.argv[2] || 'my-wish-site');
if (existsSync(join(dest, 'index.html'))) { console.error(`✗ ${dest} already contains a site. Pick a new folder.`); process.exit(1); }
mkdirSync(dest, { recursive: true });
cpSync(join(here, '..', 'template'), dest, { recursive: true });
console.log(`✓ Site created at ${dest}\n  1) edit config.js\n  2) put photos in photos/ and run: node ${join(here, 'prepare-photos.mjs')} <your-photos-folder> ${join(dest, 'photos')}\n  3) preview: node ${join(here, 'serve.mjs')} ${dest}`);
