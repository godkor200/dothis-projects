import { z, ZodTypeAny } from 'zod';

export const itemObject = <T extends ZodTypeAny>(data: T) =>
  z.object({ item: data }).describe('data object');
