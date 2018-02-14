import { getWorkspaceId } from '../services/workspace';

export default function initRequest(req, res, next) {
  const workspaceKey = req.get('Blink-Workspace-Key');
  getWorkspaceId(workspaceKey)
    .then(workspaceId => {
      res.locals.workspaceId = workspaceId;
      res.locals.workspaceKey = workspaceKey;

      next();
    })
    .catch(error => {
      throw error;
    });
}
