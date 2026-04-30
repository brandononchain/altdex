import { MarketsResponse, WatchlistResponse } from '@/lib/api/contracts';
import { getJson } from './http';
export const marketService = { getMarkets: () => getJson<MarketsResponse>('/api/markets'), getWatchlist: () => getJson<WatchlistResponse>('/api/watchlist') };
