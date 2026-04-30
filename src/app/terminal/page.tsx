'use client';

import { useMemo, useState } from 'react';
import { usePeriodicFeed, usePriceTick, useReducedMotion } from '@/lib/sim/hooks';
import AppShell from '@/components/layout/AppShell';
import { Panel, SelectControl, SliderControl, Tabs } from '@/components/ui/primitives';
import { positions, riskMetrics } from '@/lib/mockData';
import { formatCurrency, formatNumber, formatPercent, valueToneClass } from '@/lib/formatters';
import ExecutionFlowOverlay from '@/components/terminal/ExecutionFlowOverlay';

const asks = [104895.6, 104895.1, 104894.7, 104894.0, 104893.4, 104892.8, 104892.3].map((price, i) => ({ price, size: [3.25, 2.14, 1.32, 1.85, 3.12, 2.97, 4.0][i], total: [18.65, 15.4, 13.26, 11.94, 10.09, 6.97, 4][i] }));
const bids = [104892.0, 104891.5, 104891.0, 104890.6, 104890.1, 104889.6, 104889.1].map((price, i) => ({ price, size: [2.81, 3.73, 4.22, 2.15, 1.63, 2.48, 3.21][i], total: [2.81, 6.54, 10.76, 12.91, 14.54, 17.02, 20.23][i] }));

