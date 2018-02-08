import { respondWithView } from '../utils/responses';

export function index(req, res) {
  respondWithView(res, 'index');
}
