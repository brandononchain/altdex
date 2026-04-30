'use client';

import AppShell from '@/components/layout/AppShell';
import { Panel, Tabs } from '@/components/ui/primitives';
import { riskMetrics } from '@/lib/mockData';
import { formatCurrency, formatPercent } from '@/lib/formatters';
import { usePriceTick } from '@/lib/sim/hooks';

export default function RiskEnginePage() {
  const riskScore = usePriceTick(62, 0.003, 3500);
  return (
    <AppShell>
      <div className="grid grid-cols-12 gap-3">
        <Panel className="col-span-12 p-3">
          <div className="flex items-start justify-between"><div><h2 className="text-lg font-semibold">RISK ENGINE</h2><p className="text-xs text-text-muted">Real-time risk monitoring. Dynamic exposure control.</p></div><button className="border border-border-subtle bg-panel-raised px-3 py-2 text-xs">Risk Settings</button></div>
          <div className="mt-3"><Tabs items={['OVERVIEW','EXPOSURE','STRESS TEST','SCENARIOS','LIMITS','CORRELATION','RISK RULES','LIQUIDATIONS','REPORTS']} /></div>
          <div className="mt-3 grid grid-cols-6 gap-2 text-xs">
            <Metric k="Portfolio Risk" v="23.7%" tone="amber" />
            <Metric k="VaR 24H 95%" v={formatCurrency(riskMetrics.var24h)} tone="amber" />
            <Metric k="Expected Shortfall 95%" v={formatCurrency(riskMetrics.expectedShortfall)} tone="red" />
            <Metric k="Max Drawdown 30D" v={formatPercent(-riskMetrics.maxDrawdown)} tone="red" />
            <Metric k="Leverage Effective" v={`${riskMetrics.effectiveLeverage}x`} tone="amber" />
            <Metric k="Liquidation Risk" v={formatPercent(riskMetrics.liquidationRisk, 1)} tone="amber" />
          </div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-8">
          <div className="mb-2 flex items-center justify-between"><div className="text-sm font-semibold">MAIN RISK OVERVIEW</div><div className="flex gap-2 text-xs"><select className="border border-border-subtle bg-panel-raised p-1"><option>All Accounts</option></select><select className="border border-border-subtle bg-panel-raised p-1"><option>All Agents</option></select><select className="border border-border-subtle bg-panel-raised p-1"><option>24H</option></select></div></div>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center justify-center border border-border-subtle bg-panel-raised p-3"><div className="h-36 w-36 rounded-full border-[10px] border-accent-amber/40 border-t-accent-green border-r-accent-amber border-b-accent-red text-center font-mono leading-[124px]">{Math.round(riskScore)}</div></div>
            <div className="col-span-2 border border-border-subtle bg-panel-raised p-3"><div className="mb-2 text-xs text-text-muted">Risk Score Over Time</div><div className="relative grid h-32 grid-cols-36 items-end gap-[2px]">{Array.from({length:36},(_,i)=> <div key={i} className={`${i>26?'bg-accent-amber/70':'bg-accent-green/65'}`} style={{height:`${25 + (i%7)*8}%`}} />)}<div className="absolute inset-x-0 top-[28%] border-t border-accent-green/30" /><div className="absolute inset-x-0 top-[54%] border-t border-accent-amber/40" /><div className="absolute inset-x-0 top-[78%] border-t border-accent-red/45" /></div></div>
          </div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-4">
          <div className="mb-2 text-sm font-semibold">RISK LIMITS</div>
          <div className="space-y-1 text-xs font-mono"><div>Daily Loss Limit <span className="text-accent-green">1.8% / 3.0%</span></div><div>Leverage Cap <span className="text-accent-amber">15x / 20x</span></div><div>Exposure Cap <span className="text-accent-green">62% / 75%</span></div><div>Liquidation Buffer <span className="text-accent-red">9.6%</span></div></div>
          <div className="mt-3 border border-border-subtle p-2"><div className="mb-1 text-xs text-text-muted">RISK ALLOCATION</div><div className="mx-auto h-28 w-28 rounded-full border-[14px] border-accent-green/30 border-r-accent-amber border-b-accent-red" /></div>
          <div className="mt-3 border border-border-subtle p-2 text-xs"><div className="mb-1 text-text-muted">RISK ALERTS</div><div className="space-y-1"><div className="text-accent-amber">Funding divergence on SOL basket</div><div className="text-accent-red">ARB liquidity thinning near stop clusters</div><div className="text-accent-green">BTC margin health stable</div></div></div>
          <button className="mt-3 w-full border border-accent-cyan/40 bg-accent-cyan/10 p-2 text-xs text-accent-cyan">Configure Alerts</button>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-3">
          <div className="mb-2 text-sm font-semibold">EXPOSURE BREAKDOWN</div>
          <div className="space-y-1 text-xs font-mono"><div>BTC-PERP 38%</div><div>ETH-PERP 24%</div><div>SOL-PERP 14%</div><div>ARB-PERP 7%</div><div>Cash 17%</div></div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-3">
          <div className="mb-2 text-sm font-semibold">RISK BY AGENT</div>
          <div className="space-y-1 text-xs font-mono"><div>ALPHA-7 <span className="text-accent-amber">41%</span></div><div>NOVA-3 <span className="text-accent-green">27%</span></div><div>DELTA-X <span className="text-accent-green">19%</span></div><div>Manual <span className="text-accent-red">13%</span></div></div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-6">
          <div className="mb-2 text-sm font-semibold">CORRELATION MATRIX</div>
          <table className="w-full text-xs font-mono"><thead><tr><th className="border border-border-subtle p-1"></th>{riskMetrics.correlationMatrix.labels.map((l)=><th key={l} className="border border-border-subtle p-1">{l}</th>)}</tr></thead><tbody>{riskMetrics.correlationMatrix.values.map((row,i)=><tr key={i}><th className="border border-border-subtle p-1">{riskMetrics.correlationMatrix.labels[i]}</th>{row.map((v,j)=><td key={j} className={`border border-border-subtle p-1 text-center ${v>0.85?'text-accent-red':v>0.75?'text-accent-amber':'text-accent-green'}`}>{v.toFixed(2)}</td>)}</tr>)}</tbody></table>
        </Panel>

        <Panel className="col-span-12 p-3">
          <div className="mb-2 text-sm font-semibold">STRESS TEST SCENARIOS</div>
          <table className="w-full text-xs"><thead><tr className="text-text-muted">{['Scenario','PnL Impact','Risk After'].map((h)=><th key={h} className="border-b border-border-subtle p-2 text-left">{h}</th>)}</tr></thead><tbody className="font-mono">{riskMetrics.stressTests.map((s)=><tr key={s.scenario}><td className="border-b border-border-subtle p-2">{s.scenario}</td><td className="border-b border-border-subtle p-2 text-accent-red">{formatCurrency(s.pnlImpact)}</td><td className="border-b border-border-subtle p-2 text-accent-amber">{formatPercent(s.riskAfter,1)}</td></tr>)}</tbody></table>
        </Panel>
      </div>
    </AppShell>
  );
}

function Metric({ k, v, tone = 'green' }: { k: string; v: string; tone?: 'green'|'amber'|'red' }) {
  const cls = tone === 'green' ? 'text-accent-green' : tone === 'amber' ? 'text-accent-amber' : 'text-accent-red';
  return <div className="border border-border-subtle bg-panel-raised p-2"><div className="text-text-muted">{k}</div><div className={`mt-1 font-mono text-sm ${cls}`}>{v}</div></div>;
}
