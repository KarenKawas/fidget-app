// Copies the 3D engine files and the Fredoka font into www/vendor so the app works offline.
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const out = path.join(root, "www", "vendor");
fs.mkdirSync(path.join(out, "fonts"), { recursive: true });
const files = [
  [["three/build/three.min.js"], "three.min.js"],
  [["cannon/build/cannon.min.js", "cannon/build/cannon.js"], "cannon.min.js"],
  ...[400, 500, 600].map(w => [[`@fontsource/fredoka/files/fredoka-latin-${w}-normal.woff2`], `fonts/fredoka-${w}.woff2`]),
];
for (const [candidates, name] of files) {
  const src = candidates.map(c => path.join(root, "node_modules", c)).find(f => fs.existsSync(f));
  if (!src) { console.error("Missing " + candidates[0] + ". Run npm install first."); process.exit(1); }
  fs.copyFileSync(src, path.join(out, name));
  console.log("Copied " + name);
}
