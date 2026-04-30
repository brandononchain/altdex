'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { Panel, Tabs } from '@/components/ui/primitives';
import { strategies } from '@/lib/mockData';
import { formatCurrency, formatPercent } from '@/lib/formatters';

const catalog = [
  ...strategies,
  { ...strategies[0], name: 'Mean Revert X', type: 'Mean Reversion', markets: ['SOL-PERP','ARB-PERP'], timeframe: '5m', pnl: 6822.15, returnPct: 1.63, winRate: 72.1, sharpe: 2.02, drawdown: 4.92, status: 'Running' as const },
  { ...strategies[0], name: 'Vol Breakout Pro', type: 'Breakout', markets: ['BTC-PERP'], timeframe: '1H', pnl: 4210.87, returnPct: 0.88, winRate: 61.4, sharpe: 1.71, drawdown: 7.15, status: 'Backtest' as const }
];

export default function StrategiesPage() {
  const [selected, setSelected] = useState(catalog[0]);
  const totals = useMemo(() => {
    const avg = (k: 'returnPct' | 'winRate' | 'sharpe' | 'drawdown') => catalog.reduce((a, b) => a + b[k], 0) / catalog.length;
    return { total: catalog.length, deployed: catalog.filter((s) => s.status === 'Running').length, pnl30d: catalog.reduce((a, b) => a + b.pnl, 0), avgReturn: avg('returnPct'), avgWin: avg('winRate'), avgSharpe: avg('sharpe'), avgDd: avg('drawdown') };
  }, []);

  return (
    <AppShell>
      <div className="grid grid-cols-12 gap-3">
        <Panel className="col-span-12 p-3">
          <div className="flex items-start justify-between"><div><h2 className="text-lg font-semibold">STRATEGIES</h2><p className="text-xs text-text-muted">Build. Backtest. Deploy. Automate.</p></div><Link href="/strategies/new" className="border border-accent-cyan/40 bg-accent-cyan/10 px-3 py-2 text-xs text-accent-cyan">New Strategy</Link></div>
          <div className="mt-3"><Tabs items={['OVERVIEW','BUILT-IN','MY STRATEGIES','BACKTESTS','DEPLOYMENTS','TEMPLATES']} /></div>
          <div className="mt-3 grid grid-cols-8 gap-2 text-xs">
            <Metric k="Total Strategies" v={`${totals.total}`} /><Metric k="Deployed" v={`${totals.deployed}`} /><Metric k="Total PnL 30D" v={formatCurrency(totals.pnl30d)} /><Metric k="Avg Return 30D" v={formatPercent(totals.avgReturn)} /><Metric k="Win Rate Avg" v={formatPercent(totals.avgWin)} /><Metric k="Sharpe Ratio Avg" v={totals.avgSharpe.toFixed(2)} /><Metric k="Max Drawdown Avg" v={formatPercent(-totals.avgDd)} /><Metric k="Strategy Health" v="84 / Healthy" />
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2 text-xs"><input className="col-span-2 border border-border-subtle bg-panel-raised p-2" placeholder="Search strategies" /><select className="border border-border-subtle bg-panel-raised p-2"><option>All Types</option></select><select className="border border-border-subtle bg-panel-raised p-2"><option>All Markets</option></select><select className="border border-border-subtle bg-panel-raised p-2"><option>All Timeframes</option></select><button className="border border-border-subtle bg-panel-raised p-2">Sort by Performance</button></div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-8">
          <table className="w-full text-xs"><thead><tr className="text-text-muted">{['Strategy','Type','Markets','Timeframe','PnL 30D','Return 30D','Win Rate','Sharpe','Drawdown','Status'].map((h) => <th key={h} className="border-b border-border-subtle p-2 text-left">{h}</th>)}</tr></thead><tbody className="font-mono">{catalog.map((s) => <tr key={s.name} className={`cursor-pointer ${selected.name===s.name?'bg-panel-raised':''}`} onClick={() => setSelected(s)}><td className="border-b border-border-subtle p-2">{s.name}</td><td className="border-b border-border-subtle p-2">{s.type}</td><td className="border-b border-border-subtle p-2">{s.markets.join(', ')}</td><td className="border-b border-border-subtle p-2">{s.timeframe}</td><td className="border-b border-border-subtle p-2 text-accent-green">{formatCurrency(s.pnl)}</td><td className="border-b border-border-subtle p-2 text-accent-green">{formatPercent(s.returnPct)}</td><td className="border-b border-border-subtle p-2">{s.winRate}%</td><td className="border-b border-border-subtle p-2">{s.sharpe}</td><td className="border-b border-border-subtle p-2 text-accent-red">-{s.drawdown}%</td><td className="border-b border-border-subtle p-2"><span className={`border px-2 py-1 ${s.status==='Running'?'border-accent-green/40 text-accent-green':s.status==='Backtest'?'border-accent-amber/40 text-accent-amber':'border-border-subtle text-text-muted'}`}>{s.status}</span></td></tr>)}</tbody></table>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-4">
          <div className="mb-2 flex items-center justify-between"><div className="text-sm font-semibold">{selected.name}</div><span className="border border-accent-green/40 px-2 py-1 text-[10px] text-accent-green">DEPLOYED</span></div>
          <Tabs items={['OVERVIEW','PERFORMANCE','CONFIGURATION','TRADES']} />
          <div className="mt-2 border border-border-subtle bg-panel-raised p-2"><div className="mb-1 text-xs text-text-muted">Equity Curve · 30D</div><div className="grid h-24 grid-cols-20 items-end gap-[2px]">{Array.from({length:20},(_,i)=><div key={i} className="bg-accent-cyan/75" style={{height:`${30 + (i*2)%60}%`}} />)}</div></div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs"><Metric k="Win Rate" v={`${selected.winRate}%`} /><Metric k="Sharpe" v={selected.sharpe.toFixed(2)} /><Metric k="Profit Factor" v="2.31" /><Metric k="Max DD" v={`${selected.drawdown}%`} /></div>
          <div className="mt-2 border border-border-subtle p-2 text-xs"><div className="mb-1 text-text-muted">Market Allocation</div><div className="font-mono">BTC 52% · ETH 33% · SOL 15%</div></div>
          <div className="mt-2 border border-border-subtle p-2 text-xs"><div className="mb-1 text-text-muted">Recent Trades</div><div className="space-y-1 font-mono"><div>BTC Long +1.4R</div><div>ETH Long +2.1R</div><div>SOL Hedge -0.3R</div></div></div>
          <div className="mt-3 grid grid-cols-2 gap-2"><button className="border border-accent-red/40 bg-accent-red/15 px-2 py-2 text-xs text-accent-red">Pause Strategy</button><button className="border border-border-subtle px-2 py-2 text-xs">View Details</button></div>
        </Panel>
      </div>
    </AppShell>
  );
}

function Metric({ k, v }: { k: string; v: string }) {
  return <div className="border border-border-subtle bg-panel-raised p-2"><div className="text-text-muted">{k}</div><div className="mt-1 font-mono text-sm">{v}</div></div>;
}
