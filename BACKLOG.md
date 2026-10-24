# Backlog

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
