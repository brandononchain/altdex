'use client';

import { useEffect, useMemo, useState } from 'react';
import { executionService } from '@/lib/services';
import { useExecutionLifecycle } from '@/lib/sim/hooks';
import { executionFlow } from '@/lib/mockData';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { Panel } from '@/components/ui/primitives';

type Props = { open: boolean; direction: 'LONG' | 'SHORT'; onClose: () => void };

export default function ExecutionFlowOverlay({ open, direction, onClose }: Props) {
  const [size, setSize] = useState(2.25);
  const [leverage, setLeverage] = useState(15);
  const [mode, setMode] = useState<'Manual' | 'Approval' | 'Autonomous'>('Approval');
  const [orderType, setOrderType] = useState('Limit');
  const [limitPrice, setLimitPrice] = useState(104892.1);
  const [approved, setApproved] = useState(false);
  const [previewLoss, setPreviewLoss] = useState<number | null>(null);
  const lifecycle = useExecutionLifecycle();

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  const maxLoss = useMemo(() => (Math.abs(limitPrice - 103900) * size) / leverage, [limitPrice, size, leverage]);
  const marginImpact = useMemo(() => (size * limitPrice) / leverage, [size, limitPrice, leverage]);

  useEffect(() => {
    if (!open) return;
    executionService.preview({ market: 'BTC-PERP', direction, size, leverage, orderType: orderType as 'Limit'|'Market', limitPrice }).then((res) => setPreviewLoss(res.data.riskImpact.maxLoss)).catch(() => setPreviewLoss(null));
  }, [open, direction, size, leverage, orderType, limitPrice]);


  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-[1px] p-8">
      <Panel className="mx-auto grid h-full max-w-[1400px] grid-cols-12 gap-3 border border-border-subtle bg-bg-soft p-4">
        <div className="col-span-12 flex items-center justify-between border-b border-border-subtle pb-3 text-sm xl:col-span-12">
          <div><span className="font-semibold">EXECUTION FLOW</span> <span className="text-text-muted">AI THESIS · CONTROL · RISK IMPACT</span></div>
          <button onClick={onClose} className="border border-border-subtle px-3 py-1 text-xs">Close ✕</button>
        </div>

        <div className="col-span-12 space-y-2 border border-border-subtle bg-panel-base p-3 text-xs xl:col-span-4">
          <h3 className="text-sm font-semibold">AI TRADE THESIS</h3>
          <div className="font-mono space-y-1">
            <div>Agent: ALPHA-7</div><div>Strategy: Trend-Follow v2</div><div>Market: BTC-PERP</div><div>Direction: {direction}</div><div>Confidence: 0.82</div><div>Time Horizon: Intraday</div>
            <div>Entry Zone: 104,820 to 104,950</div><div>Stop Loss: 103,900</div><div>Take Profit: 106,400</div><div>Expected R: 2.3R</div>
          </div>
          <ul className="list-disc pl-4 text-text-muted">
            <li>Momentum continuation</li><li>Liquidity sweep completed</li><li>Funding neutral</li><li>Volatility expansion phase</li>
          </ul>
        </div>

        <div className="col-span-12 space-y-3 border border-border-subtle bg-panel-base p-3 text-xs xl:col-span-4">
          <h3 className="text-sm font-semibold">EXECUTION CONTROL</h3>
          <label className="block">Position Size: <span className="font-mono">{size.toFixed(2)} BTC</span><input type="range" min={0.25} max={5} step={0.05} value={size} onChange={(e) => setSize(Number(e.target.value))} className="mt-2 w-full" /></label>
          <label className="block">Leverage: <span className="font-mono">{leverage}x</span><input type="range" min={1} max={50} step={1} value={leverage} onChange={(e) => setLeverage(Number(e.target.value))} className="mt-2 w-full" /></label>
          <label className="block">Order Type<select className="mt-1 w-full border border-border-subtle bg-panel-raised p-2" value={orderType} onChange={(e) => setOrderType(e.target.value)}><option>Limit</option><option>Market</option></select></label>
          <label className="block">Limit Price<input className="mt-1 w-full border border-border-subtle bg-panel-raised p-2 font-mono" value={limitPrice} onChange={(e) => setLimitPrice(Number(e.target.value || 0))} /></label>
          <div>
            <div className="mb-1 text-text-muted">Execution Mode</div>
            <div className="grid grid-cols-3 gap-2">{(['Manual', 'Approval', 'Autonomous'] as const).map((m) => <button key={m} onClick={() => setMode(m)} className={`border px-2 py-1 ${mode === m ? 'border-accent-cyan text-accent-cyan' : 'border-border-subtle'}`}>{m}</button>)}</div>
          </div>
          <div className="grid grid-cols-2 gap-2"><button onClick={async () => { await executionService.approve({ market: 'BTC-PERP', direction, size, leverage, orderType: orderType as 'Limit'|'Market', limitPrice, mode }); lifecycle.run(); setApproved(true); setTimeout(onClose, 4200); }} className="border border-accent-green/40 bg-accent-green/20 px-3 py-2 font-semibold text-accent-green">Approve Execution</button><button className="border border-border-subtle px-3 py-2">Modify Plan</button></div>
          <div className="text-text-muted">Manual override enabled. Agent will pause autonomous re-entries for this leg.</div>
          {approved && <div className="border border-accent-green/40 bg-accent-green/10 p-2 font-mono text-accent-green">Execution {lifecycle.state.toUpperCase()}</div>}
          {lifecycle.log.length > 0 && <div className="border border-border-subtle p-2 text-[11px] font-mono">{lifecycle.log.map((l) => <div key={l}>{l}</div>)}</div>}
        </div>

        <div className="col-span-12 space-y-2 border border-border-subtle bg-panel-base p-3 text-xs xl:col-span-4">
          <h3 className="text-sm font-semibold">RISK + IMPACT</h3>
          <div className="space-y-1 font-mono"><div>Max Loss: {formatCurrency(previewLoss ?? maxLoss)}</div><div>Expected R: 2.3R</div><div>Liquidation Price: {formatNumber(93214.7, 1)}</div><div>Slippage Estimate: 0.06%</div><div>Gas / Fees: {formatCurrency(executionFlow.fees)}</div><div>Portfolio Risk Change: +1.3%</div><div>Margin Impact: {formatCurrency(marginImpact)}</div></div>
          <div className="inline-block border border-accent-amber/50 bg-accent-amber/10 px-2 py-1 text-accent-amber">Risk Level: Moderate</div>
          <button onClick={onClose} className="mt-4 w-full border border-accent-red/40 bg-accent-red/20 px-3 py-2 font-semibold text-accent-red">Reject Trade</button>
        </div>
      </Panel>
    </div>
  );
}
