import { ChevronLeft, Circle, Square } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { useSystemStore } from '../store/systemStore';

export function SystemNav({ onHome, onBack }: { onHome: () => void; onBack: () => void }) {
  const mode = useSystemStore((s) => s.settings.navigationMode);
  const close = useAppStore((s) => s.close);
  if (mode === 'gesture') return <div className="absolute bottom-1 left-1/2 z-30 h-6 w-28 -translate-x-1/2"><button aria-label="Home gesture" onClick={onHome} className="absolute bottom-1 left-1/2 h-1.5 w-24 -translate-x-1/2 rounded-full bg-white/70"/></div>;
  return <div className="absolute bottom-0 inset-x-0 z-30 flex h-10 items-center justify-around bg-black/10 safe"><button aria-label="Back" onClick={onBack}><ChevronLeft size={18}/></button><button aria-label="Home" onClick={onHome}><Circle size={16}/></button>{useAppStore.getState().foreground ? <button aria-label="Close current app" onClick={close}><Square size={15}/></button> : <span className="w-4"/>}</div>;
}
