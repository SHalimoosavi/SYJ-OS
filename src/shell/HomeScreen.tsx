import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';
import { apps, homeAppIds } from '../apps/registry';
import { useAppStore } from '../store/appStore';
import { useSystemStore } from '../store/systemStore';
import { wallpapers } from '../theme/wallpapers';
import { AppDrawer } from '../components/AppDrawer';
import { QuickSettings } from '../components/QuickSettings';
import { Toast } from '../components/Toast';
import { SystemNav } from '../components/SystemNav';

export function HomeScreen({ onPowerOff }: { onPowerOff: () => void }) {
  const { settings, hardware, homePage, layout, setHomePage, setLayout, setHardware } = useSystemStore();
  const foreground = useAppStore((s) => s.foreground);
  const open = useAppStore((s) => s.open);
  const [drawer, setDrawer] = useState(false);
  const [quick, setQuick] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const startX = useRef<number | null>(null);
  const appsForPage = homeAppIds.filter((_, index) => Math.floor(index / 8) === homePage);
  const positions = layout.length ? layout : homeAppIds.map((appId, index) => ({ appId, page: Math.floor(index / 8), x: index % 4, y: Math.floor((index % 8) / 4) }));
  const move = (appId: string, page: number, x: number, y: number) => { const next = positions.map((item) => item.appId === appId ? { ...item, page, x, y } : item); setLayout(next); };
  const onPointerDown = (e: React.PointerEvent) => { startX.current = e.clientX; };
  const onPointerUp = (e: React.PointerEvent) => { if (startX.current === null) return; const delta = e.clientX - startX.current; startX.current = null; if (Math.abs(delta) > 60) setHomePage(Math.max(0, Math.min(1, homePage + (delta < 0 ? 1 : -1)))); };
  if (foreground) return null;
  return <div className="absolute inset-0" style={{ background: wallpapers[settings.wallpaper] }} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
    <button aria-label="Open control center" onClick={() => setQuick(true)} className="absolute right-3 top-9 z-20 rounded-full bg-black/15 p-2"><ChevronDown size={15}/></button>
    <div className="flex h-full flex-col px-5 pb-8 pt-16">
      <div className="flex-1">
        <div className="mb-8"><div className="text-3xl font-semibold">{new Date().toLocaleDateString([], { weekday: 'long' })}</div><div className="mt-1 text-xs text-white/60">{hardware.location}</div></div>
        <div className="grid grid-cols-4 gap-x-4 gap-y-5">{appsForPage.map((id) => { const app = apps.find((a) => a.id === id)!; const Icon = app.icon; const item = positions.find((p) => p.appId === id)!; return <motion.button layout key={id} draggable onDragEnd={(e) => {
              if (!('clientX' in e)) return;
              const x = Math.max(
                0,
                Math.min(
                  3,
                  Math.round((e.clientX / Math.max(1, window.innerWidth)) * 4 - 0.5)
                )
              );
              move(id, homePage, x, item.y);
            }} onClick={() => open(id)} className="flex flex-col items-center gap-2"><span className="icon-tile shadow-lg" style={{ color: app.accent }}><Icon size={23}/></span><span className="text-[10px] text-white/90">{app.name}</span></motion.button>; })}</div>
      </div>
      <div className="mx-auto flex w-full max-w-sm items-center justify-around rounded-3xl bg-black/20 p-3 backdrop-blur-lg"><button aria-label="Open app drawer" onClick={() => setDrawer(true)} className="rounded-2xl bg-white/10 px-5 py-3 text-xs">All apps</button><button aria-label="Charge battery" onClick={() => { setHardware({ charging: !hardware.charging }); setToast(hardware.charging ? 'Charging stopped' : 'Charging started'); }} className="rounded-2xl bg-white/10 px-4 py-3 text-xs">{Math.round(hardware.batteryPercent)}%</button></div>
    </div>
    {drawer ? <AppDrawer onClose={() => setDrawer(false)}/> : null}
    {quick ? <QuickSettings onClose={() => setQuick(false)}/> : null}
    <SystemNav onHome={() => setHomePage(0)} onBack={() => undefined}/>
    <Toast message={toast} onDone={() => setToast(null)}/>
    <button aria-label="Power off" onDoubleClick={onPowerOff} className="absolute left-0 top-1/2 h-16 w-1 opacity-0"/>
  </div>;
}
