import { NextResponse } from 'next/server';
import { agents } from '@/lib/mockData';
export async function GET() { return NextResponse.json({ ok: true, data: agents, ts: new Date().toISOString() }); }
