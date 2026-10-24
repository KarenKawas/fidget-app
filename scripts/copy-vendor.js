// Copies the 3D engine files into www/vendor so the app works offline.
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const out = path.join(root, "www", "vendor");
fs.mkdirSync(out, { recursive: true });
const files = [
  [["three/build/three.min.js"], "three.min.js"],
  [["cannon/build/cannon.min.js", "cannon/build/cannon.js"], "cannon.min.js"],
];
for (const [candidates, name] of files) {
  const src = candidates.map(c => path.join(root, "node_modules", c)).find(f => fs.existsSync(f));
  if (!src) { console.error("Missing " + candidates[0] + ". Run npm install first."); process.exit(1); }
  fs.copyFileSync(src, path.join(out, name));
  console.log("Copied " + name);
}
