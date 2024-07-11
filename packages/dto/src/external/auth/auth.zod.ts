import { z } from 'zod';
import { dataObject, zSuccessBase } from '../../lib';

export const zGetAuthParams = z.object({
  token: z.string().describe('두디스에서 발행한 secret key'),
});
export const zAuthData = dataObject(z.object({ accessToken: z.string() }));

export const zAuthRes = zSuccessBase.merge(zAuthData);
