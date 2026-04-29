import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Settings } from 'lucide-react';
import { navItems, topMetrics } from '@/lib/mockData';
import { IconButton, MetricCard, Panel, StatusPill } from '@/components/ui/primitives';

function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-60 flex-col border-r border-border-subtle bg-bg-soft p-3">
      <div className="mb-4 border-b border-border-subtle pb-3 text-lg font-semibold tracking-[0.28em]">ALTDEX</div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={`block border px-3 py-2 text-sm ${pathname === item.href ? 'border-accent-cyan/40 text-accent-cyan bg-panel-raised' : 'border-transparent text-text-muted hover:border-border-subtle hover:text-text-primary'}`}>
            {item.label.toUpperCase()}
          </Link>
        ))}
      </nav>
      <Panel className="mt-auto p-3 text-xs"><div className="mb-2 text-text-muted">SYSTEM STATUS</div><StatusPill tone="success">All Systems Operational</StatusPill></Panel>
      <Panel className="mt-2 p-3 text-xs"><div className="mb-2 text-text-muted">NETWORK</div><div className="font-mono">Solana</div></Panel>
    </aside>
  );
}

function TopBar() {
  return <Panel className="mb-3 flex items-center justify-between px-3 py-2"><div><h1 className="text-sm font-semibold tracking-wide">TERMINAL</h1><p className="text-[11px] text-text-muted">AI-NATIVE EXECUTION TERMINAL</p></div><div className="flex">{topMetrics.map(([l, v]) => <MetricCard key={l} label={l} value={v} />)}</div><div className="flex gap-2"><IconButton><Activity size={14} /></IconButton><IconButton><Settings size={14} /></IconButton></div></Panel>;
}

export default function AppShell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-bg-base text-text-primary"><Sidebar /><main className="ml-60 p-3"><TopBar />{children}</main></div>;
}
