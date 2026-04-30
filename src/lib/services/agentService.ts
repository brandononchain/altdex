import { AgentsResponse } from '@/lib/api/contracts';
import { getJson } from './http';
export const agentService = { getAgents: () => getJson<AgentsResponse>('/api/agents') };
