import { respondWithView } from '../utils/http-responses';

export function index(req, res) {
  respondWithView(res, 'index');
}
