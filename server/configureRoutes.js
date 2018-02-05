import index from './controllers/index';
/**
 * Configures the server routes
 * @param {Express} server The express server
 * @return {void}
 */
export default function configureRoutes(server) {
  server.get('/', index);
}
