import crypto from 'crypto';
import env from '../../../utils/env';
import {
  getRedisClient,
  REDIS_WORKSPACE_KEY_PREFIX,
  REDIS_WORKSPACE_EXPIRY,
} from '../../../utils/redis';
import {
  respondServerError,
  respondOk,
  respondBadRequest,
  respondNotFound,
} from '../../../utils/http-responses';
import { isValidWorkspaceId } from '../../../../shared/utils';

export function createWorkpace(req, res) {
  const id = req.body.id;

  if (!isValidWorkspaceId(id)) {
    return respondBadRequest(res, 'Invalid workspace ID');
  }

  const key = crypto
    .createHmac('sha256', env('APP_KEY'))
    .update(String(Date.now()))
    .digest('hex');

  getRedisClient()
    .set(
      `${REDIS_WORKSPACE_KEY_PREFIX}${key}`,
      id,
      'EX',
      REDIS_WORKSPACE_EXPIRY
    )
    .then(() => respondOk(res, { id, key }))
    .catch(error => respondServerError(res, error.message));
}

export function verifyWorkspaceKey(req, res) {
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

export function deleteWorkspaceKey(req, res) {
  const key = req.params.key;
  getRedisClient()
    .del(`${REDIS_WORKSPACE_KEY_PREFIX}${key}`)
    .then(() => respondOk(res))
    .catch(error => respondServerError(res, error.message));
}
