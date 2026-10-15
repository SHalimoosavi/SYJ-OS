import { create } from 'zustand';
import type { AppId } from '../apps/registry';

interface AppStore { foreground: AppId | null; open: (id: AppId) => void; close: () => void; }
export const useAppStore = create<AppStore>((set) => ({ foreground: null, open: (foreground) => set({ foreground }), close: () => set({ foreground: null }) }));
