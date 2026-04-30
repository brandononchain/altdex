import type { ReactNode } from 'react';
import { Panel } from '@/components/ui/primitives';
export default function AllocationPanel({ children }: { children: ReactNode }) { return <Panel className="p-3">{children}</Panel>; }
