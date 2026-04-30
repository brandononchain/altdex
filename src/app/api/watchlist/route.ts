import { NextResponse } from 'next/server';
import { watchlist } from '@/lib/mockData';
export async function GET() { return NextResponse.json({ ok: true, data: watchlist, ts: new Date().toISOString() }); }
