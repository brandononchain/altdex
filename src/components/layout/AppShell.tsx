'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Bell, Menu, Settings, X } from 'lucide-react';
import { accountSummary, watchlist } from '@/lib/mockData';
import { formatCompact, formatCurrency, formatNumber, formatPercent, valueToneClass } from '@/lib/formatters';
import { usePulseLatency, useReducedMotion } from '@/lib/sim/hooks';
import { IconButton, MetricCard, Panel, StatusPill } from '@/components/ui/primitives';
import { useWallet, walletStateTone } from '@/lib/wallet/WalletProvider';
import ConnectWalletOverlay from '@/components/wallet/ConnectWalletOverlay';

const navItems = [
  { href: '/terminal', label: 'Terminal' }, { href: '/portfolio', label: 'Portfolio' }, { href: '/agents', label: 'Agents' },
  { href: '/markets', label: 'Markets' }, { href: '/data-lab', label: 'Data Lab' }, { href: '/strategies', label: 'Strategies' },
  { href: '/risk-engine', label: 'Risk Engine' }, { href: '/settings', label: 'Settings' }, { href: '/journal', label: 'Journal' }
];

function Sidebar({ mobileOpen, close }: { mobileOpen: boolean; close: () => void }) {
  const { session, connect, disconnect, setWrongNetwork } = useWallet();
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [simWatchlist, setSimWatchlist] = useState(watchlist);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setSimWatchlist((prev) => prev.map((w) => ({ ...w, change24h: Number((w.change24h + (Math.random()-0.5)*0.08).toFixed(2)), price: Number((w.price * (1 + (Math.random()-0.5)*0.0007)).toFixed(4)) }))), 2600);
    return () => clearInterval(id);
  }, [reduced]);
  return <aside className={`fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-border-subtle bg-bg-soft p-3 transition-transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
    <div className="mb-4 flex items-center justify-between border-b border-border-subtle pb-3 text-lg font-semibold tracking-[0.28em]">ALTDEX<button className="lg:hidden" onClick={close}><X size={16} /></button></div>
    <nav className="space-y-1">{navItems.map((item) => <Link key={item.href} href={item.href} onClick={close} className={`block border px-3 py-2 text-sm ${pathname === item.href ? 'border-accent-cyan/40 text-accent-cyan bg-panel-raised' : 'border-transparent text-text-muted hover:border-border-subtle hover:text-text-primary'}`}>{item.label.toUpperCase()}</Link>)}</nav>
    <Panel className="mt-4 p-3 text-xs"><div className="mb-2 text-text-muted">WATCHLIST</div>{simWatchlist.map((item) => <div key={item.symbol} className="mb-2 flex justify-between font-mono text-[11px]"><span>{item.symbol}</span><span className={valueToneClass(item.change24h)}>{formatPercent(item.change24h)}</span></div>)}</Panel>
    <Panel className="mt-auto p-3 text-xs"><div className="mb-2 text-text-muted">SYSTEM STATUS</div><StatusPill tone="success">All Systems Operational</StatusPill></Panel>
    <Panel className="mt-2 p-3 text-xs"><div className="mb-2 text-text-muted">NETWORK</div><div className="font-mono">Solana</div></Panel>
    <Panel className="mt-2 p-3 text-xs"><div className="text-text-muted">ACCOUNT</div><div className="mt-1 font-mono">{session.address ?? 'Disconnected'}</div><div className={`mt-1 text-[11px] ${walletStateTone(session.state)}`}>{session.state.replace('_',' ')}</div><div className="mt-2 grid grid-cols-2 gap-1">{session.state === 'connected' ? <button className="terminal-btn py-1" onClick={() => disconnect()}>Disconnect</button> : <button className="terminal-btn-primary py-1" onClick={() => setWalletModalOpen(true)}>Connect</button>}<button className="terminal-btn py-1" onClick={() => setWrongNetwork()}>Net Test</button></div></Panel>
    <ConnectWalletOverlay open={walletModalOpen} onClose={() => setWalletModalOpen(false)} />
  </aside>;
}

function TopBar({ openMenu }: { openMenu: () => void }) {
  const latency = usePulseLatency(accountSummary.latencyMs);
  const metrics = [
    ['EQUITY', formatCurrency(accountSummary.equity)], ['P&L (24H)', formatCurrency(accountSummary.pnl24h)],
    ['MARGIN USED', formatCurrency(accountSummary.marginUsed)], ['AVAILABLE', formatCurrency(accountSummary.available)], ['RISK', formatPercent(accountSummary.risk, 1)]
  ];
  return <Panel className="mb-3 flex items-center justify-between gap-2 px-3 py-2"><div className="flex items-center gap-2"><button aria-label="Open navigation" onClick={openMenu} className="terminal-btn lg:hidden px-2 py-1"><Menu size={14} /></button><div><h1 className="text-sm font-semibold tracking-wide">TERMINAL</h1><p className="text-[11px] text-text-muted">AI-NATIVE EXECUTION TERMINAL</p></div></div><div className="hidden md:flex">{metrics.map(([l, v]) => <MetricCard key={l} label={l} value={v} />)}</div><div className="flex items-center gap-2"><span className="font-mono text-xs text-accent-green">{formatNumber(latency, 0)}ms</span><IconButton label="Activity"><Activity size={14} /></IconButton><IconButton label="Notifications"><Bell size={14} /></IconButton><IconButton label="Settings"><Settings size={14} /></IconButton></div></Panel>;
}

export default function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return <div className="min-h-screen bg-bg-base text-text-primary"><Sidebar mobileOpen={mobileOpen} close={() => setMobileOpen(false)} />{mobileOpen && <button aria-label="Close navigation backdrop" className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} />}<main className="p-3 lg:ml-60"><TopBar openMenu={() => setMobileOpen(true)} />{children}<div className="mt-3 text-[10px] text-text-muted">Terminal AUM: {formatCompact(accountSummary.equity)}</div></main></div>;
}
