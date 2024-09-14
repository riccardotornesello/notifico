import crypto from 'crypto';

export function generateRandomString(length) {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
}
