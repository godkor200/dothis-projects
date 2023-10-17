export const HTTP_BASE_URL = 'https://www.api.dothis.kr';

export const HTTP_BASE_URL_WITHLOCAL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.api.dothis.kr'
    : 'https://www.api.dothis.kr';

export const HTTP_STATUS_CODE = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOTFOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  GATEWAY_TIMEOUT: 504,
} as const;

export const HTTP_RESPONSE_ERROR_DATA = {
  ACCESS_TOKEN_EXPIRED: {
    MESSAGE: 'Access token has expired.',
  },
  REFRESH_TOKEN_EXPIRED: {
    MESSAGE: 'Refresh token has expired.',
  },
  TOKEN_NOT_EXIST: {
    MESSAGE: 'No token provided.',
  },
  TOKEN_NOT_MATCH: {
    MESSAGE: 'Authentication failed',
  },
} as const;
