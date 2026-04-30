import { RiskMetricsResponse } from '@/lib/api/contracts';
import { getJson } from './http';
export const riskService = { getRiskMetrics: () => getJson<RiskMetricsResponse>('/api/risk') };
