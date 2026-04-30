import { NextResponse } from 'next/server';
import { strategies } from '@/lib/mockData';
export async function GET() { return NextResponse.json({ ok: true, data: strategies, ts: new Date().toISOString() }); }
