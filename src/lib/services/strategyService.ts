import { StrategiesResponse } from '@/lib/api/contracts';
import { getJson } from './http';
export const strategyService = { getStrategies: () => getJson<StrategiesResponse>('/api/strategies') };
