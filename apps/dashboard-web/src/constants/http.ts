export const HTTP_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.api.dothis.kr'
    : 'http://localhost:8080';
