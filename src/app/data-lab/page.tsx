'use client';

import AppShell from '@/components/layout/AppShell';
import { Panel, Tabs } from '@/components/ui/primitives';
import { dataLabMetrics } from '@/lib/mockData';
import { formatCompact } from '@/lib/formatters';

export default function DataLabPage() {
  const list = [
    ['BTC Net Taker Volume', 'CEX + DEX Composite'],
    ['ETH Perp Funding Z-Score', 'Derivatives Feed'],
    ['SOL Active Addresses', 'On-chain RPC'],
    ['Stablecoin Net Mint', 'On-chain Indexer'],
    ['OI / Market Cap Ratio', 'Cross-venue OI']
  ];

  return (
    <AppShell>
      <div className="grid grid-cols-12 gap-3">
        <Panel className="col-span-12 p-3">
          <div><h2 className="text-lg font-semibold">DATA LAB</h2><p className="text-xs text-text-muted">On-chain. Market. Derivatives. All in one place.</p></div>
          <div className="mt-3"><Tabs items={['OVERVIEW','DATASETS','QUERY BUILDER','CHARTS','INDICATORS','CUSTOM FEEDS','API']} /></div>
          <div className="mt-3 grid grid-cols-6 gap-2 text-xs">
            <Metric k="On-chain TPS" v={formatCompact(dataLabMetrics.onChainTps)} />
            <Metric k="Active Addresses" v={formatCompact(dataLabMetrics.activeAddresses)} />
            <Metric k="Derivs OI" v={`$${formatCompact(dataLabMetrics.derivativesOi)}`} />
            <Metric k="Funding Rate" v={`${dataLabMetrics.fundingRate}%`} />
            <Metric k="Liquidity Score" v={dataLabMetrics.liquidityScore.toFixed(1)} />
            <Metric k="Volatility Index" v={dataLabMetrics.volatilityIndex.toFixed(1)} />
          </div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-7">
          <div className="mb-2 flex items-center justify-between"><div className="text-sm font-semibold">CHART LAB · BTC Net Taker Volume + Price Overlay</div><button className="border border-accent-cyan/40 bg-accent-cyan/10 px-2 py-1 text-xs text-accent-cyan">New Chart</button></div>
          <div className="mb-2 flex justify-between text-xs"><div className="flex gap-2"><span>1m</span><span>5m</span><span className="text-accent-cyan">15m</span><span>1H</span><span>4H</span><span>1D</span></div><div className="text-text-muted">Indicators · Overlay · Compare</div></div>
          <div className="grid h-72 grid-cols-60 items-end gap-[2px] border border-border-subtle bg-panel-raised p-3">{Array.from({ length: 60 }, (_, i) => <div key={i} className={`${i % 6 < 3 ? 'bg-accent-green/65' : 'bg-accent-red/55'}`} style={{ height: `${25 + Math.abs(Math.sin(i / 4)) * 55}%` }} />)}</div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-3">
          <div className="mb-2 text-sm font-semibold">DATA EXPLORER</div>
          <input className="mb-2 w-full border border-border-subtle bg-panel-raised p-2 text-xs" placeholder="Search metrics" />
          <Tabs items={['FAVORITES','ON-CHAIN','DERIVATIVES','SPOT','MACRO']} />
          <div className="mt-2 space-y-1 text-xs font-mono">{list.map(([m,s]) => <div key={m} className="border border-border-subtle p-2"><div>{m}</div><div className="text-[10px] text-text-muted">{s}</div></div>)}</div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-2">
          <div className="mb-2 text-sm font-semibold">QUERY BUILDER</div>
          <div className="space-y-2 text-xs"><Field label="Data Source" value="Derivatives" /><Field label="Metric" value="BTC Net Taker Volume" /><Field label="Chain" value="All" /><Field label="Timeframe" value="15m" /><Field label="Aggregation" value="EMA 21" /><button className="w-full border border-border-subtle bg-panel-raised p-2 text-left">+ Add Filter</button><button className="w-full border border-accent-green/40 bg-accent-green/20 p-2 text-accent-green">Run Query</button></div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-4">
          <div className="mb-2 text-sm font-semibold">RECENT QUERIES</div>
          <div className="space-y-1 text-xs font-mono">{dataLabMetrics.recentQueries.map((q) => <div key={q.time} className="border border-border-subtle p-2"><div>{q.query}</div><div className="text-[10px] text-text-muted">{q.time}</div></div>)}</div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-4">
          <div className="mb-2 text-sm font-semibold">DATA INSIGHTS</div>
          <div className="space-y-2 text-xs"><div><span className="text-accent-cyan">AI Insight:</span> BTC taker aggression is rising while funding remains neutral — continuation probability elevated.</div><div><span className="text-accent-amber">Regime:</span> Elevated volatility with healthy liquidity depth.</div><div><span className="text-accent-green">Signal:</span> Long bias favored if 15m net taker volume remains above +1.2σ.</div></div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-4">
          <div className="mb-2 text-sm font-semibold">INDICATOR BUILDER</div>
          <div className="h-36 border border-border-subtle bg-black p-2 font-mono text-[11px] text-text-primary">WITH raw AS (\n  SELECT ts, price, taker_vol\n  FROM derivs.btc_perp_flow\n)\nSELECT ts, ema(taker_vol, 21) AS ntv_ema\nFROM raw;</div>
          <div className="mt-2 grid grid-cols-2 gap-2"><button className="border border-border-subtle px-2 py-1 text-xs">Save Indicator</button><button className="border border-accent-cyan/40 bg-accent-cyan/10 px-2 py-1 text-xs text-accent-cyan">Add to Chart</button></div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-6">
          <div className="mb-2 text-sm font-semibold">DATA FEED STATUS</div>
          <div className="grid grid-cols-3 gap-2 text-xs font-mono">{dataLabMetrics.dataFeeds.map((f) => <div key={f.name} className="border border-border-subtle p-2"><div>{f.name}</div><div className={f.status==='Live'?'text-accent-green':'text-accent-amber'}>{f.status}</div></div>)}</div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-6">
          <div className="mb-2 text-sm font-semibold">DATA SNAPSHOT</div>
          <div className="grid grid-cols-3 gap-2 text-xs"><Metric k="Funding Delta" v="+0.0008" /><Metric k="OI Momentum" v="+4.2%" /><Metric k="Liquidity Shift" v="+1.6σ" /><Metric k="Perp Basis" v="2.1%" /><Metric k="Whale Flow" v="Net Buy" /><Metric k="Vol Cluster" v="Rising" /></div>
        </Panel>
      </div>
    </AppShell>
  );
}

function Metric({ k, v }: { k: string; v: string }) {
  return <div className="border border-border-subtle bg-panel-raised p-2"><div className="text-text-muted">{k}</div><div className="mt-1 font-mono text-sm">{v}</div></div>;
}

function Field({ label, value }: { label: string; value: string }) {
  return <label className="block text-xs text-text-muted">{label}<input className="mt-1 w-full border border-border-subtle bg-panel-raised p-2 font-mono text-text-primary" value={value} readOnly /></label>;
}
