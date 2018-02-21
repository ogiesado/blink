import crypto from 'crypto';
import env from './env';

export default function hash(
  message,
  hashFunction = 'sha256',
  secret = env('APP_KEY'),
  digest = 'hex'
) {
  return crypto
    .createHmac(hashFunction, secret)
    .update(message)
    .digest(digest);
}
