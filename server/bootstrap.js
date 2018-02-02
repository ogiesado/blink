import express from 'express';
import path from 'path';
import { connectToRedis } from './utils/redis';

/**
 * Bootstraps the server
 * @param {Express} server The server app
 * @return {void}
 */
export default async function bootstrap(server) {

    try {
        const redis = await connectToRedis();
    
        server.use('/assets', express.static('build'));
        server.use('/files', express.static(path.join('storage', 'public')));
            
        server.get('/', (req, res) => {
            redis.incr('count').then(count => {
                res.send(`
                    Hope is not a strategy.  A solid plan is... for sure
                    You decide.
                    Count: ${count}
                `);

            });
        });

        const db = {
            stop(callback) {
                console.log('shutting down db...');
                callback(null);
            }
        };
    
        process.on('SIGINT', function () {
            redis.disconnect();
            db.stop(function (err) {
                process.exit(err ? 1 : 0);
            });
        });
    } catch (error) {
        throw error;
    }
}
