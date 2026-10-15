import { DEVICE_PROFILES, type DeviceProfileId } from '../../types/system';
import { useSystemStore } from '../../store/systemStore';

export function effectiveNetwork(): string {
  const { hardware } = useSystemStore.getState();
  if (hardware.airplaneMode) return 'Offline';
  if (hardware.network === 'offline') return 'Offline';
  if (hardware.network === 'wifi') return hardware.wifiEnabled ? 'Wi-Fi' : 'Offline';
  if (hardware.network === '5g') return '5G';
  return navigator.onLine && hardware.wifiEnabled ? 'Wi-Fi' : 'Offline';
}

export function setDeviceProfile(id: DeviceProfileId): void {
  const profile = DEVICE_PROFILES[id];
  const current = useSystemStore.getState().hardware;
  useSystemStore.getState().setHardware({
    deviceProfile: id,
    ramUsedGb: Math.min(current.ramUsedGb, profile.ramGb * 0.75),
    storageUsedGb: Math.min(current.storageUsedGb, profile.storageGb * 0.95),
    cpuLoad: Math.min(95, Math.round(current.cpuLoad * (profile.cpuGhz / 2.8)))
  });
}

export function simulateTick(): void {
  const state = useSystemStore.getState();
  const { hardware } = state;
  const profile = DEVICE_PROFILES[hardware.deviceProfile];
  const delta = hardware.charging ? 0.35 : -0.04;
  const batteryPercent = Math.max(0, Math.min(100, hardware.batteryPercent + delta));
  const thermalTarget = 31 + hardware.cpuLoad * 0.16;
  const thermalC = Math.max(25, Math.min(70, hardware.thermalC + (thermalTarget - hardware.thermalC) * 0.08));
  const cpuLoad = Math.max(4, Math.min(92, hardware.cpuLoad + (Math.random() - 0.5) * 3));
  const ramUsedGb = Math.max(1.2, Math.min(profile.ramGb * 0.9, hardware.ramUsedGb + (Math.random() - 0.5) * 0.08));
  state.setHardware({ batteryPercent, thermalC, cpuLoad, ramUsedGb, powerSaver: batteryPercent <= 20 });
}
