import { getRedisClient } from '../utils/redis';

export function index(req, res) {
  const redis = getRedisClient();

  redis.incr('count').then(count => {
    res.render('index', { count });
  });
}
