#!/bin/sh
# Generates and configures the iOS project for both the test build and the App Store build (runs on the macOS CI runner).
set -e
npx cap add ios
node scripts/make-icons.js && npx capacitor-assets generate --ios

# Apple rejects app icons with an alpha channel, so flatten them onto the icon's own purple
node -e '
const sharp = require("sharp"), fs = require("fs"), dir = "ios/App/App/Assets.xcassets/AppIcon.appiconset";
(async () => { for (const f of fs.readdirSync(dir).filter(f => f.endsWith(".png"))) {
  const p = dir + "/" + f, buf = await sharp(p).flatten({ background: "#5B34C9" }).removeAlpha().png().toBuffer(); fs.writeFileSync(p, buf); console.log("flattened " + f);
} })().catch(e => { console.error(e); process.exit(1); });'

P=ios/App/App/Info.plist
set_key() { /usr/libexec/PlistBuddy -c "Set :$1 $3" "$P" 2>/dev/null || /usr/libexec/PlistBuddy -c "Add :$1 $2 $3" "$P"; }
# upright or on either side (the app holds still by itself while the dice follow the tilt)
for K in UISupportedInterfaceOrientations "UISupportedInterfaceOrientations~ipad"; do
  /usr/libexec/PlistBuddy -c "Delete :$K" "$P" || true
  /usr/libexec/PlistBuddy -c "Add :$K array" -c "Add :$K:0 string UIInterfaceOrientationPortrait" -c "Add :$K:1 string UIInterfaceOrientationLandscapeLeft" -c "Add :$K:2 string UIInterfaceOrientationLandscapeRight" "$P"
done
set_key UIRequiresFullScreen bool true
# the dice can follow the phone's tilt
set_key NSMotionUsageDescription string "Tilt your phone to roll the dice."
# standard HTTPS only, so no export compliance questions on each upload
set_key ITSAppUsesNonExemptEncryption bool false

# iPhone only for 1.0
sed -i '' 's/TARGETED_DEVICE_FAMILY = "1,2";/TARGETED_DEVICE_FAMILY = 1;/g' ios/App/App.xcodeproj/project.pbxproj

npm run sync
