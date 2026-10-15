import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BOOT_DURATION, wait } from '../core/boot/boot';
import { useSystemStore } from '../store/systemStore';

export function BootScreen({ onDone, skippable = false }: { onDone: () => void; skippable?: boolean }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => { const start = performance.now(); let frame = 0; const loop = () => { const value = Math.min(100, ((performance.now() - start) / BOOT_DURATION) * 100); setProgress(value); if (value < 100) frame = requestAnimationFrame(loop); else void wait(120).then(onDone); }; frame = requestAnimationFrame(loop); return () => cancelAnimationFrame(frame); }, [onDone]);
  return <div onClick={skippable ? onDone : undefined} className="absolute inset-0 z-50 grid place-items-center bg-[#0b0f14] text-white no-select" role="status" aria-label="SYJ OS starting">
    <div className="w-48 text-center"><motion.div initial={{ scale: .8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-3xl bg-[var(--syj-green)] text-5xl font-black text-[#0b0f14]">S</motion.div><div className="text-sm font-semibold tracking-[.3em]">SYJ OS</div><div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[var(--syj-green)]" style={{ width: `${progress}%` }}/></div>{skippable ? <p className="mt-3 text-[10px] text-white/45">Tap to skip</p> : null}</div>
  </div>;
}

export function PowerOffScreen({ onDone }: { onDone: () => void }) { useEffect(() => { const id = window.setTimeout(onDone, 850); return () => clearTimeout(id); }, [onDone]); return <div className="absolute inset-0 z-50 grid place-items-center bg-black text-white"><div className="text-xs tracking-[.35em] text-white/40">POWERING OFF</div></div>; }
