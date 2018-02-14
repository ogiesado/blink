import { indexController } from './controllers/index';
import apiV1Controller from './controllers/api/v1';

/**
 * Configures the server routes
 * @param {Express} server The express server
 * @return {void}
 */
export default function configureRoutes(server) {
  server.get('/', indexController);

  server.use('/api/v1', apiV1Controller);
}
