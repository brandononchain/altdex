'use client';

import type { ReactNode } from 'react';
import AppShell from '@/components/layout/AppShell';
import { Panel } from '@/components/ui/primitives';
import PageHeader from '@/components/layout/PageHeader';
import SectionTabs from '@/components/layout/SectionTabs';
import ToggleControl from '@/components/controls/ToggleControl';
import NumericInput from '@/components/controls/NumericInput';
import { useWallet, walletStateTone } from '@/lib/wallet/WalletProvider';

export default function SettingsPage() {
  const { session } = useWallet();
  return (
    <AppShell>
      <div className="grid grid-cols-12 gap-3">
        <Panel className="col-span-12 p-3">
          <PageHeader title="SETTINGS" subtitle="Configure your platform, preferences, and risk parameters." />
          <div className="mt-3"><SectionTabs items={['GENERAL','TRADING','RISK','NOTIFICATIONS','API','SECURITY','INTEGRATIONS','BILLING']} /></div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-8">
          <div className="grid grid-cols-2 gap-3">
            <ConfigCard title="Platform Preferences">
              <Select label="Language" value="English (US)" />
              <Select label="Theme" value="ALTDEX Dark" />
              <Select label="Timezone" value="UTC" />
              <Select label="Date Format" value="YYYY-MM-DD" />
              <Select label="Number Format" value="1,234,567.89" />
              <Select label="Default Dashboard" value="Terminal" />
            </ConfigCard>

            <ConfigCard title="Defaults & Display">
              <ToggleControl label="Compact Mode" on />
              <ToggleControl label="Fiat Display" on />
              <ToggleControl label="Percentage Change" on />
              <ToggleControl label="Auto Refresh" on />
              <ToggleControl label="Sound Alerts" />
              <ToggleControl label="Confirm Before Execute" on />
              <ToggleControl label="Advanced Metrics" on />
            </ConfigCard>

            <ConfigCard title="Trading Preferences">
              <Select label="Order Type" value="Limit" />
              <Select label="Time in Force" value="GTC" />
              <NumericInput label="Slippage Tolerance" value="0.08%" />
              <NumericInput label="Leverage Stepper" value="1x" />
              <Select label="Position Mode" value="Hedge" />
              <ToggleControl label="Reduce Only" />
              <ToggleControl label="Post Only" on />
            </ConfigCard>

            <ConfigCard title="Risk Preferences">
              <NumericInput label="Max Portfolio Risk" value="23.7%" />
              <NumericInput label="Max Position Risk" value="4.5%" />
              <NumericInput label="Daily Loss Limit" value="1.8%" />
              <NumericInput label="Drawdown Alert" value="6.0%" />
              <NumericInput label="Concentration Limit" value="38%" />
              <ToggleControl label="Auto De-risk" on />
              <Select label="Risk Engine Mode" value="Dynamic" />
            </ConfigCard>
          </div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-4">
          <div className="mb-2 text-sm font-semibold">CONNECTED ACCOUNTS & WALLETS</div>
          <div className="space-y-2 text-xs">{['Main Wallet','Binance','Bybit','OKX','Coinbase'].map((a, i) => <div key={a} className="flex items-center justify-between border border-border-subtle bg-panel-raised p-2"><div><div className="font-mono">{a}</div><div className="text-[10px] text-text-muted">{i===0?(session.address ?? 'Not connected'):'API Linked'}</div></div><span className={i===0 ? walletStateTone(session.state) : 'text-accent-green'}>{i===0 ? session.state.replace('_',' ') : 'Connected'}</span></div>)}<button className="w-full border border-accent-cyan/40 bg-accent-cyan/10 p-2 text-accent-cyan">Connect New</button></div>
        </Panel>

        <Panel className="col-span-12 p-3 xl:col-span-4 xl:col-start-9">
          <div className="mb-2 text-sm font-semibold">ACCOUNT INFORMATION</div>
          <div className="space-y-1 text-xs font-mono"><div>User: 0xA71...3e21</div><div>Plan: Pro Account</div><div>Region: US</div><div>Last Login: 2026-04-29 19:42 UTC</div></div>
          <div className="mt-3 border-t border-border-subtle pt-3"><div className="mb-1 text-sm font-semibold">SYSTEM STATUS</div><div className="space-y-1 text-xs"><div className="text-accent-green">All Systems Operational</div><div className="text-text-muted">Latency: 16ms</div><div className="text-text-muted">Feed Sync: Live</div></div></div>
          <div className="mt-3 border-t border-border-subtle pt-3"><div className="mb-1 text-sm font-semibold">QUICK ACTIONS</div><div className="grid grid-cols-2 gap-2"><button className="border border-border-subtle p-2 text-xs">Reset UI</button><button className="border border-border-subtle p-2 text-xs">Export Config</button><button className="border border-border-subtle p-2 text-xs">Import Config</button><button className="border border-accent-red/40 bg-accent-red/15 p-2 text-xs text-accent-red">Lock Session</button></div></div>
        </Panel>
      </div>
    </AppShell>
  );
}

function ConfigCard({ title, children }: { title: string; children: ReactNode }) {
  return <div className="border border-border-subtle bg-panel-base p-3"><div className="mb-2 text-sm font-semibold">{title}</div><div className="space-y-2">{children}</div></div>;
}

function Select({ label, value }: { label: string; value: string }) {
  return <label className="block text-xs text-text-muted">{label}<select className="mt-1 w-full border border-border-subtle bg-panel-raised p-2 font-mono"><option>{value}</option></select></label>;
}

