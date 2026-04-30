'use client';

import Link from 'next/link';

import { useMemo, useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { Panel, Tabs } from '@/components/ui/primitives';
import { agents } from '@/lib/mockData';
import { formatCompact, formatCurrency, formatPercent } from '@/lib/formatters';

const catalog = [
  ...agents,
  { ...agents[0], name: 'NOVA-3', strategy: 'Market-Making Grid', chain: 'Ethereum', tvl: 8200000, return30d: 12.44, winRate: 71.2, sharpe: 2.15, drawdown: 7.32, status: 'Active' as const, walletShort: '0xB91...ff09', performanceSparkline: [38, 39, 41, 42, 40, 44, 45, 47] },
  { ...agents[0], name: 'DELTA-X', strategy: 'Stat Arb', chain: 'Base', tvl: 4600000, return30d: 9.18, winRate: 63.1, sharpe: 1.84, drawdown: 4.98, status: 'Paused' as const, walletShort: '0xD3a...12ce', performanceSparkline: [31, 33, 32, 34, 35, 36, 37, 38] }
];

export default function AgentsPage() {
  const [selected, setSelected] = useState(catalog[0]);
  const [showAlloc, setShowAlloc] = useState(false);

  const totals = useMemo(() => {
    const totalTvl = catalog.reduce((a, b) => a + b.tvl, 0);
    const avg = (k: 'return30d' | 'winRate' | 'sharpe') => catalog.reduce((a, b) => a + b[k], 0) / catalog.length;
    return { totalAgents: catalog.length, totalTvl, avgReturn: avg('return30d'), avgWin: avg('winRate'), avgSharpe: avg('sharpe') };
  }, []);

  return (
    <AppShell>
      <div className="grid grid-cols-12 gap-3">
        <Panel className="col-span-12 p-3">
          <div className="flex items-start justify-between"><div><h2 className="text-lg font-semibold">AGENTS</h2><p className="text-xs text-text-muted">Autonomous strategies. Verified performance. Transparent execution.</p></div><button className="border border-accent-cyan/40 bg-accent-cyan/10 px-3 py-2 text-xs text-accent-cyan">Deploy Agent</button></div>
          <div className="mt-3"><Tabs items={['DISCOVER', 'MY AGENTS', 'DEPLOYMENTS']} /></div>
          <div className="mt-3 grid grid-cols-6 gap-2 text-xs">
            <Metric label="Total Agents" value={String(totals.totalAgents)} />
            <Metric label="Total TVL" value={formatCurrency(totals.totalTvl)} />
            <Metric label="Avg. 30D Return" value={formatPercent(totals.avgReturn)} />
            <Metric label="Win Rate Avg" value={formatPercent(totals.avgWin)} />
            <Metric label="Sharpe Ratio Avg" value={totals.avgSharpe.toFixed(2)} />
            <Metric label="Trades 24H" value="1,284" />
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2 text-xs"><input className="col-span-2 border border-border-subtle bg-panel-raised p-2" placeholder="Search agents, keywords, or wallet" /><select className="border border-border-subtle bg-panel-raised p-2"><option>All Strategies</option></select><select className="border border-border-subtle bg-panel-raised p-2"><option>All Chains</option></select><button className="border border-border-subtle bg-panel-raised p-2">Sort by Perf 30D ⌄ · ⚲</button></div>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">{['High Frequency', 'Trend Following', 'Market Making', 'Arbitrage', 'Swing Trading', 'Adaptive'].map((f) => <button key={f} className="border border-border-subtle px-2 py-1 text-text-muted hover:text-text-primary">{f}</button>)}</div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-8">
          <div className="text-sm font-semibold">AGENT MARKETPLACE</div>
          <table className="mt-2 w-full text-xs"><thead><tr className="text-text-muted">{['Agent', 'Strategy', 'Chain', 'TVL', '30D Return', 'Win Rate', 'Sharpe', 'Drawdown', 'Actions'].map((h) => <th key={h} className="border-b border-border-subtle p-2 text-left">{h}</th>)}</tr></thead><tbody className="font-mono">{catalog.map((a) => <tr key={a.name} className={`cursor-pointer ${selected.name === a.name ? 'bg-panel-raised' : ''}`} onClick={() => setSelected(a)}><td className="border-b border-border-subtle p-2">{a.name} <span className="text-accent-cyan">✔</span></td><td className="border-b border-border-subtle p-2">{a.strategy}</td><td className="border-b border-border-subtle p-2">{a.chain}</td><td className="border-b border-border-subtle p-2">{formatCurrency(a.tvl)}</td><td className="border-b border-border-subtle p-2 text-accent-green">{formatPercent(a.return30d)}</td><td className="border-b border-border-subtle p-2">{a.winRate}%</td><td className="border-b border-border-subtle p-2">{a.sharpe}</td><td className="border-b border-border-subtle p-2 text-accent-red">-{a.drawdown}%</td><td className="border-b border-border-subtle p-2"><Link href={`/agents/${a.name.toLowerCase()}`} className="border border-border-subtle px-2 py-1">View</Link></td></tr>)}</tbody></table>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-4">
          <div className="mb-2 flex items-center justify-between"><div className="text-sm font-semibold">AGENT OVERVIEW</div><span className="border border-accent-cyan/50 px-2 py-1 text-[10px] text-accent-cyan">VERIFIED</span></div>
          <div className="space-y-1 text-xs font-mono"><div className="text-lg">{selected.name}</div><div className="text-text-muted">{selected.strategy}</div><div>TVL: {formatCurrency(selected.tvl)}</div><div>30D Return: <span className="text-accent-green">{formatPercent(selected.return30d)}</span></div><div>All-time Return: <span className="text-accent-green">+146.2%</span></div></div>
          <div className="mt-3 border border-border-subtle bg-panel-raised p-2"><div className="mb-1 text-xs text-text-muted">Equity Curve · 30D</div><div className="grid h-24 grid-cols-8 items-end gap-1">{selected.performanceSparkline.map((n, i) => <div key={i} className="bg-accent-cyan/80" style={{ height: `${n}%` }} />)}</div></div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs"><Stat k="Win Rate" v={`${selected.winRate}%`} /><Stat k="Sharpe" v={selected.sharpe.toFixed(2)} /><Stat k="Sortino" v="3.41" /><Stat k="Max DD" v={`${selected.drawdown}%`} /><Stat k="Trades" v="142" /><Stat k="Avg Hold" v="4.2h" /></div>
          <div className="mt-3 border border-border-subtle p-2 text-xs"><div className="mb-1 text-text-muted">Allocation Panel</div><div className="font-mono">Suggested Allocation: {formatCompact(selected.tvl * 0.035)} USDC</div><div className="mt-2 grid grid-cols-2 gap-2"><button onClick={() => setShowAlloc(true)} className="border border-accent-green/40 bg-accent-green/15 px-2 py-1 text-accent-green">Add Funds</button><button className="border border-accent-red/40 bg-accent-red/15 px-2 py-1 text-accent-red">Withdraw</button></div></div>
          <div className="mt-3 text-xs"><div className="mb-1 text-text-muted">Recent Activity</div><div className="space-y-1 font-mono"><div>15:41 Increased BTC leg</div><div>15:28 Reduced SOL hedge</div><div>15:10 Strategy rebalance</div></div></div>
        </Panel>
      </div>

      {showAlloc && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"><Panel className="w-[360px] p-3"><div className="text-sm font-semibold">Allocation Placeholder</div><div className="mt-2 text-xs text-text-muted">Add Funds flow for {selected.name} will be connected to wallet + risk checks.</div><div className="mt-3 flex justify-end"><button onClick={() => setShowAlloc(false)} className="border border-border-subtle px-3 py-1">Close</button></div></Panel></div>}
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="border border-border-subtle bg-panel-raised p-2"><div className="text-text-muted">{label}</div><div className="mt-1 font-mono text-sm">{value}</div></div>;
}

function Stat({ k, v }: { k: string; v: string }) {
  return <div className="border border-border-subtle p-2"><div className="text-text-muted">{k}</div><div className="mt-1 font-mono">{v}</div></div>;
}
