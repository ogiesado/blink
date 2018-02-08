import { Router } from 'express';
import { createWorkpace } from './workspaces';

const api = Router();

api.post('/workspaces', createWorkpace);

export default api;
