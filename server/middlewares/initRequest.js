import { getWorkspaceId, refreshWorkspaceExpiry } from '../services/workspace';

export default async function initRequest(req, res, next) {
  const workspaceKey = req.get('Blink-Workspace-Key');

  try {
    const workspaceId = await getWorkspaceId(workspaceKey);
    res.locals.workspaceId = workspaceId;
    res.locals.workspaceKey = workspaceKey;

    if (workspaceId) {
      await refreshWorkspaceExpiry(workspaceKey);
    }

    next();
  } catch (error) {
    next(error);
  }
}
