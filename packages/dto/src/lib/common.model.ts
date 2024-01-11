import { z, ZodTypeAny } from 'zod';

export const zTotalData = z.object({ total: z.number() });

export const dataObject = <T extends ZodTypeAny>(data: T) => z.object({ data });
