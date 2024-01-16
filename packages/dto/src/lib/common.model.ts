import { z, ZodTypeAny } from 'zod';

/**
 * 기본 날짜 쿼리
 */
export const dateQuery = z.object({ from: z.string(), to: z.string() });
export const zPaginatedQuery = z.object({
  limit: z.number().describe('Specifies a limit of returned records'),
  last: z.string().describe('Last index returned').optional(),
});

export const zSortQuery = (enumElement: Array<string>) => {
  if (!enumElement.length) {
    return z.object(undefined);
  }
  return z.object({
    sort: z.enum([enumElement[0], ...enumElement.slice(1)]).optional(),
    order: z.enum(['asc', 'desc'] as const).optional(),
  });
};

export const zTotalData = z.object({ total: z.number() });

export const dataObject = <T extends ZodTypeAny>(data: T) => z.object({ data });
