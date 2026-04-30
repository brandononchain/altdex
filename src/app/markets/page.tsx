'use client';

import AppShell from '@/components/layout/AppShell';
import { Panel, Tabs } from '@/components/ui/primitives';
import { marketAssets } from '@/lib/mockData';
import { formatCompact, formatCurrency, formatPercent } from '@/lib/formatters';

export default function MarketsPage() {
  return (
    <AppShell>
      <div className="grid grid-cols-12 gap-3">
        <Panel className="col-span-12 p-3">
          <div className="flex items-start justify-between"><div><h2 className="text-lg font-semibold">MARKETS</h2><p className="text-xs text-text-muted">Real-time market overview. Data-driven. AI-enhanced.</p></div><button className="border border-border-subtle bg-panel-raised px-3 py-2 text-xs">Customize</button></div>
          <div className="mt-3"><Tabs items={['OVERVIEW','SPOT','PERP DEX','FUTURES','OPTIONS','INDEXES','SECTORS','RANKINGS']} /></div>
          <div className="mt-3 grid grid-cols-6 gap-2 text-xs"><input className="col-span-2 border border-border-subtle bg-panel-raised p-2" placeholder="Search assets, sectors, indexes" /><Metric k="Total Market Cap" v="$3.12T" /><Metric k="24H Volume" v="$182.4B" /><Metric k="BTC Dominance" v="54.2%" /><Metric k="ETH Dominance" v="16.3%" /><Metric k="Fear & Greed" v="72 / Greed" /></div>
          <div className="mt-2 flex items-center gap-2 text-xs"><span className="text-text-muted">Market Regime:</span>{['Trend Expansion','Elevated Volatility','High Liquidity','Moderate Risk'].map((x,i)=><span key={x} className={`border px-2 py-1 ${i===0?'border-accent-green/40 text-accent-green':i===1?'border-accent-amber/40 text-accent-amber':'border-border-subtle text-text-muted'}`}>{x}</span>)}</div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-9">
          <div className="mb-2 flex flex-wrap gap-2 text-xs">{['All','Hot','Gainers','Losers','New Listings','All Chains','All Categories','24H'].map((f, i)=><button key={f} className={`border px-2 py-1 ${i===0?'border-accent-cyan text-accent-cyan':'border-border-subtle text-text-muted'}`}>{f}</button>)}</div>
          <table className="w-full text-xs"><thead><tr className="text-text-muted">{['#','☆','Asset','Price','24H','7D','30D','Volume','Market Cap','TVL','Trend 30D','ALT-SCORE'].map((h)=><th key={h} className="border-b border-border-subtle p-2 text-left">{h}</th>)}</tr></thead><tbody className="font-mono">{marketAssets.map((a, idx)=><tr key={a.symbol}><td className="border-b border-border-subtle p-2">{idx+1}</td><td className="border-b border-border-subtle p-2">☆</td><td className="border-b border-border-subtle p-2">{a.symbol}</td><td className="border-b border-border-subtle p-2">{formatCurrency(a.price, a.price>100?1:4)}</td><td className={`border-b border-border-subtle p-2 ${a.change24h>=0?'text-accent-green':'text-accent-red'}`}>{formatPercent(a.change24h)}</td><td className={`border-b border-border-subtle p-2 ${a.change7d>=0?'text-accent-green':'text-accent-red'}`}>{formatPercent(a.change7d)}</td><td className={`border-b border-border-subtle p-2 ${a.change30d>=0?'text-accent-green':'text-accent-red'}`}>{formatPercent(a.change30d)}</td><td className="border-b border-border-subtle p-2">{formatCompact(a.volume)}</td><td className="border-b border-border-subtle p-2">{formatCompact(a.marketCap)}</td><td className="border-b border-border-subtle p-2">{a.tvl ? formatCompact(a.tvl) : '—'}</td><td className="border-b border-border-subtle p-2"><div className="grid grid-cols-9 items-end gap-[2px]">{a.trendSparkline.map((n,i)=><div key={i} className="bg-accent-cyan/70" style={{height:`${Math.max(12,n)}%`}} />)}</div></td><td className="border-b border-border-subtle p-2"><span className={`inline-block border px-2 py-1 ${a.aiSignalScore>75?'border-accent-green/40 text-accent-green':a.aiSignalScore<50?'border-accent-red/40 text-accent-red':'border-accent-amber/40 text-accent-amber'}`}>{a.aiSignalScore}</span></td></tr>)}</tbody></table>
        </Panel>

        <div className="col-span-12 grid grid-cols-1 gap-3 xl:col-span-3">
          <Panel className="p-3"><div className="mb-2 text-sm font-semibold">TOP GAINERS</div><div className="space-y-1 text-xs font-mono"><div>SOL +4.27%</div><div>BTC +2.35%</div><div>ETH +2.11%</div></div></Panel>
          <Panel className="p-3"><div className="mb-2 text-sm font-semibold">MARKET HEATMAP</div><div className="grid grid-cols-3 gap-1 text-[10px] font-mono"><div className="bg-accent-green/20 p-2">BTC</div><div className="bg-accent-green/15 p-2">ETH</div><div className="bg-accent-red/15 p-2">ARB</div><div className="bg-accent-green/25 p-2">SOL</div><div className="bg-accent-amber/15 p-2">LINK</div><div className="bg-accent-green/10 p-2">XRP</div></div></Panel>
          <Panel className="p-3"><div className="mb-2 text-sm font-semibold">MARKET NEWS</div><div className="space-y-2 text-xs"><div><span className="text-accent-green">BTC</span> OI expands as perp funding stabilizes.</div><div><span className="text-accent-amber">ETH</span> basis narrows ahead of macro event.</div><div><span className="text-accent-red">ARB</span> liquidity pockets thin on perp books.</div></div></Panel>
        </div>
      </div>
    </AppShell>
  );
}

function Metric({ k, v }: { k: string; v: string }) {
  return <div className="border border-border-subtle bg-panel-raised p-2"><div className="text-text-muted">{k}</div><div className="mt-1 font-mono text-sm">{v}</div></div>;
}
