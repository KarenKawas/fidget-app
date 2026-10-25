# Backlog

## Store release (not started)

**Goal:** publish DigiFidget on the App Store and Google Play. It's for adults winding down and for people with ADHD or anxiety. Pricing isn't decided yet, so it ships free with no ads and no tracking, with room to add a one-time unlock later.

### 1. Accounts and app IDs
- Join the Apple Developer Program ($99 a year) and open a Google Play Console account ($25 once).
- Register the app ID `com.kawasmotion.digifidget` with both.

### 2. Signing and release builds
- **iOS:** a distribution certificate and an App Store provisioning profile.
- **Android:** an upload keystore. Keep it safely backed up, because losing it blocks future updates.
- Store all of these as GitHub Actions secrets.
- Add a release workflow that builds:
  - a signed iOS archive and IPA (`xcodebuild archive` / `-exportArchive`, or fastlane)
  - a signed Android App Bundle (`./gradlew bundleRelease`)
- Bump the version and build numbers for each release.

### 3. Privacy and compliance
- **Privacy policy:** a short page saying no personal data is collected, settings stay on the device, and nothing is tracked. Host it, for example on GitHub Pages.
- **Apple App Privacy:** "Data Not Collected". **Google Data safety:** no data collected or shared.
- **Age rating questionnaires** on both stores (expected: 4+ / Everyone).
- **Motion sensors** (dice tilt): add an `NSMotionUsageDescription` string to the iOS Info.plist in CI.
- **Photo sharing** (rock piling): it goes through the share sheet, so no photo-library permission should be needed. Confirm during review.

### 4. Store listing
- Name, subtitle, a description aimed at calm and focus (no medical claims), keywords and category (Health & Fitness or Entertainment).
- Screenshots for the required device sizes (6.9" and 6.5" iPhone, 13" iPad if iPad is supported, Android phone), plus an optional preview video.
- Support URL and contact email.

### 5. Testing before launch
- **TestFlight** (iOS) and **internal testing** (Play) with a few testers first.
- Check on an older, slower phone: frame rate in the 3D modes, battery use, and audio after the app has been in the background.
- **Accessibility pass:** VoiceOver/TalkBack labels, text size, reduced motion.

## Revisit later (from the round-6 questions)
- **Dice:** dice skins, a nicer tray, saved dice sets.
- **Touch grass:** weather (rain, wind), time of day.
- **Pop-it and bubble wrap:** new shapes, textures and sounds.
- **Newton's cradle:** more or fewer balls, different materials and sounds, slow motion.

## Toy box and look (from round 7)
- **Sticker packs:** wire up in-app purchases at store-release time, using RevenueCat or the native store plugins. The packs are one-time buys and cosmetic only. Seasonal, Kawaii and Space are already on the shop shelf, marked "Coming soon".
- **App-wide style switch (Soft / Toon):** add once every mode builds its materials with `lookMat`. Today only the toy box and the beach do.

## Foldable iPhone support (not started)

**Goal:** DigiFidget should feel at home on Apple's foldable iPhone, both on the narrow cover screen and on the large, nearly square inner screen. Folding or unfolding mid-play must not lose anything.

### 1. Layouts that adapt to size, not to the device model
- Base every decision on the screen size the app gets, never on a device check. This also covers iPads and future models.
- The **cover screen** keeps today's phone layouts.
- The **inner screen** (roughly 4:3) gets roomier layouts:
  - Bubble wrap: more columns, with bubble size still from S/M/L.
  - Board: controls in two columns.
  - Pop-it and the spinner: centred, with a sensible maximum size.
  - 3D modes (spinner, zen garden, Newton's cradle, Dodec): the camera fits to the shorter side.
  - Menu: stays open as a side panel when there's room.
- How: CSS media and container queries, plus the existing per-mode `resize` hooks in `www/index.html`.

### 2. Orientation
- Keep portrait on the cover screen. Allow both orientations on the inner screen, where landscape is natural.
- The CI build currently forces portrait with PlistBuddy. Change it to set orientations per size class, the same way `UISupportedInterfaceOrientations~ipad` works today, or whatever key Apple documents for the foldable.

### 3. Folding and unfolding mid-play
- Treat a fold or unfold as a resize, not a restart:
  - Cancel active touches cleanly (`pointercancel`).
  - Resize the canvases and the shared 3D renderer.
  - Re-lay out slime, grass and bubble wrap rather than resetting them.
- Keep running sounds (spinner whir, mower, zen music) going.

### 4. The crease and safe areas
- In half-open postures, keep key buttons off the centre fold line.
- Respect `env(safe-area-inset-*)` on both screens.

### 5. Performance
- The inner screen has many more pixels.
- Cap the device pixel ratio, and size the slime and zen sand grids by screen area, so frame rates hold up.
- Check battery use in the 3D modes.

### 6. Testing
- Use the Xcode simulator for the foldable once it's available. Until then, use iPad simulators in resizable windows to rehearse the layouts.
- Check on a real device: haptics, tilt-to-roll on the dice, and folding while touching the screen.
