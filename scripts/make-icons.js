// Renders the app icon and splash art into assets/*.png for `npx capacitor-assets generate`.
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const out = path.join(__dirname, "..", "assets");
fs.mkdirSync(out, { recursive: true });

const bg = `
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E7DBFF"/><stop offset="1" stop-color="#B49CF5"/></linearGradient></defs>
  <rect width="1024" height="1024" fill="url(#bg)"/>
  <g fill="#fff" opacity=".7"><path d="M170 190l10 26 26 10-26 10-10 26-10-26-26-10 26-10z"/><path d="M850 250l7 18 18 7-18 7-7 18-7-18-18-7 18-7z"/><path d="M830 830l9 22 22 9-22 9-9 22-9-22-22-9 22-9z"/></g>`;

// the Dodec mascot, face-on: a centre pentagon (its face) ringed by five more, a thick ink outline and its red button
const dodec = (() => {
  const C = [512, 540], R = 330, ri = R * .6, P = (r, deg) => [C[0] + r * Math.cos(deg * Math.PI / 180), C[1] + r * Math.sin(deg * Math.PI / 180)];
  const I = [0, 1, 2, 3, 4].map(k => P(ri, -90 + 72 * k)), O = [...Array(10)].map((_, j) => P(R, -90 + 36 * j));
  const pts = a => a.map(p => p.map(v => v.toFixed(1)).join(",")).join(" ");
  // light from the top left: each outer face is shaded by which way it points
  const tones = ["#B88AF5", "#9C66E8", "#7B44CC", "#6A36B8", "#9257DE"];
  const ring = [0, 1, 2, 3, 4].map(k => `<polygon points="${pts([I[k], O[2 * k], O[2 * k + 1], O[(2 * k + 2) % 10], I[(k + 1) % 5]])}" fill="${tones[k]}"/>`).join("");
  const outline = pts(O);
  return `
  <defs><radialGradient id="dface" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="#C9A2FF"/><stop offset="1" stop-color="#A06CEE"/></radialGradient></defs>
  <ellipse cx="512" cy="905" rx="250" ry="34" fill="#2A2438" opacity=".22"/>
  <!-- the red button on top -->
  <g transform="translate(512 ${C[1] - R + 6})">
    <rect x="-62" y="-30" width="124" height="42" rx="12" fill="#2A2438"/>
    <ellipse cx="0" cy="-32" rx="66" ry="40" fill="#2A2438"/>
    <ellipse cx="0" cy="-36" rx="52" ry="30" fill="#F0352A"/>
    <ellipse cx="-16" cy="-46" rx="18" ry="8" fill="#fff" opacity=".7"/>
  </g>
  <polygon points="${outline}" fill="#2A2438" stroke="#2A2438" stroke-width="44" stroke-linejoin="round"/>
  ${ring}
  <polygon points="${pts(I)}" fill="url(#dface)"/>
  <g fill="none" stroke="#2A2438" stroke-width="9" stroke-linejoin="round">${[0, 1, 2, 3, 4].map(k => `<line x1="${I[k][0]}" y1="${I[k][1]}" x2="${O[2 * k][0]}" y2="${O[2 * k][1]}"/>`).join("")}<polygon points="${pts(I)}"/></g>
  <!-- its face -->
  <g transform="translate(512 ${C[1] + 8})">
    <ellipse cx="-56" cy="-14" rx="30" ry="36" fill="#1E1A26"/><ellipse cx="56" cy="-14" rx="30" ry="36" fill="#1E1A26"/>
    <circle cx="-45" cy="-28" r="11" fill="#fff"/><circle cx="67" cy="-28" r="11" fill="#fff"/>
    <ellipse cx="-104" cy="34" rx="26" ry="17" fill="#FF7AA8" opacity=".9"/><ellipse cx="104" cy="34" rx="26" ry="17" fill="#FF7AA8" opacity=".9"/>
    <path d="M-30 30 Q0 62 30 30" fill="none" stroke="#1E1A26" stroke-width="13" stroke-linecap="round"/>
  </g>
  <!-- a soft shine on the top left face -->
  <ellipse cx="${(O[8][0] + I[4][0]) / 2}" cy="${(O[8][1] + I[4][1]) / 2}" rx="46" ry="18" fill="#fff" opacity=".35" transform="rotate(-40 ${(O[8][0] + I[4][0]) / 2} ${(O[8][1] + I[4][1]) / 2})"/>`;
})();

// the Android adaptive icon crops to a circle, so its foreground is drawn a little smaller
const dodecSafe = `<g transform="translate(512 512) scale(.86) translate(-512 -512)">${dodec}</g>`;

const svg = (w, h, body) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`);
const splash = dark => svg(2732, 2732, `
  <rect width="2732" height="2732" fill="${dark ? "#231F30" : "#F7F4FB"}"/>
  <g transform="translate(1366 1250) scale(1.4) translate(-512 -512)">${dodec}</g>
  <text x="1366" y="2010" text-anchor="middle" font-family="Arial Rounded MT Bold,Arial,sans-serif" font-weight="700" font-size="150" fill="${dark ? "#F1EDF8" : "#2A2438"}">DigiFidget</text>`);

(async () => {
  const jobs = {
    "icon-only.png": svg(1024, 1024, bg + dodec),
    "icon-foreground.png": svg(1024, 1024, dodecSafe),
    "icon-background.png": svg(1024, 1024, bg),
    "splash.png": splash(false),
    "splash-dark.png": splash(true),
  };
  for (const [name, buf] of Object.entries(jobs)) {
    await sharp(buf).png().toFile(path.join(out, name));
    console.log("Rendered assets/" + name);
  }
})().catch(e => { console.error(e); process.exit(1); });
