import { describe, expect, it } from 'vitest';
import { createSalt, hashPin, lockoutDurationMs, verifyPin } from '../src/core/security/pin';

describe('PIN security', () => { it('hashes and verifies a PIN', async () => { const salt = createSalt(); const hash = await hashPin('1234', salt); expect(await verifyPin('1234', salt, hash)).toBe(true); expect(await verifyPin('9999', salt, hash)).toBe(false); }); it('uses escalating backoff', () => { expect(lockoutDurationMs(1)).toBe(1000); expect(lockoutDurationMs(4)).toBe(8000); expect(lockoutDurationMs(9)).toBe(60000); }); });
