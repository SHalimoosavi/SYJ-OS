import { beforeEach, describe, expect, it } from 'vitest';
import { effectiveNetwork, setDeviceProfile, simulateTick } from '../src/core/hardware';
import { useSystemStore } from '../src/store/systemStore';
import { DEFAULT_HARDWARE, DEFAULT_SECURITY, DEFAULT_SETTINGS } from '../src/types/system';

describe('virtual hardware', () => {
  beforeEach(() => useSystemStore.setState({ hardware: { ...DEFAULT_HARDWARE }, security: { ...DEFAULT_SECURITY }, settings: { ...DEFAULT_SETTINGS }, layout: [], homePage: 0, booted: false, locked: true, poweredOff: false }));
  it('switches network states', () => { useSystemStore.getState().setHardware({ network: 'offline' }); expect(effectiveNetwork()).toBe('Offline'); useSystemStore.getState().setHardware({ network: '5g' }); expect(effectiveNetwork()).toBe('5G'); });
  it('changes profile and keeps values inside profile limits', () => { setDeviceProfile('compact'); const { hardware } = useSystemStore.getState(); expect(hardware.deviceProfile).toBe('compact'); expect(hardware.ramUsedGb).toBeLessThanOrEqual(6 * .75); });
  it('ticks battery and enables saver at low levels', () => { useSystemStore.getState().setHardware({ batteryPercent: 20, charging: false }); simulateTick(); expect(useSystemStore.getState().hardware.powerSaver).toBe(true); });
});