export default function TerminalPage() {
  const [showExecutionOverlay, setShowExecutionOverlay] = useState(false);
  const [executionDirection, setExecutionDirection] = useState<'LONG' | 'SHORT'>('LONG');
  const livePrice = usePriceTick(104892.1, 0.0007, 2200);
  const reduced = useReducedMotion();
  const activity = usePeriodicFeed(['15:42:21 Increased BTC long +0.25 BTC','15:41:08 Adjusted SL 98,500','15:39:47 Signal: Strengthening BTC-PERP']);
  const chartBars = useMemo(() => Array.from({ length: 70 }, (_, i) => 25 + Math.sin(i / 5) * 18 + (i % 8) * 3), []);

  return (
    <AppShell>
      <div className="grid grid-cols-12 gap-3">
        <Panel className="col-span-12 p-3 xl:col-span-8">
          <div className="mb-3 flex items-center justify-between border-b border-border-subtle pb-3">
            <div className="flex items-center gap-3"><div className="h-8 w-8 rounded-full bg-amber-500/20 text-center text-lg leading-8 text-amber-300">₿</div><div><div className="text-xl font-semibold">BTC-PERP</div><div className="text-xs text-text-muted">Bitcoin Perpetual</div></div></div>
            <div className="font-mono text-4xl">{formatNumber(livePrice,1)} <span className="text-2xl text-accent-green">+2.35%</span></div>
            <div className="grid grid-cols-5 gap-4 text-xs font-mono"><div><div className="text-text-muted">24H HIGH</div><div>105,210.5</div></div><div><div className="text-text-muted">24H LOW</div><div>101,432.8</div></div><div><div className="text-text-muted">FUNDING</div><div>0.0031%</div></div><div><div className="text-text-muted">OI</div><div>$2.81B</div></div><div><div className="text-text-muted">VOLUME</div><div>$8.72B</div></div></div>
          </div>
          <div className="mb-2 flex items-center justify-between text-xs"><div className="flex gap-3 font-mono"><span>1m</span><span>5m</span><span className="text-accent-cyan">15m</span><span>1H</span><span>4H</span><span>1D</span></div><div className="text-text-muted">Indicators · Templates</div></div>
          <div className="h-[420px] border border-border-subtle bg-panel-raised p-3">
            <div className="grid h-full grid-cols-70 items-end gap-[2px]">{chartBars.map((h, i) => <div key={i} className="bg-accent-cyan/70" style={{ height: `${h}%` }} />)}</div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-mono"><div className="border border-border-subtle p-2">AI Signal Score <span className="text-accent-cyan">82.6</span></div><div className="border border-border-subtle p-2">MACD 12 26 close 9 <span className="text-accent-cyan">21.3</span> <span>38.6</span> <span>17.3</span></div></div>
        </Panel>

        <Panel className="col-span-12 p-3 md:col-span-6 xl:col-span-2">
          <Tabs items={['ORDER BOOK', 'TRADES']} />
          <div className="mt-2 text-[11px] font-mono text-text-muted"><div className="grid grid-cols-3 py-1"><span>PRICE</span><span>SIZE</span><span>TOTAL</span></div>
            {asks.map((r) => <div key={r.price} className="grid grid-cols-3 bg-accent-red/10 py-1 text-accent-red"><span>{formatNumber(r.price, 1)}</span><span>{r.size}</span><span>{r.total}</span></div>)}
            <div className="py-3 text-center text-3xl text-accent-green">{formatNumber(livePrice,1)}</div>
            {bids.map((r) => <div key={r.price} className="grid grid-cols-3 bg-accent-green/10 py-1 text-accent-green"><span>{formatNumber(r.price, 1)}</span><span>{r.size}</span><span>{r.total}</span></div>)}
            <div className="mt-2 h-16 border border-border-subtle bg-gradient-to-r from-accent-green/20 via-transparent to-accent-red/20" />
          </div>
        </Panel>

        <Panel className="col-span-12 p-3 md:col-span-6 xl:col-span-2">
          <Tabs items={['EXECUTION PANEL', 'AI AGENT']} />
          <div className="mt-3 space-y-3 text-xs">
            <div className="font-mono">Agent: ALPHA-7 <span className="text-accent-green">Active</span></div>
            <div className="font-mono">Strategy: Trend-Follow v2</div>
            <div className="flex gap-2"><button className="border border-accent-cyan px-2 py-1 text-accent-cyan">AUTONOMOUS</button><button className="border border-border-subtle px-2 py-1">MANUAL</button></div>
            <SliderControl label="Position Size" />
            <SliderControl label="Leverage" />
            <SelectControl label="Order Type" options={['Limit', 'Market']} />
            <label className="block text-xs text-text-muted">Limit Price<input className="mt-1 w-full border border-border-subtle bg-panel-raised p-2 font-mono" value="104,892.1" readOnly /></label>
            <div className="grid grid-cols-2 gap-2"><button onClick={() => { setExecutionDirection('LONG'); setShowExecutionOverlay(true); }} className="border border-accent-green/40 bg-accent-green/20 px-2 py-3 text-xs font-semibold text-accent-green">BUY / LONG</button><button onClick={() => { setExecutionDirection('SHORT'); setShowExecutionOverlay(true); }} className="border border-accent-red/40 bg-accent-red/20 px-2 py-3 text-xs font-semibold text-accent-red">SELL / SHORT</button></div>
            <button onClick={() => setShowExecutionOverlay(true)} className="w-full border border-border-subtle p-2 text-left">Advanced ▸</button>
          </div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-8">
          <Tabs items={['POSITIONS', 'ORDERS', 'TRADES', 'HISTORY', 'ALERTS']} />
          <table className="mt-2 w-full text-xs"><thead className="text-text-muted"><tr>{['MARKET', 'SIDE', 'SIZE', 'ENTRY', 'MARK', 'P&L', 'P&L %', 'LIQ', 'MARGIN', 'TP / SL', 'AGENT'].map((h) => <th key={h} className="border-b border-border-subtle p-2 text-left">{h}</th>)}</tr></thead><tbody className="font-mono">{positions.concat([{...positions[0], market:'SOL-PERP', side:'SHORT', size:250, sizeUnit:'SOL', entryPrice:174.25, markPrice:170.35, pnl:975.21, pnlPercent:2.29, liquidationPrice:198.34, margin:3215.11, tp:165, sl:180, agent:'NOVA-3'},{...positions[0], market:'ARB-PERP', side:'LONG', size:5000, sizeUnit:'ARB', entryPrice:1.0852, markPrice:1.1327, pnl:237.50, pnlPercent:4.37, liquidationPrice:0.8124, margin:1243.22, tp:1.25, sl:0.95, agent:'ALPHA-7'}]).map((p, i) => <tr key={i}><td className="border-b border-border-subtle p-2">{p.market}</td><td className={`border-b border-border-subtle p-2 ${p.side === 'LONG' ? 'text-accent-green' : 'text-accent-red'}`}>{p.side}</td><td className="border-b border-border-subtle p-2">{p.size} {p.sizeUnit}</td><td className="border-b border-border-subtle p-2">{p.entryPrice}</td><td className="border-b border-border-subtle p-2">{p.markPrice}</td><td className={`border-b border-border-subtle p-2 ${valueToneClass(p.pnl)}`}>{formatCurrency(p.pnl)}</td><td className={`border-b border-border-subtle p-2 ${valueToneClass(p.pnlPercent)}`}>{formatPercent(p.pnlPercent)}</td><td className="border-b border-border-subtle p-2">{p.liquidationPrice}</td><td className="border-b border-border-subtle p-2">{formatCurrency(p.margin)}</td><td className="border-b border-border-subtle p-2">{p.tp} / {p.sl}</td><td className="border-b border-border-subtle p-2">{p.agent}</td></tr>)}</tbody></table>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-4">
          <div className="mb-2 text-sm font-semibold">AI AGENT: ALPHA-7</div>
          <div className="mb-3 grid grid-cols-2 gap-3"><div><div className="text-xs text-text-muted">Performance (7D)</div><div className="text-4xl text-accent-green">+18.72%</div></div><div className="flex items-center justify-center"><div className="h-24 w-24 rounded-full border-4 border-accent-cyan text-center font-mono leading-[88px]">82</div></div></div>
          <div className="mb-3 grid grid-cols-5 gap-2 text-center text-xs"><div><div className="text-text-muted">Win Rate</div><div>68.4%</div></div><div><div className="text-text-muted">Profit Factor</div><div>2.31</div></div><div><div className="text-text-muted">Sharpe</div><div>2.87</div></div><div><div className="text-text-muted">Max DD</div><div>6.21%</div></div><div><div className="text-text-muted">Trades</div><div>142</div></div></div>
          <div className="border-t border-border-subtle pt-2 text-xs font-mono">{activity.map((a)=><div key={a}>{a}</div>)}</div>
        </Panel>

        <Panel className="col-span-12 p-3 md:col-span-6 xl:col-span-2">
          <div className="mb-2 text-sm font-semibold">RISK OVERVIEW</div>
          <div className="space-y-2 text-xs font-mono"><div>Risk Level <span className="text-accent-green">Moderate</span></div><div>VaR (24H) {formatCurrency(riskMetrics.var24h)}</div><div>Expected Shortfall {formatCurrency(riskMetrics.expectedShortfall)}</div><div>Liquidation Price 93,214.7</div><div>Margin Health 76.3%</div></div>
        </Panel>

        <Panel className="col-span-12 p-3 md:col-span-6 xl:col-span-2">
          <div className="mb-2 text-sm font-semibold">AI INSIGHTS</div>
          <div className="space-y-2 text-xs"><div>Market Regime <span className="text-accent-green">Bull Trend</span></div><div>High Conviction Long <span className="text-accent-green">ETH-PERP</span></div><div>Funding Rate Spike <span className="text-accent-red">RISK ALERT</span></div></div>
        </Panel>
      </div>

      <ExecutionFlowOverlay open={showExecutionOverlay} direction={executionDirection} onClose={() => setShowExecutionOverlay(false)} />
    </AppShell>
  );
}
