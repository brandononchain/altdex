import { ReactNode } from 'react';
import { cn } from '@/lib/ui/cn';
export default function TerminalButton({ children, tone='default' }: { children: ReactNode; tone?: 'default'|'primary'|'success'|'danger' }) { return <button className={cn('terminal-btn', tone==='primary'&&'terminal-btn-primary', tone==='success'&&'terminal-btn-success', tone==='danger'&&'terminal-btn-danger')}>{children}</button>; }
