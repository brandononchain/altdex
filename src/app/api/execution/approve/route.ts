import { NextResponse } from 'next/server';
export async function POST(req: Request) { const b = await req.json(); return NextResponse.json({ ok:true, data:{ eventId:`exec_${Date.now()}`, status:'APPROVED', approvedAt:new Date().toISOString(), market:b.market, direction:b.direction }, ts:new Date().toISOString()}); }
