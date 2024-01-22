import { z, ZodTypeAny } from 'zod';

export const zSearchKeyword = z
  .object({
    search: z.string().describe('탐색어').default('먹방'),
    related: z
      .string()
      .describe('연관어')
      .default('돼지고기')
      .optional()
      .nullable(),
  })
  .describe('기본 탐색어 연관어 쿼리 형태');

export const zDateQuery = z
  .object({
    from: z.string().describe('언제부터 날짜').default('2023-11-23'),
    to: z.string().describe('까지 날짜').default('2023-11-30'),
  })
  .describe('기본 날짜 쿼리');

export const zPaginatedQuery = z
  .object({
    limit: z.number().describe('리턴되는 레코드의 숫자').default(5),
    last: z.string().describe('마지막 인덱스').optional(),
  })
  .describe('페이지네이션 쿼리');
/**
 * 정렬 쿼리
 * @param enumElement
 */
export const zSortQuery = (enumElement: Array<string>) => {
  // if (!enumElement.length) {
  //   return z.object(undefined);
  // }
  return z
    .object({
      sort: z.enum([enumElement[0], ...enumElement.slice(1)]).optional(),
      order: z.enum(['asc', 'desc'] as const).optional(),
    })
    .describe('소트 쿼리');
};

export const zTotalData = z
  .object({ total: z.number() })
  .describe('토탈 데이터 resp');

export const dataObject = <T extends ZodTypeAny>(data: T) =>
  z.object({ data }).describe('data object');
