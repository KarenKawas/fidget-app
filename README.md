# DigiFidget (iOS + Android)

This wraps the DigiFidget prototype in a real native app using Capacitor.
The app uses the phone's real haptics engine (Taptic Engine on iPhone),
so haptics work properly, unlike in a browser.

## What you need

- A computer with Node.js 20 or newer (https://nodejs.org)
- For iPhone: a Mac with Xcode 16 or newer, plus CocoaPods (`brew install cocoapods`)
- For Android: Android Studio (Mac, Windows or Linux)
- A USB cable for your phone

## First-time setup

Open a terminal in this folder and run:

```
npm install
npx cap add ios
npx cap add android
npm run sync
```

## Run on your iPhone

1. Run `npm run ios`. Xcode opens.
2. Click the "App" project in the left sidebar, open "Signing & Capabilities",
   and pick your Apple ID under "Team" (Xcode > Settings > Accounts to add one).
3. On the iPhone: Settings > Privacy & Security > Developer Mode > On (it restarts).
4. Plug the iPhone in, select it at the top of Xcode, and press the Play button.
5. First launch only: on the iPhone go to Settings > General >
   VPN & Device Management and trust your developer profile.

With a free Apple ID the app stops opening after 7 days; just press Play again
to reinstall. A paid Apple Developer account ($99/year) removes that limit and
lets you use TestFlight and the App Store.

## Run on Android

1. On the phone: Settings > About phone > tap "Build number" 7 times,
   then Settings > Developer options > turn on USB debugging.
2. Run `npm run android`. Android Studio opens.
3. Plug the phone in, select it at the top, and press Run.

To get an installable file instead: Build > Build App Bundle(s) / APK(s) > Build APK(s).

## Making changes

All the app code lives in `www/index.html`. After editing it, run
`npm run sync` and press Play/Run again.

## Portrait lock, icon and splash

The CI build (`.github/workflows/build.yml`) locks the app to portrait and
generates the app icon and splash screen from `scripts/make-icons.js`.
To do the same for a local build, run `npm run icons` after `npx cap add`,
then lock portrait yourself:

- iOS: in Xcode, App target > General > Deployment Info, untick Landscape.
- Android: in `android/app/src/main/AndroidManifest.xml`, add
  `android:screenOrientation="portrait"` to the `<activity>` tag.
