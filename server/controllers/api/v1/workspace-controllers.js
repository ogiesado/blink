import {
  getRedisClient,
  REDIS_WORKSPACE_KEY_PREFIX,
} from '../../../utils/redis';
import {
  respondServerError,
  respondOk,
  respondBadRequest,
  respondNotFound,
} from '../../../utils/http-responses';
import { isValidWorkspaceId } from '../../../../shared/utils';
import { createWorkspace } from '../../../services/workspace';

export function createWorkpaceController(req, res) {
  const id = req.body.id;

  if (!isValidWorkspaceId(id)) {
    return respondBadRequest(res, 'Invalid workspace ID');
  }

  createWorkspace(id)
    .then(result => respondOk(res, result))
    .catch(error => respondServerError(res, error.message));
}

export function verifyWorkspaceKeyController(req, res) {
  const key = req.params.key;
  getRedisClient()
    .get(`${REDIS_WORKSPACE_KEY_PREFIX}${key}`)
    .then(id => {
      if (id === null) {
        return respondNotFound(res, 'Workspace not found.');
      }

      return respondOk(res, { id, key });
    })
    .catch(error => respondServerError(res, error.message));
}

export function deleteWorkspaceKeyController(req, res) {
  const key = req.params.key;
  getRedisClient()
    .del(`${REDIS_WORKSPACE_KEY_PREFIX}${key}`)
    .then(() => respondOk(res))
    .catch(error => respondServerError(res, error.message));
}
