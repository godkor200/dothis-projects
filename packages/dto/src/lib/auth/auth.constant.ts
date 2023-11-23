import { z } from 'zod';
import { USER_AUTH } from '../contract';
import { zError } from '../error';

export const zTokenExpired = zError.merge(
  z.object({
    message: z.enum([
      USER_AUTH.AccessTokenExpired,
      USER_AUTH.RefreshTokenExpired,
    ]),
  }),
);

export type TtokenExpired = z.TypeOf<typeof zTokenExpired>;
