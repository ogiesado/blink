import { getRedisClient, REDIS_UPDATE_DETAILS_KEY } from '../../../utils/redis';
import { respondServerError, respondOk } from '../../../utils/http-responses';

export function getUpdateDetails(req, res) {
  getRedisClient()
    .hgetall(REDIS_UPDATE_DETAILS_KEY)
    .then(updateDetails => respondOk(res, updateDetails))
    .catch(error => respondServerError(res, error.message));
}
