'use client';
import { Panel } from '@/components/ui/primitives';
import { useWallet, walletStateTone } from '@/lib/wallet/WalletProvider';

export default function ConnectWalletOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { connect, session } = useWallet();
  if (!open) return null;
  return <div className="fixed inset-0 z-50 bg-black/75 p-8"><Panel className="mx-auto max-w-[760px] border border-border-subtle bg-bg-soft p-4"><div className="mb-3 flex items-center justify-between"><div><div className="text-sm font-semibold">CONNECT WALLET</div><div className="text-xs text-text-muted">Authorize account access for execution, journaling, and risk controls.</div></div><button className="terminal-btn" onClick={onClose}>Close</button></div><div className="grid grid-cols-3 gap-3 text-xs"><button className="terminal-btn-primary" onClick={() => connect('Phantom')}>Phantom</button><button className="terminal-btn" onClick={() => connect('Backpack')}>Backpack</button><button className="terminal-btn" onClick={() => connect('WalletConnect')}>WalletConnect</button></div><div className="mt-3 border border-border-subtle p-2 text-xs"><div>Network: <span className="font-mono">Solana Mainnet</span></div><div className="mt-1">Status: <span className={`font-mono ${walletStateTone(session.state)}`}>{session.state}</span></div></div><div className="mt-3 border border-accent-amber/30 bg-accent-amber/10 p-2 text-xs text-accent-amber">Risk disclaimer: Wallet connection enables simulated authorization only. No on-chain transaction is executed in this environment.</div></Panel></div>;
}
