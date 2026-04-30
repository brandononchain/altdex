import { AccountSummaryResponse, OrdersResponse, PositionsResponse } from '@/lib/api/contracts';
import { getJson } from './http';
export const portfolioService = { getAccountSummary: () => getJson<AccountSummaryResponse>('/api/account'), getPositions: () => getJson<PositionsResponse>('/api/positions'), getOrders: () => getJson<OrdersResponse>('/api/orders') };
