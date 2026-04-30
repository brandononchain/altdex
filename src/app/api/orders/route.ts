import { NextResponse } from 'next/server';
const orders=[{id:'ord_1',market:'BTC-PERP',side:'BUY',type:'LIMIT',size:0.8,price:104820,status:'OPEN',createdAt:'2026-04-30T12:11:00Z'}];
export async function GET() { return NextResponse.json({ ok: true, data: orders, ts: new Date().toISOString() }); }
