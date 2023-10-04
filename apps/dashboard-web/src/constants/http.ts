export const HTTP_BASE_URL = 'https://www.api.dothis.kr';

export const HTTP_BASE_URL_WITHLOCAL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.api.dothis.kr'
    : 'https://www.api.dothis.kr';
