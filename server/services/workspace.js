import crypto from 'crypto';
import env from '../utils/env';
import {
  getRedisClient,
  REDIS_WORKSPACE_KEY_PREFIX,
  REDIS_WORKSPACE_EXPIRY,
  setRedisKey,
  setRedisExpire,
  getRedisKey,
} from '../utils/redis';
import hash from '../utils/hash';

export async function createWorkspace(workspaceId) {
  const key = hash(String(Date.now()));
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
}

export function getWorkspaceId(workspaceKey = '') {
  return getRedisKey(`${REDIS_WORKSPACE_KEY_PREFIX}${workspaceKey}`);
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
