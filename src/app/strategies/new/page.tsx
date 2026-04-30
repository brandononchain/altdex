'use client';

import AppShell from '@/components/layout/AppShell';
import { Panel, Tabs } from '@/components/ui/primitives';

export default function NewStrategyPage() {
  return (
    <AppShell>
      <div className="grid grid-cols-12 gap-3">
        <Panel className="col-span-12 p-3">
          <h2 className="text-lg font-semibold">NEW STRATEGY</h2>
          <p className="text-xs text-text-muted">Define logic. Backtest assumptions. Deploy with risk controls.</p>
          <div className="mt-3"><Tabs items={['STRATEGY','MARKET','LOGIC','RISK','BACKTEST','DEPLOY']} /></div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-4">
          <div className="mb-2 text-sm font-semibold">BUILDER CONFIG</div>
          <div className="space-y-2 text-xs">
            <Field label="Strategy Name" value="Trend Following v3" />
            <Select label="Strategy Type" options={['Trend Following', 'Mean Reversion', 'Arbitrage']} />
            <Select label="Market Selection" options={['BTC-PERP, ETH-PERP', 'SOL-PERP', 'Custom Basket']} />
            <Select label="Timeframes" options={['5m / 15m / 1H', '15m / 4H', '1H / 1D']} />
            <Area label="Signal Logic" value="AI signal + funding bias + trend filter" />
            <Area label="Entry Conditions" value="Break above EMA55 + positive taker imbalance" />
            <Area label="Exit Conditions" value="TP at 2.1R or trend invalidation" />
            <Area label="Filters" value="Avoid high-impact macro windows" />
          </div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-5">
          <div className="mb-2 text-sm font-semibold">LOGIC EDITOR</div>
          <div className="h-[460px] border border-border-subtle bg-black p-3 font-mono text-[12px] leading-6 text-text-primary">
            <div className="text-text-muted"># Strategy Rule Set</div>
            <div>WHEN ai_signal_score &gt; 75</div>
            <div>AND funding_rate &lt; funding_threshold</div>
            <div>AND close_price &gt; ema(55)</div>
            <div>THEN prepare_long_plan()</div>
            <br />
            <div>risk.max_leverage = 12</div>
            <div>risk.max_daily_loss = 1.8%</div>
            <div>risk.max_position_size = 22%</div>
            <div>execution.mode = APPROVAL</div>
          </div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-3">
          <div className="mb-2 text-sm font-semibold">PREVIEW</div>
          <div className="space-y-2 text-xs font-mono">
            <Item k="Estimated Behavior" v="Trend continuation capture" />
            <Item k="Expected Frequency" v="8-14 trades/day" />
            <Item k="Risk Profile" v="Moderate" />
            <Item k="Compatible Agents" v="ALPHA-7, NOVA-3" />
            <Item k="Required Feeds" v="Funding, OI, Taker Vol, EMA" />
          </div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-7">
          <div className="mb-2 text-sm font-semibold">BACKTEST SUMMARY</div>
          <div className="grid grid-cols-5 gap-2 text-xs">
            <Metric k="Simulated Return" v="+22.8%" />
            <Metric k="Win Rate" v="67.9%" />
            <Metric k="Max Drawdown" v="6.4%" />
            <Metric k="Sharpe" v="2.64" />
            <Metric k="Profit Factor" v="2.29" />
          </div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-5">
          <div className="mb-2 text-sm font-semibold">DEPLOY CONTROLS</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Select label="Mode" options={['Approval', 'Manual', 'Autonomous']} />
            <Field label="Max Leverage" value="12x" />
            <Field label="Max Daily Loss" value="1.8%" />
            <Field label="Max Position Size" value="22%" />
            <Field label="Allowed Markets" value="BTC-PERP, ETH-PERP" />
            <Field label="Emergency Stop" value="Enabled" />
          </div>
          <div className="mt-3 flex gap-2"><button className="border border-border-subtle px-3 py-2 text-xs">Save Draft</button><button className="border border-accent-cyan/40 bg-accent-cyan/10 px-3 py-2 text-xs text-accent-cyan">Deploy Strategy</button></div>
        </Panel>
      </div>
    </AppShell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return <label className="block text-xs text-text-muted">{label}<input className="mt-1 w-full border border-border-subtle bg-panel-raised p-2 font-mono text-text-primary" value={value} readOnly /></label>;
}

function Select({ label, options }: { label: string; options: string[] }) {
  return <label className="block text-xs text-text-muted">{label}<select className="mt-1 w-full border border-border-subtle bg-panel-raised p-2 font-mono text-text-primary">{options.map((o) => <option key={o}>{o}</option>)}</select></label>;
}

function Area({ label, value }: { label: string; value: string }) {
  return <label className="block text-xs text-text-muted">{label}<textarea className="mt-1 h-16 w-full resize-none border border-border-subtle bg-panel-raised p-2 font-mono text-text-primary" value={value} readOnly /></label>;
}

function Metric({ k, v }: { k: string; v: string }) {
  return <div className="border border-border-subtle bg-panel-raised p-2"><div className="text-text-muted">{k}</div><div className="mt-1 font-mono text-sm">{v}</div></div>;
}

function Item({ k, v }: { k: string; v: string }) {
  return <div className="border border-border-subtle p-2"><div className="text-text-muted">{k}</div><div className="mt-1">{v}</div></div>;
}
