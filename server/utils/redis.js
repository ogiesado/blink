import Redis from 'ioredis';
import env from './env';

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
export async function connectToRedis({
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
    }

    return new Promise((resolve, reject) => {
        const redis = new Redis(options);

        redis.on('connect', () => {
            client = redis;
            resolve(client);
        });

        redis.on('error', (error) => {
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
