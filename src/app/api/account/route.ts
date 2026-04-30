import { NextResponse } from 'next/server';
import { accountSummary } from '@/lib/mockData';
export async function GET() { return NextResponse.json({ ok: true, data: accountSummary, ts: new Date().toISOString() }); }
