import { useSystemStore } from '../store/systemStore';

export function setBrightness(value: number): void {
  useSystemStore.getState().setHardware({ brightness: Math.max(5, Math.min(100, value)) });
}

export function setRotation(value: number): void {
  useSystemStore.getState().setHardware({ rotation: value === 90 || value === 180 || value === 270 ? value : 0 });
}
