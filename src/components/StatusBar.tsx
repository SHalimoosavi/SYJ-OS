import { BatteryCharging, BatteryFull, MapPin, Wifi, Signal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { effectiveNetwork } from '../core/hardware';
import { useSystemStore } from '../store/systemStore';

export function StatusBar() {
  const { hardware } = useSystemStore();
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = window.setInterval(() => setNow(new Date()), 1000); return () => window.clearInterval(id); }, []);
  const network = effectiveNetwork();
  const Battery = hardware.charging ? BatteryCharging : BatteryFull;
  return <div className="absolute inset-x-0 top-0 z-30 flex h-9 items-center justify-between px-4 text-[11px] font-semibold safe" aria-label="Status bar">
    <span>{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    <div className="flex items-center gap-2 opacity-90">
      <MapPin size={12} aria-label={hardware.location} />
      {network === 'Wi-Fi' ? <Wifi size={13} aria-label="Wi-Fi" /> : network === '5G' ? <Signal size={13} aria-label="5G" /> : <span aria-label="Offline">×</span>}
      <Battery size={15} aria-label={`${Math.round(hardware.batteryPercent)} percent battery`} />
    </div>
  </div>;
}
