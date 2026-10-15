import { Fingerprint, LockKeyhole, Delete } from 'lucide-react';
import { useEffect, useState } from 'react';
import { isLocked } from '../core/security/pin';
import { verifyAndRecordPin } from '../services/SecurityService';
import { useSystemStore } from '../store/systemStore';

export function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const { security, hardware } = useSystemStore();
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('Swipe up to unlock');
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = window.setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  const locked = isLocked(security.lockedUntil);
  const submit = async (next: string) => { if (next.length < 4 || locked) return; const result = await verifyAndRecordPin(next); if (result.ok) { onUnlock(); return; } setPin(''); setMessage(`Try again in ${Math.max(1, Math.ceil((result.lockedUntil - Date.now()) / 1000))}s`); };
  const key = (digit: string) => { const next = `${pin}${digit}`.slice(0, 6); setPin(next); void submit(next); };
  return <div className="absolute inset-0 z-40 flex flex-col items-center justify-between bg-black/20 px-6 pb-12 pt-16 text-white backdrop-blur-[2px]" onPointerUp={(e) => { if (security.pinHash) return; if (e.currentTarget.getBoundingClientRect().bottom - e.clientY > 130) onUnlock(); }}>
    <div className="text-center"><div className="text-6xl font-light tracking-tight">{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div><div className="mt-2 text-xs text-white/70">{now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</div><div className="mt-5 flex items-center justify-center gap-2 text-xs text-white/60"><LockKeyhole size={13}/>{hardware.location}</div></div>
    {security.pinHash ? <div className="w-full max-w-xs"><div className="mb-4 text-center text-xs text-white/65">{message}</div><div className="mb-5 flex justify-center gap-3">{Array.from({ length: 6 }, (_, i) => <span key={i} className={`h-2 w-2 rounded-full border border-white/50 ${i < pin.length ? 'bg-white' : ''}`}/>)}</div><div className="grid grid-cols-3 gap-3">{['1','2','3','4','5','6','7','8','9'].map((d) => <button key={d} onClick={() => key(d)} className="h-14 rounded-full bg-white/10 text-xl backdrop-blur hover:bg-white/15">{d}</button>)}<button onClick={() => hardware && useSystemStore.getState().setSecurity({ failedAttempts: 0 })} className="h-14 rounded-full bg-white/5 text-xs">Reset</button><button onClick={() => key('0')} className="h-14 rounded-full bg-white/10 text-xl">0</button><button onClick={() => setPin((p) => p.slice(0, -1))} className="grid h-14 place-items-center rounded-full bg-white/5"><Delete size={18}/></button></div>{security.fingerprintEnabled ? <button onClick={onUnlock} className="mx-auto mt-4 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs"><Fingerprint size={17}/> Simulated fingerprint</button> : null}</div> : <div className="flex flex-col items-center gap-3 text-white/65"><div className="h-1.5 w-20 rounded-full bg-white/70"/><span className="text-xs">{message}</span></div>}
  </div>;
}
