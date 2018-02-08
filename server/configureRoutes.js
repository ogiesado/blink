import { index } from './controllers/index';
import apiV1 from './controllers/api/v1';

/**
 * Configures the server routes
 * @param {Express} server The express server
 * @return {void}
 */
export default function configureRoutes(server) {
  server.get('/', index);

  server.use('/api/v1', apiV1);
}
