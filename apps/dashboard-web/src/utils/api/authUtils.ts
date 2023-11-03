import {
  HTTP_RESPONSE_ERROR_DATA,
  HTTP_STATUS_CODE,
} from '../../constants/http';

//추 후 백엔드와 Title을 정하여 unAuth 분기처리

/**
 * Access Token이 만료되었는지 여부를 판단
 */
export const isAccessTokenExpired = (statusCode: number) => {
  return statusCode === HTTP_STATUS_CODE.UNAUTHORIZED;
};

/**
 * Refresh Token이 만료되었는지 여부를 판단
 */
export const isRefreshTokenExpired = (statusCode: number, title: string) => {
  const { MESSAGE } = HTTP_RESPONSE_ERROR_DATA.REFRESH_TOKEN_EXPIRED;

  return statusCode === HTTP_STATUS_CODE.UNAUTHORIZED && title === MESSAGE;
};

/**
 * Token이 존재하지 않는지 여부를 판단
 */
export const isTokenNotExist = (statusCode: number, title: string) => {
  const { MESSAGE } = HTTP_RESPONSE_ERROR_DATA.TOKEN_NOT_EXIST;

  return statusCode === HTTP_STATUS_CODE.UNAUTHORIZED && title === MESSAGE;
};

/**
 * Token이 Match 실패했는지 여부를 판단(다른 곳에서 접속했을 때 발생)
 */
export const isTokenNotMatch = (statusCode: number, title: string) => {
  const { MESSAGE } = HTTP_RESPONSE_ERROR_DATA.TOKEN_NOT_MATCH;

  return statusCode === HTTP_STATUS_CODE.UNAUTHORIZED && title === MESSAGE;
};
