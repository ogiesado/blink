import crypto from 'crypto';
import env from '../utils/env';
import {
  getRedisClient,
  REDIS_WORKSPACE_KEY_PREFIX,
  REDIS_WORKSPACE_EXPIRY,
} from '../utils/redis';

export function createWorkspace(workspaceId) {
  const key = crypto
    .createHmac('sha256', env('APP_KEY'))
    .update(String(Date.now()))
    .digest('hex');

  return getRedisClient()
    .set(
      `${REDIS_WORKSPACE_KEY_PREFIX}${key}`,
      workspaceId,
      'EX',
      REDIS_WORKSPACE_EXPIRY
    )
    .then(() => ({ key, id: workspaceId }));
}

export function getWorkspaceId(workspaceKey) {
  return getRedisClient().get(`${REDIS_WORKSPACE_KEY_PREFIX}${workspaceKey}`);
}
