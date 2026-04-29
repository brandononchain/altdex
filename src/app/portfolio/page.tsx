'use client';
import AppShell from '@/components/layout/AppShell';
import { Panel, PrimaryButton, SecondaryButton } from '@/components/ui/primitives';

export default function Page() {
  return <AppShell><div className="grid grid-cols-12 gap-3"><Panel className="col-span-8 p-3"><div className="mb-2 text-xs text-text-muted">PORTFOLIO</div><div className="h-72 border border-border-subtle bg-panel-raised" /><div className="mt-3 flex gap-2"><PrimaryButton>Execute</PrimaryButton><SecondaryButton>Review Risk</SecondaryButton></div></Panel><Panel className="col-span-4 p-3"><div className="text-xs text-text-muted">AI STATE</div><div className="mt-2 font-mono text-sm">Agent: ALPHA-7 · Confidence: 82</div></Panel></div></AppShell>;
}
