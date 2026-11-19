# 🎂 wish-site

Make a **cute, animated, phone-friendly celebration website** for someone you love — in minutes.
Birthday, anniversary, graduation, wedding… pick a colour theme, a little character, add your photos and
your own messages. No framework, no build step, free to host.

**What's inside the website**

- 🎁 Gift-box intro with confetti + a music-box "Happy Birthday" tune
- 🎈 Floating balloons you can pop, sparkle trail, cute character that meows when tapped
- 🕯️ **Number candles** (her age!) — tap, or really *blow into your mic* to put them out
- 🖼️ 3D swipe carousel · draggable & flippable **polaroid cards** · tap-the-hearts messages
- 📒 Scrapbook page · 💌 final letter
- 🌌 **3D photo world** — drag to look around, pinch to zoom, tap a photo to enlarge (three.js)
- 🎨 7 themes (+ your own two colours) · 🐱🐰🐻 characters · every word editable (any language)

## Use it with Claude Code (recommended)

```bash
git clone https://github.com/ashishbhoure/wish-site ~/.claude/skills/wish-site
```
Then in Claude Code just say: *"make a birthday website for my friend Riya, mint theme with a bunny, photos are in D:\photos\riya"*.
Claude asks what's missing, fills the config, prepares the photos, previews it and can deploy it for you.

## Use it by hand

```bash
node scripts/init.mjs my-site                       # copy the template
# edit my-site/config.js  (name, age, theme, character, messages…)
cd scripts && npm install && cd ..                  # optional: enables photo resizing
node scripts/prepare-photos.mjs ~/photos/riya my-site/photos
node scripts/serve.mjs my-site                      # preview → http://localhost:8080/#open
```
Upload the `my-site` folder to any static host (GitHub Pages, Cloudflare Pages, Netlify, Vercel).
Only Node 18+ is needed; `sharp` is optional.

## Make it yours

Everything is in `config.js`:

```js
name: "Riya",   from: "Sam",   number: "23",
occasion: ["Happy", "Birthday"],          // or ["Happy","Anniversary"], ["Congrats","Graduate"]…
theme: "mint",                            // lavender rose mint sky peach sunshine berry
theme: { primary: "#7fd8b8", secondary: "#ffb3c7" },   // …or your own
character: "bunny",                       // cat bunny bear none
wishes: ["You make ordinary days special 🌷", "…"],
text: { galleryTitle: "Yaadon ki gali", … }            // translate every label
```

## Add a theme or character

- Theme → add a `{primary, secondary}` pair to `PRESETS` in `template/themes.js`.
- Character → add a branch to `cat()` in `template/app.js` (ears + colours are tiny SVG).

## Privacy

Photos in a public GitHub repo are public. For a surprise that should stay private, host on a
service that allows unlisted sites, or share only the link with the person.

## License

MIT — see [LICENSE](LICENSE). Contributions (themes, characters, languages, sections) welcome 💜
