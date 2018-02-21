import { Router } from 'express';
import {
  createWorkpaceController,
  verifyWorkspaceKeyController,
  deleteWorkspaceKeyController,
} from './workspace-controllers';
import {
  getUpdateDetailsController,
  getUpdateStatusController,
  startUpdateController,
} from './update-controllers';
import requiresWorkspace from '../../../middlewares/requiresWorkspace';

const api = Router();

api.post('/workspaces', createWorkpaceController);
api.get('/workspaces/:key', verifyWorkspaceKeyController);
api.delete('/workspaces/:key', deleteWorkspaceKeyController);

api.get('/updates', requiresWorkspace, getUpdateDetailsController);
api.post('/updates', requiresWorkspace, startUpdateController);
api.get('/updates/status', requiresWorkspace, getUpdateStatusController);

export default api;
