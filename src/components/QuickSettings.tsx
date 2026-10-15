import { Airplay, BatteryCharging, Moon, Sun, Wifi, X } from 'lucide-react';
import { useSystemStore } from '../store/systemStore';

export function QuickSettings({ onClose }: { onClose: () => void }) {
  const { hardware, settings, setHardware, setSettings } = useSystemStore();
  const toggleWifi = () => setHardware({ wifiEnabled: !hardware.wifiEnabled });
  return <div className="absolute inset-x-3 top-10 z-40 rounded-3xl glass p-4 shadow-2xl">
    <div className="mb-3 flex items-center justify-between"><div><div className="text-sm font-bold">Control Center</div><div className="text-[11px] text-[var(--syj-muted)]">SYJ OS</div></div><button aria-label="Close control center" onClick={onClose} className="rounded-full p-2 hover:bg-white/10"><X size={16}/></button></div>
    <div className="grid grid-cols-2 gap-2">
      <button onClick={toggleWifi} className={`card flex items-center gap-3 p-3 text-left ${hardware.wifiEnabled ? 'border-[var(--syj-green)]' : ''}`}><Wifi size={18}/><span className="text-xs">Wi-Fi<br/><b>{hardware.wifiEnabled ? 'On' : 'Off'}</b></span></button>
      <button onClick={() => setHardware({ airplaneMode: !hardware.airplaneMode })} className="card flex items-center gap-3 p-3 text-left"><Airplay size={18}/><span className="text-xs">Airplane<br/><b>{hardware.airplaneMode ? 'On' : 'Off'}</b></span></button>
      <button onClick={() => setSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })} className="card flex items-center gap-3 p-3 text-left">{settings.theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}<span className="text-xs">Theme<br/><b>{settings.theme}</b></span></button>
      <button onClick={() => setHardware({ charging: !hardware.charging })} className="card flex items-center gap-3 p-3 text-left"><BatteryCharging size={18}/><span className="text-xs">Charging<br/><b>{hardware.charging ? 'On' : 'Off'}</b></span></button>
    </div>
  </div>;
}
