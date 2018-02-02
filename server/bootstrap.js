import express from 'express';
import path from 'path';
import helmet from 'helmet';
import { connectToRedis } from './utils/redis';
import { logErrors, errorHandler } from './middlewares/error-handlers';
import { appPublicStorageDir, appServerViewsDir, appClientBuildDir } from './utils/app';

/**
 * Bootstraps the server
 * @param {Express} server The server app
 * @return {void}
 */
export default async function bootstrap(server) {

    try {
        const redis = await connectToRedis();
        
        server.set('trust proxy', true);
        server.disable('x-powered-by');
        server.use(helmet());

        server.set('views', appServerViewsDir());
        server.set('view engine', 'ejs');

        server.use('/assets', express.static(appClientBuildDir()));
        server.use('/files', express.static(appPublicStorageDir()));
            
        server.get('/', (req, res) => {
            redis.incr('count').then(count => {
                res.render('index', { count });

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
