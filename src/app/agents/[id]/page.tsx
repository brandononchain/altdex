'use client';

import { useMemo, useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { DataTable, Panel, Tabs } from '@/components/ui/primitives';
import { agents } from '@/lib/mockData';
import { formatCompact, formatCurrency, formatPercent } from '@/lib/formatters';

export default function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const agent = agents[0]; // mocked detail currently static
  const [timeframe, setTimeframe] = useState<'7D'|'30D'|'90D'|'ALL'>('30D');
  const [allocation, setAllocation] = useState(50000);

  const curve = useMemo(() => Array.from({ length: 48 }, (_, i) => 35 + i + ((i % 5) - 2) * 3), []);
  const trades = [
    ['BTC-PERP','LONG','103,212','104,892','+$3,803','2.1R','4h 12m','View'],
    ['ETH-PERP','LONG','3,201','3,642','+$6,606','2.8R','6h 30m','View'],
    ['SOL-PERP','SHORT','174.2','170.3','+$975','1.7R','2h 03m','View'],
    ['ARB-PERP','LONG','1.0852','1.1327','+$237','1.4R','3h 18m','View']
  ];

  return (
    <AppShell>
      <div className="grid grid-cols-12 gap-3">
        <Panel className="col-span-12 p-3">
          <div className="flex items-start justify-between">
            <div><div className="text-2xl font-semibold">ALPHA-7 <span className="ml-2 border border-accent-cyan/40 px-2 py-1 text-[10px] text-accent-cyan">VERIFIED</span></div><div className="mt-1 text-xs text-text-muted">{agent.walletShort} · Strategy: Trend Following · <span className="text-accent-green">ACTIVE</span></div></div>
            <div className="flex gap-2 text-xs"><button className="border border-accent-green/40 bg-accent-green/15 px-3 py-2 text-accent-green">Add Funds</button><button className="border border-accent-cyan/40 bg-accent-cyan/15 px-3 py-2 text-accent-cyan">Copy Agent</button><button className="border border-accent-red/40 bg-accent-red/15 px-3 py-2 text-accent-red">Withdraw</button></div>
          </div>
        </Panel>

        <Panel className="col-span-12 p-3">
          <div className="grid grid-cols-6 gap-2 text-xs">
            {[
              ['30D Return', formatPercent(agent.return30d)],
              ['All-Time Return', '+146.2%'],
              ['TVL', formatCurrency(agent.tvl)],
              ['Followers/Allocators', '1,284'],
              ['Risk Score', 'Moderate 62/100'],
              ['Confidence Score', '82']
            ].map(([k,v]) => <div key={k} className="border border-border-subtle bg-panel-raised p-2"><div className="text-text-muted">{k}</div><div className="mt-1 font-mono text-sm">{v}</div></div>)}
          </div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-8">
          <div className="mb-2 flex items-center justify-between"><div className="text-sm font-semibold">EQUITY CURVE</div><div className="flex gap-2 text-xs">{(['7D','30D','90D','ALL'] as const).map((t) => <button key={t} onClick={() => setTimeframe(t)} className={`border px-2 py-1 ${timeframe===t?'border-accent-cyan text-accent-cyan':'border-border-subtle'}`}>{t}</button>)}</div></div>
          <div className="grid h-64 grid-cols-48 items-end gap-[2px] border border-border-subtle bg-panel-raised p-3">{curve.map((v,i) => <div key={i} className="bg-accent-cyan/75" style={{height:`${Math.max(15,v)}%`}} />)}</div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-4">
          <div className="text-sm font-semibold">RISK-ADJUSTED METRICS</div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            {[['Win Rate','68.4%'],['Sharpe','2.87'],['Sortino','3.41'],['Profit Factor','2.31'],['Max Drawdown','6.21%'],['Calmar','2.95'],['Avg Hold Time','4.2h'],['Trades','142']].map(([k,v]) => <div key={k} className="border border-border-subtle p-2"><div className="text-text-muted">{k}</div><div className="mt-1 font-mono">{v}</div></div>)}
          </div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-4">
          <div className="text-sm font-semibold">STRATEGY PROFILE</div>
          <div className="mt-2 space-y-1 text-xs font-mono"><div>Markets: BTC, ETH, SOL Perpetuals</div><div>Timeframes: 5m / 15m / 1H</div><div>Execution Mode: Hybrid Autonomous</div><div>Max Leverage: 15x</div><div>Typical Position Size: 2.25 BTC equiv</div><div>Risk Limits: VaR capped at 4.0% daily</div></div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-4">
          <div className="text-sm font-semibold">ALLOCATION MODULE</div>
          <div className="mt-2 space-y-2 text-xs"><label className="block">Allocation Amount<input type="number" value={allocation} onChange={(e)=>setAllocation(Number(e.target.value||0))} className="mt-1 w-full border border-border-subtle bg-panel-raised p-2 font-mono" /></label><label className="block">Risk Multiplier<input className="mt-1 w-full" type="range" min={0.5} max={2} step={0.1} /></label><label className="block">Max Position Size<input className="mt-1 w-full border border-border-subtle bg-panel-raised p-2 font-mono" value="25%" readOnly /></label><label className="block">Copy Delay<input className="mt-1 w-full border border-border-subtle bg-panel-raised p-2 font-mono" value="120ms" readOnly /></label><label className="block">Max Slippage<input className="mt-1 w-full border border-border-subtle bg-panel-raised p-2 font-mono" value="0.08%" readOnly /></label><label className="block">Pause Conditions<input className="mt-1 w-full border border-border-subtle bg-panel-raised p-2 font-mono" value="DD > 3% day / Feed lag" readOnly /></label><div className="border border-border-subtle p-2 font-mono">Projected allocation: {formatCurrency(allocation)} ({formatCompact(allocation)} USDC)</div></div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-4">
          <div className="text-sm font-semibold">AI EXPLANATION</div>
          <div className="mt-2 space-y-2 text-xs"><div><span className="text-text-muted">Optimized For:</span> Momentum continuation with volatility expansions.</div><div><span className="text-text-muted">Regime Preference:</span> Trending markets with clean breakout structure.</div><div><span className="text-text-muted">Recent Behavior Changes:</span> Reduced SOL leg sizing by 12%, tightened SL bands, lowered overnight exposure.</div></div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-8">
          <div className="mb-2 text-sm font-semibold">TRADE HISTORY</div>
          <DataTable headers={['Market','Side','Entry','Exit','PnL','R Multiple','Duration','Thesis']} rows={trades} />
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-4">
          <div className="mb-2 text-sm font-semibold">JOURNAL / REVIEW PREVIEW</div>
          <Tabs items={['LATEST 5 REVIEWS']} />
          <div className="mt-2 space-y-2 text-xs font-mono"><div>04-28: BTC long thesis validated; took partial at R1.6</div><div>04-27: Avoided chop regime after liquidity failure signal.</div><div>04-26: Added ETH continuation leg on funding normalization.</div><div>04-25: Reduced leverage pre-FOMC volatility window.</div><div>04-24: Closed SOL hedge after basis compression.</div></div>
        </Panel>
      </div>
    </AppShell>
  );
}
