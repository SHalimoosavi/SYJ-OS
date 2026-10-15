import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://127.0.0.1:4173/SYJ-OS/', ...devices['Desktop Chrome'] },
  webServer: { command: 'npm run build && npm run preview', url: 'http://127.0.0.1:4173/SYJ-OS/', reuseExistingServer: true }
});
