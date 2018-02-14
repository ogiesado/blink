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

const api = Router();

api.post('/workspaces', createWorkpaceController);
api.get('/workspaces/:key', verifyWorkspaceKeyController);
api.delete('/workspaces/:key', deleteWorkspaceKeyController);

api.get('/updates', getUpdateDetailsController);
api.post('/updates', startUpdateController);
api.get('/updates/status', getUpdateStatusController);

export default api;
