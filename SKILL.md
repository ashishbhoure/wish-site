---
name: wish-site
description: Build a cute, animated, mobile-friendly celebration website (birthday, anniversary, graduation, wedding…) for someone special — themed colours, a cat/bunny/bear character, number candles you can blow out, 3D photo carousel, draggable polaroids, tap-the-hearts messages, scrapbook and a 3D photo world. Use when the user wants to make a birthday/wish/greeting website, a surprise page for a friend or partner, or asks for "a cute website with photos and messages".
---

# wish-site

Generates a static, zero-build celebration website from a template. No framework, no server — just
`index.html` + `config.js` + photos, so it can be hosted free anywhere (GitHub Pages, Cloudflare Pages, Netlify, Vercel).

Everything personal lives in **one file: `config.js`**. This skill's job is to collect the details,
fill `config.js`, prepare the photos, preview, and (if asked) deploy.

Paths below are relative to this skill's folder (the one containing this SKILL.md).

## Workflow

### 1. Gather details (ask only what's missing, in one short message)
- **Whose site / who from** → `name`, `from`
- **Occasion** → `occasion` (two title lines, e.g. `["Happy","Birthday"]`, `["Happy","Anniversary"]`, `["Congrats","Graduate"]`). Use their language if not English.
- **Number** → `number` (age / years, e.g. `"23"`; `""` gives a heart candle)
- **Theme** → `theme`: `lavender | rose | mint | sky | peach | sunshine | berry`, or custom `{ primary:"#hex", secondary:"#hex" }`. If the user says a colour ("blue and gold"), pick the closest preset or build a custom pair of *pastel* colours.
- **Character** → `character`: `cat | bunny | bear | none`
- **Photos folder** (optional — without photos the site shows cute placeholders)
- **Messages** (optional) — wishes, letter, card captions. If the user wants help, draft warm, specific, non-generic text from what they tell you about the person (inside jokes, hobbies). Keep each wish under ~70 characters. Match their language/tone (Hinglish etc. is fine).

Don't invent personal facts. If you don't know something, use the neutral defaults already in `config.js`.

### 2. Create the site
```bash
node scripts/init.mjs <new-site-folder>
```
Then edit `<new-site-folder>/config.js` (see "Config reference").

### 3. Photos
Ask the user to point at a folder of photos, then:
```bash
# optional but recommended (resizes for phones, fixes rotation):
cd scripts && npm install && cd ..
node scripts/prepare-photos.mjs "<their-photos-folder>" "<new-site-folder>/photos" --max 24
```
This writes `photos/pNN.jpg` and `photos/manifest.js`. Photos are used everywhere automatically
(hero, carousel, polaroids, scrapbook, 3D world).
- **Look at the photos yourself** (contact sheet or sample) when the user wants curation: prefer clear, solo, flattering shots; skip screenshots, blurry or private-looking images, and ask before using anything sensitive.
- Make sure `heroPhoto` / `cards[].img` names exist in `photos/`.

### 4. Preview & verify
```bash
node scripts/serve.mjs <new-site-folder>      # http://localhost:8080/#open  (#open skips the gift screen)
```
Check on a **phone-width viewport (≈390px)**: no sideways scroll, text not clipped, photos load. Fix `config.js`, not the engine, unless it's a real bug.

### 5. Deploy (only if the user asks; confirm before publishing)
Free static hosting. **GitHub Pages needs a public repo → the photos become publicly reachable; tell the user.** Offer Cloudflare Pages/Netlify (can be unlisted) if they care.
```bash
cd <new-site-folder> && git init -b main && git add -A && git commit -m "wish site"
gh repo create <repo-name> --public --source=. --push
gh api -X POST repos/<user>/<repo-name>/pages -f "source[branch]=main" -f "source[path]=/"
# live in ~1 min at https://<user>.github.io/<repo-name>/
```
Updates later: `git add -A && git commit -m update && git push`.

## Config reference (`config.js`)
| key | what it does |
|---|---|
| `name`, `from` | who it's for / who signs the letter |
| `occasion` | `["Happy","Birthday"]` — big title + bunting flags |
| `number` | number candles; `""` → heart candle |
| `theme` | preset name or `{primary, secondary}` hex pair |
| `character` | `cat`, `bunny`, `bear`, `none` |
| `music` | soft music-box tune on/off (user can mute) |
| `sections` | toggle `candles, gallery, cards, wishes, scrapbook, world, letter` |
| `photos`, `heroPhoto` | auto from `photos/manifest.js`; override by hand if needed |
| `cards` | `[{img, cap, msg}]` draggable polaroids (auto-built from photos if empty) |
| `wishes` | up to 8 messages for the tap-the-hearts game |
| `letter` | final letter body |
| `text` | **every** label/sentence on the page (use `{name}`); translate the whole site here |

## Rules of thumb
- Edit only `config.js` and `photos/` for a normal request. `app.js`, `style.css`, `themes.js` are the engine; change them only to fix a bug or add a feature (then add it to the template, not a one-off copy, if it's generally useful).
- Keep the personality: cute, soft, pastel, lots of tiny animation. Don't make it corporate.
- Never put someone's photos or details into a public repo/skill without the user's say-so.
- Add new themes in `template/themes.js` (`PRESETS`), new characters in `cat()` in `template/app.js`.
