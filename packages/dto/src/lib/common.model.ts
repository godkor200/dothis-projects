import { z, ZodTypeAny } from 'zod';

export const zSearchKeyword = z
  .object({
    search: z.string().describe('탐색어').default('먹방'),
    related: z.string().describe('연관어').default('돼지고기'),
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
    limit: z.string().describe('한 페이지에 표시할 데이터의 수').default('5'),
    last: z.string().describe('마지막 인덱스').optional(),
  })
  .describe('페이지네이션 쿼리');
/**
 * 정렬 쿼리
 * @param enumElement
 */

const storyBoardSchemaKey = [
  'id',
  'userId',
  'title',
  'isDraft',
  'createdAt',
  'updatedAt',
] as const;

export const zSortQuery = (enumElement: Array<string>) => {
  // if (!enumElement.length) {
  //   return z.object(undefined);
  // }
  return z
    .object({
      sort: z
        .enum([enumElement[0], ...enumElement.slice(1)])
        .describe(
          '정렬에 사용될 필드 이름을 나타냅니다. 문자열 값을 가질 수 있습니다.',
        )
        .optional(),
      order: z.enum(['asc', 'desc'] as const).optional(),
    })
    .describe('소트 쿼리');
};

export const zSortSqlQuery = z
  .object({
    field: z
      .enum(storyBoardSchemaKey)
      .describe(
        '정렬에 사용될 필드 이름을 나타냅니다. 문자열 값을 가질 수 있습니다.',
      )
      .optional(),
    param: z.enum(['asc', 'desc'] as const).optional(),
  })
  .describe('소트 쿼리');

export const zOrderBy = z.object({
  field: z
    .string()
    .describe(
      '정렬에 사용될 필드 이름을 나타냅니다. 문자열 값을 가질 수 있습니다.',
    ),
  param: z
    .enum(['asc', 'desc'] as const)
    .describe(
      "정렬 방식을 나타냅니다. 'asc'는 오름차순, 'desc'는 내림차순을 의미",
    ),
});

export const zPaginatedSqlQueryParams = z
  .object({
    limit: z.string().describe('한 페이지에 표시할 데이터의 수').default('5'),
    page: z.string().describe('현재 페이지 번호를 나타냅니다.'),
    offset: z.string().describe('건너뛸 데이터의 수를 나타냅니다'),
  })
  .merge(zSortSqlQuery)
  .optional()
  .describe('페이지네이션 쿼리 파라미터');

export const zTotalData = z
  .object({ total: z.number() })
  .describe('토탈 데이터 resp');

export const dataObject = <T extends ZodTypeAny>(data: T) =>
  z.object({ data }).describe('data object');
