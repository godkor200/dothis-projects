import { z } from 'zod';
import { zErrForbidden } from '../error.response.zod';

export const zTokenExpired = zErrForbidden;

export type TTokenExpired = z.TypeOf<typeof zTokenExpired>;
