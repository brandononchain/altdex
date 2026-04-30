import { NextResponse } from 'next/server';
const journal=[{id:'tr_1',ts:'2026-04-29 15:42:21',market:'BTC-PERP',side:'LONG',entry:103212,exit:104892,pnl:3803.21,rMultiple:2.1,agent:'ALPHA-7',strategy:'Trend-Follow v2',thesisScore:86,executionScore:82,reviewStatus:'Completed'}];
export async function GET() { return NextResponse.json({ ok: true, data: journal, ts: new Date().toISOString() }); }
