'use client';

import AppShell from '@/components/layout/AppShell';
import { DataTable, Panel, Tabs } from '@/components/ui/primitives';
import { accountSummary, positions, riskMetrics } from '@/lib/mockData';
import { formatCompact, formatCurrency, formatPercent } from '@/lib/formatters';

export default function PortfolioPage() {
  const curve = [42, 44, 45, 43, 46, 49, 48, 50, 53, 54, 57, 56, 59, 61, 63, 62, 65, 66, 68, 70, 69, 72, 73, 75, 74, 76, 77, 79, 80, 82];
  return (
    <AppShell>
      <div className="grid grid-cols-12 gap-3">
        <Panel className="col-span-12 p-3">
          <Tabs items={['OVERVIEW', 'POSITIONS', 'HISTORY', 'ANALYTICS', 'REPORTS']} />
          <div className="mt-3 grid grid-cols-8 gap-2 text-xs">
            {[
              ['Portfolio Value', formatCurrency(accountSummary.equity)],
              ['Total PnL 24H', formatCurrency(accountSummary.pnl24h)],
              ['Total PnL 7D', '+$129,442.31'],
              ['Total PnL 30D', '+$346,872.22'],
              ['Win Rate', '68.4%'],
              ['Sharpe Ratio', '2.87'],
              ['Max Drawdown', '6.21%'],
              ['Portfolio Beta', '1.13']
            ].map(([k, v]) => <div key={k} className="border border-border-subtle bg-panel-raised p-2"><div className="text-text-muted">{k}</div><div className="mt-1 font-mono text-sm">{v}</div></div>)}
          </div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-7">
          <div className="mb-2 flex items-center justify-between"><div className="text-sm font-semibold">EQUITY CURVE</div><div className="text-xs text-text-muted">30D ▾</div></div>
          <div className="grid h-56 grid-cols-30 items-end gap-[2px] border border-border-subtle bg-panel-raised p-3">{curve.map((h, i) => <div key={i} className="bg-accent-cyan/80" style={{ height: `${h}%` }} />)}</div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            <Panel className="p-2"><div className="text-text-muted">BALANCE BREAKDOWN</div><div className="mt-1 font-mono">Perps: 62% · Spot: 23% · Stable: 15%</div></Panel>
            <Panel className="p-2"><div className="text-text-muted">PERFORMANCE METRICS</div><div className="mt-1 font-mono">PF 2.31 · Win 68.4% · R/R 2.3</div></Panel>
            <Panel className="p-2"><div className="text-text-muted">RISK METRICS</div><div className="mt-1 font-mono">VaR {formatCurrency(riskMetrics.var24h)} · Lev 15x</div></Panel>
          </div>
        </Panel>

        <div className="col-span-12 grid grid-cols-1 gap-3 xl:col-span-5">
          <Panel className="p-3"><div className="mb-2 text-sm font-semibold">ALLOCATION DONUT</div><div className="mx-auto h-44 w-44 rounded-full border-[18px] border-accent-cyan/40 border-t-accent-green border-r-accent-amber border-b-accent-red" /><div className="mt-2 text-center text-xs font-mono">Perps 62% · Spot 23% · Stable 15%</div></Panel>
          <Panel className="p-3"><div className="mb-2 text-sm font-semibold">PERFORMANCE VS BENCHMARK</div><div className="h-32 border border-border-subtle bg-panel-raised p-2 text-xs font-mono">ALTDEX +18.72% vs BTC +9.31%</div></Panel>
          <Panel className="p-3"><div className="mb-2 text-sm font-semibold">RECENT ACTIVITY</div><div className="space-y-1 text-xs font-mono"><div>15:42 Added BTC-PERP long</div><div>15:41 Hedged SOL-PERP exposure</div><div>15:39 Rebalanced margin buckets</div></div></Panel>
        </div>

        <Panel className="col-span-12 p-3">
          <div className="mb-2 text-sm font-semibold">ASSETS</div>
          <DataTable
            headers={['Asset', 'Type', 'Allocation', 'Total Value', 'Unrealized PnL', 'PnL %', 'Avg Entry', 'Mark Price', 'Position Size', 'Margin Used', 'Actions']}
            rows={positions.concat([{...positions[0], market:'USDC', side:'LONG', size:520000, sizeUnit:'USDC', entryPrice:1, markPrice:1, pnl:0, pnlPercent:0, liquidationPrice:0, margin:0, tp:0, sl:0, agent:'TREASURY'}]).map((p) => [p.market, p.market.includes('PERP') ? 'Perpetual' : 'Cash', p.market === 'USDC' ? '15%' : p.market === 'BTC-PERP' ? '38%' : p.market === 'ETH-PERP' ? '24%' : '23%', formatCurrency(p.markPrice * p.size), formatCurrency(p.pnl), formatPercent(p.pnlPercent), p.entryPrice.toString(), p.markPrice.toString(), `${formatCompact(p.size)} ${p.sizeUnit}`, formatCurrency(p.margin), 'Adjust / Close'])}
          />
        </Panel>
      </div>
    </AppShell>
  );
}
