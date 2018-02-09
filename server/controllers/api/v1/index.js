import { Router } from 'express';
import {
  createWorkpace,
  verifyWorkspaceKey,
  deleteWorkspaceKey,
} from './workspaces';

const api = Router();

api.post('/workspaces', createWorkpace);
api.get('/workspaces/:key', verifyWorkspaceKey);
api.delete('/workspaces/:key', deleteWorkspaceKey);

export default api;
