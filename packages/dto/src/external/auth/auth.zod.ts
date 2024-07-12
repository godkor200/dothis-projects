import { z } from 'zod';
import { dataObject, zSuccessBase } from '../../lib';

export const zGetAuthParams = z.object({
  token: z.string().describe('두디스에서 발행한 secret key'),
});

export const zAuthSchema = z.object({ accessToken: z.string() });

export const zAuthData = dataObject(zAuthSchema);

export const zAuthRes = zSuccessBase.merge(zAuthData);
