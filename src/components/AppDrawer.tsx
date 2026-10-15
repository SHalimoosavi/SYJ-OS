import { Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { apps } from '../apps/registry';
import { useAppStore } from '../store/appStore';
import { motion } from 'framer-motion';

export function AppDrawer({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const open = useAppStore((s) => s.open);
  const filtered = useMemo(() => apps.filter((app) => app.name.toLowerCase().includes(query.toLowerCase())), [query]);
  return <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="absolute inset-0 z-30 bg-black/40 p-5 pt-12 backdrop-blur-xl">
    <div className="mb-5 flex items-center gap-3"><div className="flex flex-1 items-center gap-2 rounded-2xl bg-white/10 px-3 py-2"><Search size={16}/><input autoFocus aria-label="Search apps" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search apps" className="w-full bg-transparent text-sm outline-none"/></div><button aria-label="Close app drawer" onClick={onClose}><X/></button></div>
    <div className="grid grid-cols-4 gap-5 overflow-auto pb-20">{filtered.map((app) => { const Icon = app.icon; return <button key={app.id} onClick={() => { open(app.id); onClose(); }} className="flex flex-col items-center gap-2 text-center"><span className="icon-tile" style={{ color: app.accent }}><Icon size={23}/></span><span className="text-[10px]">{app.name}</span></button>; })}</div>
  </motion.div>;
}
