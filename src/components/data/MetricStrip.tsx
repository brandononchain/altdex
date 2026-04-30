import { ReactNode } from 'react';
export default function MetricStrip({ children }: { children: ReactNode }) { return <div className="grid gap-2 text-xs md:grid-cols-4 xl:grid-cols-6">{children}</div>; }
