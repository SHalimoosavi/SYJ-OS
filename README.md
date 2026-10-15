# SYJ OS — Virtual Device v0.1.0

SYJ OS Virtual Device is a browser-based smartphone simulator prototype. It is a static web application used to prototype the product architecture, UX and system concepts of SYJ OS. It is not an operating system and does not emulate a phone chipset or Android kernel.

Live URL (after the GitHub Pages workflow has completed successfully):
https://shalimoosavi.github.io/SYJ-OS/

## v0.1.0 features

- Simulated battery with charging, slow drain, low/critical state handling and power-saver state.
- Simulated Wi-Fi, 5G, offline and auto network modes, plus airplane mode.
- Brightness, rotation, CPU, RAM, storage, thermal and volume readouts.
- Hyderabad location preset with editable location support through the virtual hardware model.
- Three device profiles: SYJ One (Phone), SYJ Compact and SYJ Tab.
- Responsive host chrome with a phone frame on wide viewports and fullscreen mode on narrow or installed-PWA displays.
- Boot, power-off and power-on transitions.
- Lock screen with swipe unlock, optional salted SHA-256 PIN storage, simulated fingerprint and escalating wrong-PIN backoff.
- Home pages, app drawer search, wallpaper selection and persistent app layout state.
- Status bar, control center, gesture navigation and 3-button navigation.
- Dark, light and automatic themes with reduced-motion support.
- Settings and Calculator proof apps.
- Local persistence and factory reset.
- PWA manifest, service worker and GitHub Pages deployment workflow.

## Architecture

```text
Apps
  ↓
System Services
  ↓
Virtual Hardware Interface
  ↓
Virtual Hardware
```

The browser-specific APIs are isolated below the application layer. The intended future architecture can map the same concepts to an AOSP implementation without treating the browser prototype as the final operating-system implementation.

## Getting started

This project is platform-neutral and can be used on Linux, macOS, Windows or Android environments that provide Node.js 20. The repository intentionally does not include `package-lock.json` in this release because it was authored in an environment without npm registry access. The first connected verification run generates it.

1. Install Node.js 20 and npm.
2. Extract the release archive and enter the `SYJ-OS` directory.
3. Run the complete verification sequence:

```bash
npm run verify
```

The verification script uses `npm install` when `package-lock.json` is missing, then uses `npm ci` on subsequent runs. It runs the icon generation, typecheck, lint, unit tests, production build, Chromium installation and Playwright smoke test in order, stopping at the first failure.

After the first successful verification, commit the generated lockfile and push it to `main`:

```bash
git add package-lock.json
git commit -m "Add generated package-lock.json"
git push -u origin main
```

`package-lock.json` must be committed because the GitHub Pages deployment workflow uses `npm ci`.

The development server can be started with:

```bash
npm run dev
```

For a production preview:

```bash
npm run preview
```

## GitHub Pages deployment

The repository contains a GitHub Actions workflow at `.github/workflows/deploy.yml`.

In GitHub, open **Settings → Pages → Source** and select **GitHub Actions**. Push to `main` or start the workflow manually from the Actions tab.

The Vite base path is `/SYJ-OS/`, and generated asset URLs use that base so the site works as a project page rather than only at a domain root.

## PWA installation

After the site has been deployed over HTTPS, a compatible browser may offer an install/add-to-home-screen action. The service worker is registered only in production. The first successful load populates the application shell cache; later navigations can use the cached shell while offline.

## Project structure

```text
src/
├── apps/       App implementations and registry
├── components/ Reusable system UI
├── core/       Boot, hardware, security and storage primitives
├── services/   System service interfaces
├── shell/      Boot, lock and home surfaces
├── store/      Zustand state
├── theme/      Design tokens and wallpapers
└── types/      Shared system types

docs/
├── ARCHITECTURE.md
├── HARDWARE.md
└── TESTING.md
```

## Roadmap

- **v0.1.0 — current:** virtual device shell, hardware model, persistence, Settings, Calculator, PWA and deployment foundation.
- **v0.2:** fuller notification and recents systems, additional first-party apps, richer gestures and system-level transitions.
- **v0.3:** expanded app framework and virtual device services.
- **v0.5:** developer tooling, diagnostics and a more formal application/service contract.
- **v0.8:** AOSP-facing architecture specification and hardware capability mapping.
- **v1.0:** stable browser prototype used as a reference for a future AOSP-based implementation.

## Known limitations

- v0.1.0 was authored in an environment without npm registry access. When this archive was produced, `npm ci`/`npm install`, typecheck, lint, unit tests, production build and Playwright e2e verification had not been run successfully. The first connected `npm run verify` is the first real verification of the release.
- The project is a simulator, not a hardware emulator and not an Android implementation.
- Most bundled app icons are launchable shell representations; Settings and Calculator are the functional proof apps in v0.1.0.
- Browser security prevents the simulator from directly controlling physical modem, camera, sensors, power rails or other phone hardware.
- PIN security is suitable for the simulator's local prototype state, not for protecting production credentials or secrets.
- The virtual CPU, RAM, storage and thermal values are simulated and are not performance measurements of the host computer.
- The virtual location is a preset value; it is not a live geolocation service.
- The service worker's offline behavior depends on the browser having completed the first production load and cached the application assets.
- A real Android/AOSP implementation will require device-specific bootloader, kernel, HAL, firmware, security and certification work outside this repository.
- The 3-button navigation surface intentionally omits a recents/app-switch button in v0.1; it is planned for v0.2.
