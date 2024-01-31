import { z } from 'zod';
import { zErrUnauthorized } from '../error.response.zod';

export const zTokenExpired = zErrUnauthorized;

export type TTokenExpired = z.TypeOf<typeof zTokenExpired>;
