import { respondWithView } from '../utils/http-responses';

export function indexController(req, res) {
  respondWithView(res, 'index');
}
