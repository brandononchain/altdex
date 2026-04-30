import { NextResponse } from 'next/server';
import { marketAssets } from '@/lib/mockData';
export async function GET() { return NextResponse.json({ ok: true, data: marketAssets, ts: new Date().toISOString() }); }
