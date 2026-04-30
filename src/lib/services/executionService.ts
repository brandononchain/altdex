import { ExecutionApproveRequest, ExecutionApproveResponse, ExecutionPreviewRequest, ExecutionPreviewResponse } from '@/lib/api/contracts';
import { postJson } from './http';
export const executionService = { preview: (body: ExecutionPreviewRequest) => postJson<ExecutionPreviewResponse>('/api/execution/preview', body), approve: (body: ExecutionApproveRequest) => postJson<ExecutionApproveResponse>('/api/execution/approve', body) };
