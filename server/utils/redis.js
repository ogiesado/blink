import Redis from 'ioredis';
import env from './env';
import {
  setUpdateStatus,
  setUpdateDetails,
  getUpdateDetails,
  getUpdateStatus,
} from '../services/updates';

export const REDIS_UPDATE_DETAILS_KEY = 'BLINK:UPDATE:DETAILS';
export const REDIS_UPDATE_STATUS_KEY = 'BLINK:UPDATE:STATUS';
export const REDIS_WORKSPACE_KEY_PREFIX = 'BLINK:WORKSPACE:';
export const REDIS_WORKSPACE_EXPIRY = 60 * 60;
/**
 * The connected redis client
 * @type {RedisClient}
 */
let client = null;

/**
 * Connects (if not connected) and returns the redis client
 * @param {Object} options Options for the redis client
 * @return {Promise} A promise that resolve with the redis client
 */
export function connectToRedis({
  host = env('REDIS_HOST'),
  port = env('REDIS_PORT'),
  ...rest
} = {}) {
  if (client !== null) {
    return Promise.resolve(client);
  }

  const options = {
    host,
    port,
    ...rest,
  };

  return new Promise((resolve, reject) => {
    const redis = new Redis(options);

    redis.on('connect', () => {
      client = redis;
      resolve(client);
    });

    redis.on('error', error => {
      reject(error);
    });
  });
}

/**
 * Returns the redis client
 * @return {RedisCient} The redis client
 * @throws {Error} If the redis client is not connected
 */
export function getRedisClient() {
  if (client === null) {
    throw new Error('Redis is not connected!');
  }

  return client;
}

export async function prepareRedis() {
  try {
    const updateDetails = await getUpdateDetails();
    const updateStatus = await getUpdateStatus();

    if (updateDetails === null) {
      await setUpdateDetails();
    }

    if (updateStatus === null) {
      await setUpdateStatus();
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Sets a redis key
 * @param {String} key The key to store the value
 * @param {String} value The value for the key
 * @param {Number} [expiry] Optional expiry in seconds
 * @return {Promise} The promise
 */
export async function setRedisKey(key, value, expiry) {
  const args = [key, value];
  if (expiry) {
    args.push('EX');
    args.push(expiry);
  }

  try {
    const result = await getRedisClient().set(...args);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function setRedisExpire(key, seconds) {
  try {
    const result = await getRedisClient().expire(key, seconds);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function getRedisExpire(key) {
  try {
    const result = await getRedisClient().ttl(key);

    return result;
  } catch (error) {
    throw error;
  }
}
