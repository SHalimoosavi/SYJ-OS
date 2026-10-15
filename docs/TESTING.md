# Testing

## First verification

This v0.1.0 archive was authored in an environment without npm registry access. The release archive was therefore not tested before it was produced: typecheck, lint, unit tests, production build and the Playwright e2e smoke test had not been run successfully. The first connected `npm run verify` is the first real verification of the release.

Run on a platform with Node.js 20 and registry access:

```bash
npm run verify
```

`npm run verify` runs, in order, `npm install` when `package-lock.json` is absent (otherwise `npm ci`), icon generation, typecheck, lint, unit tests, build, Chromium installation and the Playwright smoke test. It stops at the first failure and returns a non-zero exit code.

## Acceptance checklist

These are the release requirements to verify during the first connected run. They are intentionally not marked as passed here because the release was not tested before packaging.

- [ ] Boot completes.
- [ ] Lock screen unlocks with swipe and with PIN.
- [ ] Wrong PIN locks out.
- [ ] Home pages swipe.
- [ ] Icons drag and persist.
- [ ] App drawer search finds apps.
- [ ] Settings changes theme, wallpaper and navigation mode.
- [ ] Setting battery to 15% shows the dialog and icon.
- [ ] Offline mode shows in the status bar.
- [ ] Calculator works.
- [ ] Device profile switch resizes the device.
- [ ] Reload restores state.
- [ ] Factory reset clears it.
- [ ] Installed PWA works offline after first load.

## Automated coverage

Vitest covers virtual hardware reactions, battery labeling, PIN hashing/backoff, settings reset, calculator logic, app lifecycle and key components. Playwright covers the production preview path, boot, unlock, Settings navigation, dark-theme persistence and reload. These tests were authored as release coverage but had not been executed successfully when the archive was produced.
