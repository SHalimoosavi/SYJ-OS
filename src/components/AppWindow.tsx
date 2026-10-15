import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { Settings } from '../apps/Settings';
import { Calculator } from '../apps/Calculator';

export function AppWindow() {
  const foreground = useAppStore((s) => s.foreground); const close = useAppStore((s) => s.close);
  return <AnimatePresence>{foreground ? <motion.div key={foreground} initial={{ opacity: 0, scale: .97, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .98, y: 10 }} transition={{ type: 'spring', stiffness: 360, damping: 30 }} className="absolute inset-0 z-20 overflow-hidden bg-[var(--syj-bg)]"><button aria-label="Close app" onClick={close} className="absolute right-3 top-9 z-40 rounded-full bg-black/15 p-2"><X size={15}/></button>{foreground === 'settings' ? <Settings/> : foreground === 'calculator' ? <Calculator/> : <PlaceholderApp name={foreground}/>}</motion.div> : null}</AnimatePresence>;
}
function PlaceholderApp({ name }: { name: string }) { return <div className="flex h-full items-center justify-center px-8 pt-12 text-center"><div><div className="text-lg font-semibold">{name[0].toUpperCase()+name.slice(1)}</div><p className="mt-2 text-xs text-[var(--syj-muted)]">This app is represented in the v0.1 shell but its functional implementation is outside the current proof surface.</p></div></div>; }
