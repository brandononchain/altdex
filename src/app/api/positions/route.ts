import { NextResponse } from 'next/server';
import { positions } from '@/lib/mockData';
export async function GET() { return NextResponse.json({ ok: true, data: positions, ts: new Date().toISOString() }); }
