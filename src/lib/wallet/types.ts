export type WalletState = 'disconnected' | 'connecting' | 'connected' | 'wrong_network';

export interface WalletAdapter {
  id: string;
  name: string;
  connect(): Promise<{ address: string; chainId: string }>;
  disconnect(): Promise<void>;
  switchNetwork(targetChainId: string): Promise<void>;
}

export interface WalletSession {
  state: WalletState;
  address?: string;
  chainId?: string;
  provider?: string;
}
