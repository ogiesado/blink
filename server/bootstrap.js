import express from 'express';
import helmet from 'helmet';
import { connectToRedis, prepareRedis } from './utils/redis';
import {
  appPublicStorageDir,
  appServerViewsDir,
  appClientBuildDir,
} from './utils/app';
import {
  json as jsonParser,
  urlencoded as urlencodedParser,
  text as textParser,
  raw as rawParser,
} from 'body-parser';
import configureRoutes from './configureRoutes';
import handleNotFound from './middlewares/handleNotFound';
import handleErrors from './middlewares/handleErrors';
import logErrors from './middlewares/logErrors';
import initRequest from './middlewares/initRequest';
import { connectToElastic, prepareElastic } from './utils/elastic';

/**
 * Bootstraps the server
 * @param {Express} server The server app
 * @return {void}
 */
export default (async function bootstrap(server) {
  try {
    const redis = await connectToRedis();

    await prepareRedis();

    const elastic = await connectToElastic();

    await prepareElastic();

    server.set('trust proxy', true);
    server.disable('x-powered-by');

    server.use(helmet());
    server.use(jsonParser());
    server.use(urlencodedParser({ extended: true }));
    server.use(textParser());
    server.use(rawParser());

    server.set('views', appServerViewsDir());
    server.set('view engine', 'ejs');

    server.use('/assets', express.static(appClientBuildDir()));
    server.use('/files', express.static(appPublicStorageDir()));

    server.use(initRequest);

    configureRoutes(server);

    server.use(logErrors);
    server.use(handleErrors);
    server.use(handleNotFound);

    process.on('SIGINT', function() {
      try {
        redis.disconnect();
        elastic.close();
        process.exit(0);
      } catch (error) {
        process.exit(1);
      }
    });
  } catch (error) {
    console.trace(error);
    process.exit(1);
  }
});
