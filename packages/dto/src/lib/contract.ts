import { initContract } from '@ts-rest/core';

export const c = initContract();

export enum USER_AUTH {
  AccessTokenExpired = 'Access token has expired.',
  RefreshTokenExpired = 'Refresh token has expired.',
  NoTokenProvided = 'No token provided.',
}
