'use client';

import { useEffect, useMemo, useState } from 'react';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

export function usePriceTick(initial: number, step = 0.0008, ms = 2200) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(initial);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setValue((v) => Number((v * (1 + (Math.random() - 0.5) * step)).toFixed(4))), ms);
    return () => clearInterval(id);
  }, [reduced, step, ms]);
  return value;
}

export function usePeriodicFeed(seed: string[], minMs = 10000, maxMs = 20000) {
  const reduced = useReducedMotion();
  const [items, setItems] = useState(seed);
  useEffect(() => {
    if (reduced) return;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      t = setTimeout(() => {
        setItems((prev) => {
          const ts = new Date().toISOString().slice(11, 19);
          const msg = ['Adjusted SL', 'Increased BTC long', 'Reduced ETH hedge', 'Signal strengthening'][Math.floor(Math.random() * 4)];
          return [`${ts} ${msg}`, ...prev].slice(0, 5);
        });
        tick();
      }, Math.floor(minMs + Math.random() * (maxMs - minMs)));
    };
    tick();
    return () => clearTimeout(t);
  }, [reduced, minMs, maxMs]);
  return items;
}

export function usePulseLatency(initial = 16) {
  const reduced = useReducedMotion();
  const [latency, setLatency] = useState(initial);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setLatency((l) => Math.max(8, Math.min(32, l + (Math.random() > 0.5 ? 1 : -1)))), 1800);
    return () => clearInterval(id);
  }, [reduced]);
  return latency;
}

export function useExecutionLifecycle() {
  const [state, setState] = useState<'idle'|'pending'|'approved'|'routed'|'executed'|'journaled'>('idle');
  const [log, setLog] = useState<string[]>([]);
  const run = () => {
    const steps: Array<typeof state> = ['pending','approved','routed','executed','journaled'];
    setLog([]);
    steps.forEach((s, i) => setTimeout(() => { setState(s); setLog((prev) => [`${new Date().toISOString().slice(11,19)} ${s.toUpperCase()}`, ...prev]); }, 500 + i * 700));
  };
  return { state, log, run, reset: () => setState('idle') };
}
