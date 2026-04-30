import { NextResponse } from 'next/server';
import { riskMetrics } from '@/lib/mockData';
export async function GET() { return NextResponse.json({ ok: true, data: riskMetrics, ts: new Date().toISOString() }); }
