import { respondUnauthorized } from '../utils/http-responses';

export default function requiresWorkspace(req, res, next) {
  if (res.locals.workspaceId) {
    return next();
  }

  return respondUnauthorized(
    res,
    'A workspace is required to use this resource.'
  );
}
