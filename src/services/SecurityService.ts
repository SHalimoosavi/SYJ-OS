import { createSalt, hashPin, isLocked, lockoutDurationMs, verifyPin } from '../core/security/pin';
import { useSystemStore } from '../store/systemStore';

export async function setPin(pin: string): Promise<void> {
  if (!/^\d{4,6}$/.test(pin)) throw new Error('PIN must contain 4–6 digits.');
  const salt = createSalt();
  const pinHash = await hashPin(pin, salt);
  useSystemStore.getState().setSecurity({ pinHash, pinSalt: salt, failedAttempts: 0, lockedUntil: 0 });
}

export function removePin(): void {
  useSystemStore.getState().setSecurity({ pinHash: null, pinSalt: null, failedAttempts: 0, lockedUntil: 0 });
}

export async function verifyAndRecordPin(pin: string): Promise<{ ok: boolean; lockedUntil: number }> {
  const { security } = useSystemStore.getState();
  if (!security.pinHash || !security.pinSalt) return { ok: true, lockedUntil: 0 };
  if (isLocked(security.lockedUntil)) return { ok: false, lockedUntil: security.lockedUntil };
  const ok = await verifyPin(pin, security.pinSalt, security.pinHash);
  if (ok) {
    useSystemStore.getState().setSecurity({ failedAttempts: 0, lockedUntil: 0 });
    return { ok: true, lockedUntil: 0 };
  }
  const failedAttempts = security.failedAttempts + 1;
  const lockedUntil = Date.now() + lockoutDurationMs(failedAttempts);
  useSystemStore.getState().setSecurity({ failedAttempts, lockedUntil });
  return { ok: false, lockedUntil };
}
