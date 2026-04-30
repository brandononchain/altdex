import { ReactNode } from 'react';
export default function PageHeader({ title, subtitle, actions }: { title: string; subtitle: string; actions?: ReactNode }) {
  return <div className="flex items-start justify-between"><div><h2 className="text-lg font-semibold">{title}</h2><p className="text-xs text-text-muted">{subtitle}</p></div>{actions}</div>;
}
