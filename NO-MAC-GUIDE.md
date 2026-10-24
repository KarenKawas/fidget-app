# Getting Fidget on your phones without a Mac (free)

GitHub builds both apps for you in the cloud, for free.

## 1. Put the project on GitHub (from any browser)

1. Make a free account at github.com.
2. Tap "+" > "New repository". Name it `fidget-app`. Public is fine (and gives unlimited free builds). Create it.
3. Tap "uploading an existing file" and upload everything in this folder
   (`package.json`, `capacitor.config.json`, `README.md`, the `www` and `scripts` folders).
4. Folders starting with a dot often get skipped by uploads, so add the build file by hand:
   "Add file" > "Create new file", name it exactly `.github/workflows/build.yml`,
   paste in the contents of that file from this folder, and commit.

That commit starts the build. Open the "Actions" tab to watch it (about 5 to 10 minutes).
When both jobs show a green check, open the run and scroll to "Artifacts".

## 2. Android: install the APK

1. Download `fidget-android` from Artifacts on the phone and unzip it (the Files app can do this).
2. Tap `app-debug.apk`. Android will ask to allow installs from your browser or Files app; allow it.
3. Install and open Fidget.

## 3. iPhone: sideload with a free Apple ID (needs a Windows PC, about 15 minutes)

Apple only allows free installs through a computer. A Windows PC works.

1. On the PC, install iTunes and iCloud from apple.com (not the Microsoft Store versions).
2. Install Sideloadly (sideloadly.io).
3. Download `fidget-iphone` from Artifacts on the PC and unzip it to get `fidget-unsigned.ipa`.
4. Plug in the iPhone, tap "Trust" on the phone, and open Sideloadly.
5. Drag the .ipa into Sideloadly, enter your Apple ID, and press Start.
6. On the iPhone: Settings > General > VPN & Device Management > trust your Apple ID.
7. Settings > Privacy & Security > Developer Mode > On (the phone restarts).

Limits of a free Apple ID: the app stops opening after 7 days. Run Sideloadly again
to refresh it (your settings stay). AltStore (altstore.io) can refresh automatically
over Wi-Fi while its helper runs on your PC.

## Updating the app

Edit `www/index.html` on GitHub (pencil icon) and commit. A new build starts by itself.
