export const BOOT_DURATION = 1600;
export const RESTART_DURATION = 1200;

export async function wait(ms: number): Promise<void> {
  await new Promise((resolve) => window.setTimeout(resolve, ms));
}
