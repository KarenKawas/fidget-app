# Putting DigiFidget on the App Store

This is the checklist for the steps only you can do. Everything else is already set up: the iPhone build, signing, the upload to TestFlight, and the privacy and support pages. You won't need a Mac.

Work through the steps in order. The only slow part is step 1, where you wait for Apple to approve you.

---

## 1. Join the Apple Developer Program ($99 a year)

1. Make sure your Apple ID has **two-factor authentication** turned on. On iPhone: Settings → your name → Sign-In & Security.
2. Go to **developer.apple.com/programs/enroll**, or use the **Apple Developer** app on your iPhone, which is often quicker. Enrol, then pay.
3. **Individual or company?**
   - **Individual:** the fastest option, usually approved in 1–2 days. The App Store shows your legal name as the seller.
   - **Company:** shows a business name such as "Kawas Motion". You need a registered business and a free D-U-N-S number, and approval takes 1–2 weeks.
   - You can switch from individual to company later.
4. Wait for the "Welcome to the Apple Developer Program" email.

## 2. Create the app in App Store Connect

1. Go to **appstoreconnect.apple.com**, sign in, and accept any agreements it shows.
2. Open **Apps → + → New App** and fill in:
   - **Platform:** iOS
   - **Name:** DigiFidget. If it's taken, try "DigiFidget: Calm Fidget Toys".
   - **Primary language:** English (U.K.) or English (U.S.)
   - **Bundle ID:** pick **com.kawasmotion.digifidget**. If it isn't in the list, create it first at developer.apple.com → Certificates, IDs & Profiles → Identifiers → +, as an App ID with "Explicit" set to that ID.
   - **SKU:** digifidget
   - **User access:** Full access

## 3. Make the key that lets GitHub upload for you

1. In App Store Connect, open **Users and Access → Integrations → App Store Connect API → Team Keys → +**.
2. Name it **GitHub**. Set its access to **Admin**: Admin is what lets the build create its own signing certificate in the cloud.
3. **Download** the `.p8` file. Apple only lets you download it once, so keep it somewhere safe.
4. Note the **Key ID** (in the list) and the **Issuer ID** (above the list).
5. Find your **Team ID**: developer.apple.com → Account → Membership details. It's 10 characters.
6. On GitHub, open the repo → **Settings → Secrets and variables → Actions → New repository secret**. Add these four:

| Name | Value |
|---|---|
| `APPLE_TEAM_ID` | your Team ID |
| `ASC_KEY_ID` | the Key ID |
| `ASC_ISSUER_ID` | the Issuer ID |
| `ASC_KEY_P8` | open the `.p8` file in Notepad and paste **all** of its text, including the BEGIN and END lines |

## 4. Send a build to TestFlight

1. On GitHub, open **Actions → Release iPhone app to TestFlight → Run workflow**.
2. The run takes about 10 minutes. Apple then processes the build, which takes another 10–30 minutes. You'll get an email when it's ready.
3. In App Store Connect → your app → **TestFlight**, add yourself as an internal tester.
4. Install the **TestFlight** app on your iPhone and install DigiFidget from it.
5. Things to check:
   - Play every toy.
   - Launch the app in airplane mode.
   - Lock and unlock the phone, then check the sound comes back.
   - Check haptics, and the dice tilt prompt.
6. If you want friends to try it, add them under **External testing**. This needs a quick beta review by Apple, usually within a day.

## 5. Fill in the App Store page

In App Store Connect → your app → **App Store** tab. The answers below are ready to paste.

**App Information**
- **Subtitle:** Calm fidget toys to unwind
- **Category:** Entertainment. Secondary: Health & Fitness.
- **Content rights:** No third-party content.
- **Age rating:** answer "None" to everything, which gives **4+**.

**Pricing and Availability:** Free, all countries.

**App Privacy**
- **Privacy Policy URL:** `https://karenkawas.github.io/fidget-app/privacy.html`. This works once GitHub Pages is on (see step 6).
- **Data collection:** "No, we do not collect data from this app".

**Version 1.0 page**
- **Promotional text:**
  > A cosy box of fidget toys. Open the lid, pick a toy and unwind.
- **Description:**
  > DigiFidget is a calm little box of fidget toys for winding down, taking a breather, or giving restless hands something to do.
  >
  > Open the lid and pick a toy:
  > • Slime to squish, stretch and swirl
  > • Endless bubble wrap and a rainbow pop-it
  > • A fidget board of buttons, switches, knobs and a joystick
  > • Real 3D dice that roll with a tilt of your phone
  > • A fidget spinner that hums as it spins
  > • A tabletop zen garden to rake
  > • Newton's cradle
  > • Dodec, a twelve-sided fidget friend
  > • Touch grass, and stack rocks into cairns on a quiet beach
  >
  > Make the box yours with your name, colours and stickers. Turn on the lamp for night mode, try the breathing guide, or set a gentle focus timer.
  >
  > Soft sounds and haptics. No ads, no accounts, and nothing is tracked. Everything stays on your phone.
- **Keywords:** `fidget,toys,slime,pop it,bubble wrap,spinner,zen garden,calm,relax,unwind,focus,sensory,asmr,cradle`
- **Support URL:** `https://karenkawas.github.io/fidget-app/`
- **Screenshots:** iPhone 6.9" (1320 × 2868). I'll make these from the app.
- **Build:** choose the TestFlight build you tested.
- **App Review information:**
  - Sign-in required: **No**.
  - Notes:
    > All content works offline with no account. Tap the toy box on the home screen to open it, then tap a toy. The grid button shows all toys as a list.
- **Version release:** "Manually release this version", so you choose launch day.

**Wording rule:** keep the store text about calm, relaxing and focus. Don't promise to treat or help ADHD or anxiety. Apple treats health claims strictly.

## 6. Turn on the support and privacy pages

On GitHub, open the repo → **Settings → Pages**. Set **Source: Deploy from a branch**, **Branch: main**, **folder: /docs**, then Save. Within a few minutes the pages are live at the URLs above.

Before that, the pages have a placeholder `CONTACT_EMAIL`. Tell me which email you want people to use, and I'll fill it in.

## 7. Submit

On the version page, press **Add for Review**, then **Submit**. Review usually takes 1–3 days. If Apple asks a question or rejects something, send me the message and we'll fix it.
