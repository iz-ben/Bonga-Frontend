
const SERVER_TAG_BASE = 'https://bonga.or.ke/tag/';
const LOCALHOST_TAG_BASE = 'http://localhost:3000/tag/';

export function getHashtagBase() {
  return process.env.NODE_ENV !== 'production' ? LOCALHOST_TAG_BASE : SERVER_TAG_BASE
}
