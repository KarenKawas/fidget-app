// Renders the app icon and splash art into assets/*.png for `npx capacitor-assets generate`.
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const out = path.join(__dirname, "..", "assets");
fs.mkdirSync(out, { recursive: true });

const bg = `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#A68BFF"/><stop offset="1" stop-color="#5B34C9"/></linearGradient>
  </defs>
  <rect width="1024" height="1024" fill="url(#bg)"/>
  <g fill="#fff" opacity=".18"><circle cx="150" cy="170" r="22"/><circle cx="880" cy="260" r="16"/><circle cx="830" cy="860" r="26"/><circle cx="210" cy="820" r="14"/></g>`;

// a glossy slime blob with three pop-it dimples; kept inside the Android adaptive-icon safe zone
const blob = `
  <defs>
    <radialGradient id="sl" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#FFE3F0"/><stop offset=".5" stop-color="#FF7AB6"/><stop offset="1" stop-color="#C2306F"/></radialGradient>
    <radialGradient id="dm" cx=".5" cy=".35" r=".7"><stop offset="0" stop-color="#C2306F"/><stop offset="1" stop-color="#FFB6D6"/></radialGradient>
  </defs>
  <path d="M512 300c120 0 222 50 236 150 12 86-20 128 2 190 18 52-40 94-128 92-60-2-74-26-110-26s-56 30-124 28c-92-2-134-58-114-112 24-64-26-104-6-184 22-90 124-138 244-138z" fill="#9E1F55" opacity=".35" transform="translate(0 26)"/>
  <path d="M512 300c120 0 222 50 236 150 12 86-20 128 2 190 18 52-40 94-128 92-60-2-74-26-110-26s-56 30-124 28c-92-2-134-58-114-112 24-64-26-104-6-184 22-90 124-138 244-138z" fill="url(#sl)"/>
  <g>${[[420, 520], [540, 470], [600, 600]].map(([x, y]) =>
    `<circle cx="${x}" cy="${y}" r="46" fill="url(#dm)"/><ellipse cx="${x}" cy="${y + 26}" rx="30" ry="10" fill="#fff" opacity=".45"/>`).join("")}</g>
  <ellipse cx="420" cy="380" rx="70" ry="34" fill="#fff" opacity=".7" transform="rotate(-20 420 380)"/>`;

const svg = (w, h, body) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`);
const splash = dark => svg(2732, 2732, `
  <rect width="2732" height="2732" fill="${dark ? "#231F30" : "#F7F4FB"}"/>
  <g transform="translate(1366 1250) scale(1.4) translate(-512 -512)">${blob}</g>
  <text x="1366" y="2010" text-anchor="middle" font-family="Arial Rounded MT Bold,Arial,sans-serif" font-weight="700" font-size="150" fill="${dark ? "#F1EDF8" : "#2A2438"}">DigiFidget</text>`);

(async () => {
  const jobs = {
    "icon-only.png": svg(1024, 1024, bg + blob),
    "icon-foreground.png": svg(1024, 1024, blob),
    "icon-background.png": svg(1024, 1024, bg),
    "splash.png": splash(false),
    "splash-dark.png": splash(true),
  };
  for (const [name, buf] of Object.entries(jobs)) {
    await sharp(buf).png().toFile(path.join(out, name));
    console.log("Rendered assets/" + name);
  }
})().catch(e => { console.error(e); process.exit(1); });
