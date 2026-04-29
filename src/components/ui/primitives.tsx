import { ReactNode } from 'react';

export const Panel = ({ children, className = '' }: { children: ReactNode; className?: string }) => <section className={`border border-border-subtle bg-panel-base ${className}`}>{children}</section>;
export const StatusPill = ({ tone = 'neutral', children }: { tone?: 'success' | 'danger' | 'warning' | 'neutral'; children: ReactNode }) => {
  const cls = { success: 'text-accent-green', danger: 'text-accent-red', warning: 'text-accent-amber', neutral: 'text-text-muted' }[tone];
  return <span className={`font-mono text-xs ${cls}`}>{children}</span>;
};
export const MetricCard = ({ label, value }: { label: string; value: string }) => <div className="min-w-36 border-l border-border-subtle px-4 py-2"><div className="text-[11px] tracking-wide text-text-muted">{label}</div><div className="font-mono text-sm text-text-primary">{value}</div></div>;
export const IconButton = ({ children }: { children: ReactNode }) => <button className="h-8 w-8 border border-border-subtle text-text-muted hover:text-accent-cyan">{children}</button>;
export const PrimaryButton = ({ children }: { children: ReactNode }) => <button className="bg-accent-green/20 px-3 py-2 text-xs font-semibold text-accent-green border border-accent-green/30">{children}</button>;
export const SecondaryButton = ({ children }: { children: ReactNode }) => <button className="bg-panel-raised px-3 py-2 text-xs font-semibold text-text-primary border border-border-subtle">{children}</button>;
export const Tabs = ({ items }: { items: string[] }) => <div className="flex border-b border-border-subtle">{items.map((item, i) => <button key={item} className={`px-3 py-2 text-xs ${i === 0 ? 'text-accent-cyan border-b border-accent-cyan' : 'text-text-muted'}`}>{item}</button>)}</div>;
export const SelectControl = ({ label, options }: { label: string; options: string[] }) => <label className="block text-xs text-text-muted">{label}<select className="mt-1 w-full border border-border-subtle bg-panel-raised p-2 text-text-primary">{options.map((o) => <option key={o}>{o}</option>)}</select></label>;
export const SliderControl = ({ label }: { label: string }) => <label className="block text-xs text-text-muted">{label}<input className="mt-2 w-full" type="range" defaultValue={50} /></label>;
export const DataTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => <table className="w-full text-xs"><thead><tr>{headers.map((h) => <th key={h} className="border-b border-border-subtle p-2 text-left text-text-muted">{h}</th>)}</tr></thead><tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className="border-b border-border-subtle p-2 font-mono">{c}</td>)}</tr>)}</tbody></table>;
