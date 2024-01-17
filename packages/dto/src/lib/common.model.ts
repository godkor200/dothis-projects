import { z, ZodTypeAny } from 'zod';

/**
 * 탐색어 연관어
 */
export const zSearchKeyword = z.object({
  keyword: z.string().describe('탐색어'),
  related: z.string().describe('연관어').optional(),
});
/**
 * 기본 날짜 쿼리
 */
export const zDateQuery = z.object({ from: z.string(), to: z.string() });

/**
 * 페이지네이션 쿼리
 */
export const zPaginatedQuery = z.object({
  limit: z.number().describe('Specifies a limit of returned records'),
  last: z.string().describe('Last index returned').optional(),
});
/**
 * 정렬 쿼리
 * @param enumElement
 */
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
