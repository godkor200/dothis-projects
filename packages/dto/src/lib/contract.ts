import { initContract } from '@ts-rest/core';
import { z } from 'zod';

/**
 * ref: https://github.com/ts-rest/ts-rest/issues/409
 * 2024/01/31 타입 지정 필요 안하면 오류남........
 */
type ContractInstance = ReturnType<typeof initContract>;
export const c: ContractInstance = initContract();

export const UnauthorizedErrorType = z.enum([
  'Access token has expired.',
  'Refresh token has expired.',
  'No token provided.',
  'Unauthorized token.',
]);

export enum USER_AUTH {
  AccessTokenExpired = 'Access token has expired.',
  RefreshTokenExpired = 'Refresh token has expired.',
  NoTokenProvided = 'No token provided.',
  Unauthorized = 'Unauthorized token.',
}
