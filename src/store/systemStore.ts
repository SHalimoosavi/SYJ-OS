import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { clearStorage } from '../core/storage/settings';
import { DEFAULT_HARDWARE, DEFAULT_SECURITY, DEFAULT_SETTINGS, type AppLayoutItem, type HardwareState, type SecurityState, type SettingsState } from '../types/system';

interface SystemStore {
  hardware: HardwareState;
  security: SecurityState;
  settings: SettingsState;
  layout: AppLayoutItem[];
  homePage: number;
  booted: boolean;
  locked: boolean;
  poweredOff: boolean;
  setHardware: (patch: Partial<HardwareState>) => void;
  setSecurity: (patch: Partial<SecurityState>) => void;
  setSettings: (patch: Partial<SettingsState>) => void;
  setLayout: (layout: AppLayoutItem[]) => void;
  setHomePage: (page: number) => void;
  setBooted: (value: boolean) => void;
  setLocked: (value: boolean) => void;
  setPoweredOff: (value: boolean) => void;
  factoryReset: () => void;
}

export const useSystemStore = create<SystemStore>()(persist((set) => ({
  hardware: DEFAULT_HARDWARE,
  security: DEFAULT_SECURITY,
  settings: DEFAULT_SETTINGS,
  layout: [],
  homePage: 0,
  booted: false,
  locked: true,
  poweredOff: false,
  setHardware: (patch) => set((state) => ({ hardware: { ...state.hardware, ...patch } })),
  setSecurity: (patch) => set((state) => ({ security: { ...state.security, ...patch } })),
  setSettings: (patch) => set((state) => ({ settings: { ...state.settings, ...patch } })),
  setLayout: (layout) => set({ layout }),
  setHomePage: (homePage) => set({ homePage }),
  setBooted: (booted) => set({ booted }),
  setLocked: (locked) => set({ locked }),
  setPoweredOff: (poweredOff) => set({ poweredOff }),
  factoryReset: () => {
    clearStorage();
    set({ hardware: DEFAULT_HARDWARE, security: DEFAULT_SECURITY, settings: DEFAULT_SETTINGS, layout: [], homePage: 0, booted: false, locked: true, poweredOff: false });
  }
}), {
  name: 'system',
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({ hardware: state.hardware, security: state.security, settings: state.settings, layout: state.layout, homePage: state.homePage })
}));
