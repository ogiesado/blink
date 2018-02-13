import { Router } from 'express';
import {
  createWorkpace,
  verifyWorkspaceKey,
  deleteWorkspaceKey,
} from './workspaces';
import { getUpdateDetails } from './updates';

const api = Router();

api.post('/workspaces', createWorkpace);
api.get('/workspaces/:key', verifyWorkspaceKey);
api.delete('/workspaces/:key', deleteWorkspaceKey);

api.get('/updates', getUpdateDetails);

export default api;
