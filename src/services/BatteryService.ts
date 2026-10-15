import { useSystemStore } from '../store/systemStore';

export function batteryLabel(percent: number): string {
  if (percent <= 10) return 'Critical';
  if (percent <= 20) return 'Low';
  return `${Math.round(percent)}%`;
}

export function batteryIconLevel(percent: number): number {
  return Math.max(0, Math.min(4, Math.ceil(percent / 25)));
}

export function tickBattery(): void {
  const { hardware, setHardware } = useSystemStore.getState();
  const next = Math.max(0, Math.min(100, hardware.batteryPercent + (hardware.charging ? 0.35 : -0.04)));
  setHardware({ batteryPercent: next, powerSaver: next <= 20 });
}
