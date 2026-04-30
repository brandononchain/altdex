import { NextResponse } from 'next/server';
import { dataLabMetrics } from '@/lib/mockData';
export async function GET() { return NextResponse.json({ ok: true, data: dataLabMetrics, ts: new Date().toISOString() }); }
