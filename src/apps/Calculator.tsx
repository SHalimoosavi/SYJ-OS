import { useMemo, useState } from 'react';
import { Delete, Equal, History } from 'lucide-react';

export function calculate(expression: string): number {
  const normalized = expression
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/[^0-9+\-*/().%\s]/g, '')
    .trim();

  if (!normalized) return 0;

  // A trailing +, -, *, or / is incomplete.
  // A trailing % is valid because percentage is a postfix operator.
  if (/[+\-*/]\s*$/.test(normalized)) {
    throw new Error('Incomplete expression');
  }

  const safe = normalized.replace(
    /(\d+(?:\.\d+)?)%/g,
    '($1/100)'
  );

  const value = Function(`"use strict"; return (${safe})`)();

  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error('Invalid expression');
  }

  return value;
}

export function Calculator() {
  const [expression, setExpression] = useState(''); const [history, setHistory] = useState<string[]>([]); const [scientific, setScientific] = useState(false);
  const result = useMemo(() => { try { return String(calculate(expression)); } catch { return '—'; } }, [expression]);
  const add = (value: string) => setExpression((current) => `${current}${value}`);
  const equals = () => { try { const value = calculate(expression); setHistory((h) => [`${expression} = ${value}`, ...h].slice(0, 10)); setExpression(String(value)); } catch { /* display remains */ } };
  const keys = ['7','8','9','÷','4','5','6','×','1','2','3','−','0','.','%','+'];
  return <div className="h-full overflow-auto bg-[var(--syj-bg)] px-4 pb-16 pt-12"><div className="flex items-center justify-between"><div><div className="text-lg font-semibold">Calculator</div><div className="text-[11px] text-[var(--syj-muted)]">Basic & scientific</div></div><button aria-label="Toggle scientific mode" onClick={() => setScientific(!scientific)} className="rounded-xl bg-white/5 px-3 py-2 text-[10px]">{scientific ? 'Scientific' : 'Basic'}</button></div><div className="mt-5 rounded-3xl bg-black/20 p-5 text-right"><div className="min-h-7 break-all text-sm text-white/50">{expression || '0'}</div><div className="mt-2 break-all text-3xl font-light">{result}</div></div>{scientific ? <div className="mt-3 grid grid-cols-4 gap-2">{['sin','cos','tan','√','π','log','ln','^'].map((k) => <button key={k} onClick={() => add(k === 'π' ? '3.1415926535' : k === '^' ? '**' : '')} className="rounded-xl bg-white/5 py-3 text-xs">{k}</button>)}</div> : null}<div className="mt-3 grid grid-cols-4 gap-2">{keys.map((key) => <button key={key} onClick={() => add(key)} className="rounded-2xl bg-white/7 py-4 text-lg hover:bg-white/10">{key}</button>)}<button onClick={() => setExpression('')} className="rounded-2xl bg-white/5 py-4"><Delete size={18} className="mx-auto"/></button><button onClick={equals} className="col-span-2 rounded-2xl bg-[var(--syj-green)] py-4 font-semibold text-[#0b0f14]"><Equal className="mx-auto" size={20}/></button></div><div className="mt-6"><div className="mb-2 flex items-center gap-2 text-xs font-semibold"><History size={14}/> History</div>{history.length ? history.map((item) => <div key={item} className="border-b border-white/5 py-2 text-xs text-white/60">{item}</div>) : <div className="text-xs text-white/35">No calculations yet.</div>}</div></div>;
}
