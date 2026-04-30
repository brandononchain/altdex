import type { AccountSummary, Agent, DataLabMetrics, ExecutionFlow, MarketAsset, Position, RiskMetrics, Strategy, WatchlistItem } from '@/lib/mock-data/types';

export type ApiResult<T> = { ok: true; data: T; ts: string };
export type Order = { id: string; market: string; side: 'BUY' | 'SELL'; type: 'LIMIT' | 'MARKET'; size: number; price: number; status: 'OPEN'|'FILLED'|'CANCELED'; createdAt: string };
export type JournalTrade = { id: string; ts: string; market: string; side: 'LONG'|'SHORT'; entry: number; exit: number; pnl: number; rMultiple: number; agent: string; strategy: string; thesisScore: number; executionScore: number; reviewStatus: 'Pending'|'Completed' };

export type AccountSummaryResponse = ApiResult<AccountSummary>;
export type MarketsResponse = ApiResult<MarketAsset[]>;
export type WatchlistResponse = ApiResult<WatchlistItem[]>;
export type PositionsResponse = ApiResult<Position[]>;
export type OrdersResponse = ApiResult<Order[]>;
export type AgentsResponse = ApiResult<Agent[]>;
export type StrategiesResponse = ApiResult<Strategy[]>;
export type RiskMetricsResponse = ApiResult<RiskMetrics>;
export type DataLabResponse = ApiResult<DataLabMetrics>;
export type JournalResponse = ApiResult<JournalTrade[]>;

export type ExecutionPreviewRequest = { market: string; direction: 'LONG'|'SHORT'; size: number; leverage: number; orderType: 'Limit'|'Market'; limitPrice?: number };
export type ExecutionPreviewResponse = ApiResult<{ thesis: ExecutionFlow; controls: { mode: 'Manual'|'Approval'|'Autonomous'; maxLeverage: number }; riskImpact: { maxLoss: number; marginImpact: number; riskChange: number } }>;
export type ExecutionApproveRequest = ExecutionPreviewRequest & { mode: 'Manual'|'Approval'|'Autonomous' };
export type ExecutionApproveResponse = ApiResult<{ eventId: string; status: 'APPROVED'; approvedAt: string; market: string; direction: 'LONG'|'SHORT' }>;
