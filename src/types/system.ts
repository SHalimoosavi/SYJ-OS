export type ThemeMode = 'dark' | 'light' | 'auto';
export type NavigationMode = 'gesture' | 'three-button';
export type NetworkMode = 'wifi' | '5g' | 'offline' | 'auto';
export type DeviceProfileId = 'phone' | 'compact' | 'tablet';
export type WallpaperId = 'dynamic' | 'aurora' | 'graphite' | 'mint' | 'circuit' | 'dawn' | 'ocean' | 'violet' | 'sand';

export interface DeviceProfile {
  id: DeviceProfileId;
  name: string;
  width: number;
  height: number;
  ramGb: number;
  storageGb: number;
  cpuGhz: number;
  gpuScore: number;
}

export interface HardwareState {
  batteryPercent: number;
  charging: boolean;
  powerSaver: boolean;
  network: NetworkMode;
  wifiEnabled: boolean;
  airplaneMode: boolean;
  brightness: number;
  rotation: number;
  thermalC: number;
  location: string;
  cpuLoad: number;
  ramUsedGb: number;
  storageUsedGb: number;
  deviceProfile: DeviceProfileId;
  volume: number;
}

export interface SecurityState {
  pinHash: string | null;
  pinSalt: string | null;
  fingerprintEnabled: boolean;
  failedAttempts: number;
  lockedUntil: number;
}

export interface SettingsState {
  theme: ThemeMode;
  wallpaper: WallpaperId;
  navigationMode: NavigationMode;
  fontScale: number;
}

export interface AppLayoutItem {
  appId: string;
  page: number;
  x: number;
  y: number;
}

export interface PersistedState {
  hardware: HardwareState;
  security: SecurityState;
  settings: SettingsState;
  layout: AppLayoutItem[];
  homePage: number;
}

export const DEVICE_PROFILES: Record<DeviceProfileId, DeviceProfile> = {
  phone: { id: 'phone', name: 'SYJ One (Phone)', width: 393, height: 852, ramGb: 8, storageGb: 256, cpuGhz: 2.8, gpuScore: 78 },
  compact: { id: 'compact', name: 'SYJ Compact', width: 360, height: 780, ramGb: 6, storageGb: 128, cpuGhz: 2.4, gpuScore: 61 },
  tablet: { id: 'tablet', name: 'SYJ Tab', width: 820, height: 1180, ramGb: 12, storageGb: 512, cpuGhz: 3.0, gpuScore: 91 }
};

export const DEFAULT_HARDWARE: HardwareState = {
  batteryPercent: 82,
  charging: false,
  powerSaver: false,
  network: 'auto',
  wifiEnabled: true,
  airplaneMode: false,
  brightness: 72,
  rotation: 0,
  thermalC: 34,
  location: 'Hyderabad, India',
  cpuLoad: 18,
  ramUsedGb: 3.2,
  storageUsedGb: 37,
  deviceProfile: 'phone',
  volume: 48
};

export const DEFAULT_SECURITY: SecurityState = {
  pinHash: null,
  pinSalt: null,
  fingerprintEnabled: false,
  failedAttempts: 0,
  lockedUntil: 0
};

export const DEFAULT_SETTINGS: SettingsState = {
  theme: 'auto',
  wallpaper: 'dynamic',
  navigationMode: 'gesture',
  fontScale: 1
};
