import { ReactNode } from 'react';

export const Panel = ({ children, className = '' }: { children: ReactNode; className?: string }) => <section className={`terminal-panel ${className}`}>{children}</section>;
export const StatusPill = ({ tone = 'neutral', children }: { tone?: 'success' | 'danger' | 'warning' | 'neutral'; children: ReactNode }) => {
  const cls = { success: 'text-accent-green', danger: 'text-accent-red', warning: 'text-accent-amber', neutral: 'text-text-muted' }[tone];
  return <span className={`font-mono text-xs ${cls}`}>{children}</span>;
};
export const MetricCard = ({ label, value }: { label: string; value: string }) => <div className="min-w-32 border-l border-border-subtle px-3 py-1"><div className="text-[10px] tracking-wide text-text-muted">{label}</div><div className="font-mono text-xs text-text-primary">{value}</div></div>;
export const IconButton = ({ children, label = 'icon action' }: { children: ReactNode; label?: string }) => <button aria-label={label} className="h-8 w-8 border border-border-subtle text-text-muted hover:text-accent-cyan">{children}</button>;
export const PrimaryButton = ({ children }: { children: ReactNode }) => <button className="terminal-btn-primary">{children}</button>;
export const SecondaryButton = ({ children }: { children: ReactNode }) => <button className="terminal-btn">{children}</button>;
export const Tabs = ({ items }: { items: string[] }) => <div className="flex flex-wrap border-b border-border-subtle">{items.map((item, i) => <button key={item} className={`px-3 py-2 text-[11px] ${i === 0 ? 'text-accent-cyan border-b border-accent-cyan' : 'text-text-muted'}`}>{item}</button>)}</div>;
export const SelectControl = ({ label, options }: { label: string; options: string[] }) => <label className="block text-xs text-text-muted">{label}<select className="terminal-select mt-1">{options.map((o) => <option key={o}>{o}</option>)}</select></label>;
export const SliderControl = ({ label }: { label: string }) => <label className="block text-xs text-text-muted">{label}<input className="mt-2 w-full accent-cyan-400" type="range" defaultValue={50} /></label>;
export const DataTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => <table className="terminal-table"><thead><tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody></table>;
