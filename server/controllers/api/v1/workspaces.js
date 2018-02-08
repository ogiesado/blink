import crypto from 'crypto';
import env from '../../../utils/env';
import { getRedisClient } from '../../../utils/redis';
import {
  respondServerError,
  respondOk,
  respondBadRequest,
} from '../../../utils/responses';
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
    .hset('WORKSPACE', key, id)
    .then(() => respondOk(res, { id, key, b: req.body }))
    .catch(error => respondServerError(res, error.message));
}
