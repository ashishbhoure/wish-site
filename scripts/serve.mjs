#!/usr/bin/env node
// Usage: node scripts/serve.mjs <site-folder> [port]   → http://localhost:8080  (add #open to skip the gift screen)
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';

const root = resolve(process.argv[2] || '.'), port = Number(process.argv[3] || 8080);
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
createServer(async (q, r) => {
  let p = decodeURIComponent(q.url.split('?')[0]); if (p === '/') p = '/index.html';
  const f = join(root, p);
  if (f !== root && !f.startsWith(root + sep)) { r.writeHead(403); return r.end(); }
  try { const d = await readFile(f); r.writeHead(200, { 'Content-Type': mime[extname(f)] || 'application/octet-stream' }); r.end(d); }
  catch { r.writeHead(404); r.end('not found'); }
}).listen(port, () => console.log(`Preview: http://localhost:${port}/#open`));
