'use client';
import { createContext, useContext, useMemo, useState } from 'react';
import type { WalletSession, WalletState } from './types';

type Ctx = {
  session: WalletSession;
  connect: (provider: string) => Promise<void>;
  disconnect: () => Promise<void>;
  setWrongNetwork: () => void;
};

const WalletContext = createContext<Ctx | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<WalletSession>({ state: 'disconnected' });

  const connect = async (provider: string) => {
    setSession({ state: 'connecting', provider });
    await new Promise((r) => setTimeout(r, 800));
    setSession({ state: 'connected', provider, address: '0xA7f1...3e21', chainId: 'solana-mainnet' });
  };
  const disconnect = async () => setSession({ state: 'disconnected' });
  const setWrongNetwork = () => setSession((s) => ({ ...s, state: 'wrong_network', chainId: 'ethereum-mainnet' }));

  const value = useMemo(() => ({ session, connect, disconnect, setWrongNetwork }), [session]);
  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() { const ctx = useContext(WalletContext); return ctx ?? { session: { state: 'disconnected' as const }, connect: async () => {}, disconnect: async () => {}, setWrongNetwork: () => {} }; }

export const walletStateTone = (state: WalletState) => ({ disconnected: 'text-text-muted', connecting: 'text-accent-amber', connected: 'text-accent-green', wrong_network: 'text-accent-red' }[state]);
