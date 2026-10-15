import { describe, expect, it } from 'vitest';
import { batteryIconLevel, batteryLabel } from '../src/services/BatteryService';

describe('battery service', () => { it('labels low and critical states', () => { expect(batteryLabel(9)).toBe('Critical'); expect(batteryLabel(15)).toBe('Low'); expect(batteryLabel(82)).toBe('82%'); }); it('maps levels', () => { expect(batteryIconLevel(1)).toBe(1); expect(batteryIconLevel(100)).toBe(4); }); });
