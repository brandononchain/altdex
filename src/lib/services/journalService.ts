import { JournalResponse } from '@/lib/api/contracts';
import { getJson } from './http';
export const journalService = { getTrades: () => getJson<JournalResponse>('/api/journal') };
