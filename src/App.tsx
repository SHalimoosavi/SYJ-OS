import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { DeviceFrame } from './components/DeviceFrame';
import { StatusBar } from './components/StatusBar';
import { AppWindow } from './components/AppWindow';
import { BootScreen, PowerOffScreen } from './shell/BootScreen';
import { HomeScreen } from './shell/HomeScreen';
import { LockScreen } from './shell/LockScreen';
import { useSystemStore } from './store/systemStore';
import { DEVICE_PROFILES, type ThemeMode } from './types/system';
import { simulateTick } from './core/hardware';

export function App() {
  const {
    hardware,
    settings,
    booted,
    locked,
    poweredOff,
    setHardware,
    setBooted,
    setLocked,
    setPoweredOff,
    setSettings
  } = useSystemStore();
  const [booting, setBooting] = useState(!booted);
  const [poweringOff, setPoweringOff] = useState(false);
  const [toolbar, setToolbar] = useState(true);
  const [batteryDialog, setBatteryDialog] = useState(false);
  const fullscreen = typeof window !== 'undefined' && (window.matchMedia('(display-mode: standalone)').matches || window.innerWidth < 640);
  const profile = DEVICE_PROFILES[hardware.deviceProfile];
  const resolvedTheme: Exclude<ThemeMode, 'auto'> = settings.theme === 'auto' ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark') : settings.theme;
  const style = useMemo(() => ({ '--font-scale': settings.fontScale } as CSSProperties), [settings.fontScale]);

  useEffect(() => { if (booted) { setBooting(false); return; } setBooting(true); }, [booted]);
  useEffect(() => { if (booting) return; const id = window.setInterval(simulateTick, 1000); return () => clearInterval(id); }, [booting]);
  useEffect(() => { if (hardware.batteryPercent <= 15 && !hardware.charging) setBatteryDialog(true); }, [hardware.batteryPercent, hardware.charging]);
  useEffect(() => { const key = (event: KeyboardEvent) => { if (event.key === 'Escape') setToolbar((v) => !v); }; window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key); }, []);

  const finishBoot = () => { setBooted(true); setBooting(false); setPoweredOff(false); setLocked(Boolean(useSystemStore.getState().security.pinHash)); };
  const powerOff = () => { setPoweringOff(true); };
  const finishPowerOff = () => { setPoweringOff(false); setPoweredOff(true); setBooted(false); };
  const powerOn = () => { setPoweredOff(false); setBooting(true); };
  const powerButton = () => { if (poweredOff) powerOn(); else setLocked(true); };
  const volume = (delta: number) => { const next = Math.max(0, Math.min(100, hardware.volume + delta)); useSystemStore.getState().setHardware({ volume: next }); };

  return <div className="app-shell" style={style} data-theme={resolvedTheme}>
    {!fullscreen && toolbar ? <div className="fixed left-4 top-4 z-[70] flex items-center gap-2 rounded-2xl glass p-2 shadow-lg"><span className="px-2 text-[11px] font-semibold">SYJ OS v0.1.0</span><select aria-label="Device profile" value={hardware.deviceProfile} onChange={(e) => useSystemStore.getState().setHardware({ deviceProfile: e.target.value as typeof hardware.deviceProfile })} className="rounded-xl bg-black/10 px-2 py-1 text-[10px]"><option value="phone">Phone</option><option value="compact">Compact</option><option value="tablet">Tab</option></select><select aria-label="Theme" value={settings.theme} onChange={(e) => setSettings({ theme: e.target.value as ThemeMode })} className="rounded-xl bg-black/10 px-2 py-1 text-[10px]"><option value="auto">Auto</option><option value="dark">Dark</option><option value="light">Light</option></select></div> : null}
    {!fullscreen && !poweredOff ? <div className="fixed right-[calc(50%-min(19vw,206px)-20px)] top-1/2 z-[70] flex -translate-y-1/2 flex-col gap-2"><button aria-label="Power" onClick={powerButton} className="h-14 w-2 rounded-full bg-white/20"/><button aria-label="Volume up" onClick={() => volume(5)} className="h-10 w-2 rounded-full bg-white/20"/><button aria-label="Volume down" onClick={() => volume(-5)} className="h-10 w-2 rounded-full bg-white/20"/></div> : null}
    <DeviceFrame profileId={profile.id} fullscreen={fullscreen}>{poweredOff ? <button onClick={powerOn} className="absolute inset-0 z-50 grid place-items-center bg-black text-white"><span className="text-xs tracking-[.35em] text-white/40">POWER ON</span></button> : <><StatusBar/><HomeScreen onPowerOff={powerOff}/><AppWindow/>{locked && !booting ? <LockScreen onUnlock={() => setLocked(false)}/> : null}{booting ? <BootScreen onDone={finishBoot} skippable={booted}/> : null}{poweringOff ? <PowerOffScreen onDone={finishPowerOff}/> : null}{batteryDialog ? <div className="absolute inset-0 z-[60] grid place-items-center bg-black/45 p-6 backdrop-blur-sm"><div role="alertdialog" className="w-full max-w-xs rounded-3xl glass p-5 shadow-2xl"><div className="text-sm font-semibold">Low battery</div><p className="mt-2 text-xs text-white/60">Battery is at {Math.round(hardware.batteryPercent)}%. Consider enabling charging or power saver.</p><div className="mt-4 flex justify-end gap-2"><button onClick={() => setHardware({ powerSaver: true })} className="rounded-xl bg-[var(--syj-green)] px-3 py-2 text-xs text-black">Power saver</button><button onClick={() => setBatteryDialog(false)} className="rounded-xl bg-white/5 px-3 py-2 text-xs">Dismiss</button></div></div></div> : null}</>}</DeviceFrame>
  </div>;
}
