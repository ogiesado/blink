import express from 'express';
import path from 'path';
import { connectToRedis } from './utils/redis';
import { logErrors, errorHandler } from './middlewares/error-handlers';

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

        server.use(logErrors);
        server.use(errorHandler);
    
        process.on('SIGINT', function () {
            try {
                redis.disconnect();
                process.exit(0);
            } catch (error) {
                process.exit(1);
            }
        });

    } catch (error) {
        throw error;
    }
}
