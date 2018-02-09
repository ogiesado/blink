import { Router } from 'express';
import { createWorkpace, verifyWorkspaceKey } from './workspaces';

const api = Router();

api.post('/workspaces', createWorkpace);
api.get('/workspaces/:key', verifyWorkspaceKey);

export default api;
