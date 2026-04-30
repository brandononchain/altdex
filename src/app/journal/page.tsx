'use client';

import { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { Panel } from '@/components/ui/primitives';
import { formatCurrency } from '@/lib/formatters';

const trades = [
  { ts:'2026-04-29 15:42:21', market:'BTC-PERP', side:'LONG', entry:103212, exit:104892, pnl:3803.21, r:2.1, agent:'ALPHA-7', strategy:'Trend-Follow v2', thesis:86, exec:82, review:'Completed' },
  { ts:'2026-04-29 12:18:09', market:'ETH-PERP', side:'LONG', entry:3201.67, exit:3642.18, pnl:6606.75, r:2.8, agent:'ALPHA-7', strategy:'Trend-Follow v2', thesis:89, exec:88, review:'Completed' },
  { ts:'2026-04-28 21:05:33', market:'SOL-PERP', side:'SHORT', entry:174.2, exit:170.3, pnl:975.21, r:1.7, agent:'NOVA-3', strategy:'Mean Revert X', thesis:74, exec:71, review:'Pending' }
];

export default function JournalPage() {
  const [selected, setSelected] = useState(trades[0]);

  return (
    <AppShell>
      <div className="grid grid-cols-12 gap-3">
        <Panel className="col-span-12 p-3">
          <h2 className="text-lg font-semibold">TRADE JOURNAL</h2>
          <p className="text-xs text-text-muted">Thesis. Execution. Outcome. Improvement.</p>
          <div className="mt-3 grid grid-cols-7 gap-2 text-xs">
            <Metric k="Total Trades" v="142" /><Metric k="Win Rate" v="68.4%" /><Metric k="Avg R" v="1.92" /><Metric k="Best Trade" v="+3.8R" /><Metric k="Worst Trade" v="-1.4R" /><Metric k="Execution Quality" v="82" /><Metric k="AI Accuracy" v="79%" />
          </div>
          <div className="mt-3 grid grid-cols-6 gap-2 text-xs"><select className="border border-border-subtle bg-panel-raised p-2"><option>Market</option></select><select className="border border-border-subtle bg-panel-raised p-2"><option>Agent</option></select><select className="border border-border-subtle bg-panel-raised p-2"><option>Strategy</option></select><select className="border border-border-subtle bg-panel-raised p-2"><option>Side</option></select><select className="border border-border-subtle bg-panel-raised p-2"><option>Outcome</option></select><input className="border border-border-subtle bg-panel-raised p-2" value="Last 30D" readOnly /></div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-8">
          <table className="w-full text-xs"><thead><tr className="text-text-muted">{['Date/Time','Market','Side','Entry','Exit','PnL','R Multiple','Agent','Strategy','Thesis','Execution','Review'].map((h)=><th key={h} className="border-b border-border-subtle p-2 text-left">{h}</th>)}</tr></thead><tbody className="font-mono">{trades.map((t, i)=><tr key={i} className={`cursor-pointer ${selected.ts===t.ts?'bg-panel-raised':''}`} onClick={() => setSelected(t)}><td className="border-b border-border-subtle p-2">{t.ts}</td><td className="border-b border-border-subtle p-2">{t.market}</td><td className={`border-b border-border-subtle p-2 ${t.side==='LONG'?'text-accent-green':'text-accent-red'}`}>{t.side}</td><td className="border-b border-border-subtle p-2">{t.entry}</td><td className="border-b border-border-subtle p-2">{t.exit}</td><td className={`border-b border-border-subtle p-2 ${t.pnl>=0?'text-accent-green':'text-accent-red'}`}>{formatCurrency(t.pnl)}</td><td className="border-b border-border-subtle p-2">{t.r}R</td><td className="border-b border-border-subtle p-2">{t.agent}</td><td className="border-b border-border-subtle p-2">{t.strategy}</td><td className="border-b border-border-subtle p-2">{t.thesis}</td><td className="border-b border-border-subtle p-2">{t.exec}</td><td className="border-b border-border-subtle p-2">{t.review}</td></tr>)}</tbody></table>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-4">
          <div className="mb-2 text-sm font-semibold">TRADE DETAIL</div>
          <div className="space-y-2 text-xs">
            <Block t="Pre-trade Thesis" v="Momentum continuation after liquidity sweep and funding normalization." />
            <Block t="Setup Type" v="Trend Continuation" />
            <Block t="Market Regime" v="Trend Expansion / Elevated Volatility" />
            <Block t="Entry Logic" v="AI score > 75, price above EMA55, positive taker imbalance." />
            <Block t="Risk Plan" v="Max loss 1.2R, SL below session pivot, TP ladder at 1.5R/2.1R." />
            <Block t="Execution Notes" v="Entry filled in 2 slices; minor slippage 0.04%." />
            <Block t="Post-trade Result" v="Closed +2.1R, strong follow-through into US open." />
            <Block t="What Worked" v="Bias alignment + disciplined scaling." />
            <Block t="What Failed" v="Late partial reduce on second target." />
            <Block t="AI Improvement Note" v="Tighten trailing-stop trigger when funding diverges > 1.5σ." />
          </div>
          <div className="mt-3 border-t border-border-subtle pt-2">
            <div className="mb-1 text-xs text-text-muted">Lifecycle Timeline</div>
            <div className="space-y-1 text-xs font-mono"><div>• Signal Generated</div><div>• Risk Approved</div><div>• Order Executed</div><div>• Stop Adjusted</div><div>• Position Closed</div><div>• Review Completed</div></div>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}

function Metric({ k, v }: { k: string; v: string }) {
  return <div className="border border-border-subtle bg-panel-raised p-2"><div className="text-text-muted">{k}</div><div className="mt-1 font-mono text-sm">{v}</div></div>;
}
function Block({ t, v }: { t: string; v: string }) {
  return <div className="border border-border-subtle p-2"><div className="text-text-muted">{t}</div><div className="mt-1 font-mono">{v}</div></div>;
}
