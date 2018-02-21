import crypto from 'crypto';
import env from '../utils/env';
import {
  getRedisClient,
  REDIS_WORKSPACE_KEY_PREFIX,
  REDIS_WORKSPACE_EXPIRY,
  setRedisKey,
  setRedisExpire,
} from '../utils/redis';

export async function createWorkspace(workspaceId) {
  const key = crypto
    .createHmac('sha256', env('APP_KEY'))
    .update(String(Date.now()))
    .digest('hex');

  try {
    await setRedisKey(
      `${REDIS_WORKSPACE_KEY_PREFIX}${key}`,
      workspaceId,
      REDIS_WORKSPACE_EXPIRY
    );

    return { key, id: workspaceId };
  } catch (error) {
    throw error;
  }

  // return getRedisClient()
  //   .set(
  //     `${REDIS_WORKSPACE_KEY_PREFIX}${key}`,
  //     workspaceId,
  //     'EX',
  //     REDIS_WORKSPACE_EXPIRY
  //   )
  //   .then(() => ({ key, id: workspaceId }));
}

export function getWorkspaceId(workspaceKey = '') {
  return getRedisClient().get(`${REDIS_WORKSPACE_KEY_PREFIX}${workspaceKey}`);
}

export function deleteWorkspaceKey(workspaceKey) {
  return getRedisClient().del(`${REDIS_WORKSPACE_KEY_PREFIX}${workspaceKey}`);
}

export function refreshWorkspaceExpiry(workspaceKey) {
  return setRedisExpire(
    `${REDIS_WORKSPACE_KEY_PREFIX}${workspaceKey}`,
    REDIS_WORKSPACE_EXPIRY
  );
}
