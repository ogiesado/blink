import { getWorkspaceId } from '../services/workspace';
import { respondServerError } from '../utils/http-responses';

export default function initRequest(req, res, next) {
  const workspaceKey = req.get('Blink-Workspace-Key');
  getWorkspaceId(workspaceKey)
    .then(workspaceId => {
      res.locals.workspaceId = workspaceId;
      res.locals.workspaceKey = workspaceKey;

      return next();
    })
    .catch(error => {
      respondServerError(res);
      throw error;
    });
}
