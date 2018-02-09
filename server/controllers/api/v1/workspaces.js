import crypto from 'crypto';
import env from '../../../utils/env';
import { getRedisClient } from '../../../utils/redis';
import {
  respondServerError,
  respondOk,
  respondBadRequest,
  respondNotFound,
} from '../../../utils/http-responses';
import { isValidWorkspaceId } from '../../../../shared/utils';

const REDIS_WORKSPACE_KEY = 'BLINK:WORKSPACE';

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
    .set(`${REDIS_WORKSPACE_KEY}.${key}`, id, 'EX', 2 * 60)
    .then(() => respondOk(res, { id, key }))
    .catch(error => respondServerError(res, error.message));
}

export function verifyWorkspaceKey(req, res) {
  const key = req.params.key;
  getRedisClient()
    .get(`${REDIS_WORKSPACE_KEY}.${key}`)
    .then(id => {
      if (id === null) {
        return respondNotFound(res, 'Workspace not found.');
      }

      return respondOk(res, { id, key });
    })
    .catch(error => respondServerError(res, error.message));
}
