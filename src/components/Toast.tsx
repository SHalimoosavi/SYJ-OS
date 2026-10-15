import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

export function Toast({ message, onDone }: { message: string | null; onDone: () => void }) {
  useEffect(() => { if (!message) return; const id = window.setTimeout(onDone, 1500); return () => window.clearTimeout(id); }, [message, onDone]);
  return <AnimatePresence>{message ? <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-16 left-1/2 z-50 -translate-x-1/2 rounded-full bg-black/75 px-4 py-2 text-xs shadow-lg">{message}</motion.div> : null}</AnimatePresence>;
}
