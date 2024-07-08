import { z, ZodTypeAny } from 'zod';

export const zSearchKeyword = z
  .object({
    search: z.string().describe('탐색어').default('서울'),
    related: z.string().describe('연관어 optional').default('대구').optional(),
  })
  .describe('기본 탐색어 연관어 쿼리 형태');

export const zDateQuery = z
  .object({
    from: z.string().describe('언제부터 날짜').default('2024-05-01'),
    to: z.string().describe('까지 날짜').default('2024-05-07'),
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
// 카멜케이스를 스네이크 케이스로 변환하는 함수
const camelToSnakeCase = (str: string) =>
  // 대문자로만 구성된 단어는 변환하지 않음
  /^[A-Z]+$/.test(str)
    ? str
    : // 카멜케이스를 스네이크 케이스로 변환
      str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const zSortQuery = (enumElement: Array<string>) => {
  // if (!enumElement.length) {
  //   return z.object(undefined);
  // }
  const snakeCaseEnumElement = enumElement.map(camelToSnakeCase);
  return z
    .object({
      sort: z
        .enum([snakeCaseEnumElement[0], ...snakeCaseEnumElement.slice(1)])
        .describe(
          '정렬에 사용될 필드 이름을 나타냅니다. 문자열 값을 가질 수 있습니다.',
        )
        .default(snakeCaseEnumElement[0])
        .optional(),
      order: z
        .enum(['asc', 'desc', 'ASC', 'DESC'] as const)
        .default('asc')
        .optional(),
    })
    .describe('소트 쿼리');
};

export const zPaginatedOffsetQuery = z
  .object({
    limit: z.string().describe('한 페이지에 표시할 데이터의 수').default('5'),
    page: z.string().describe('현재 페이지 번호를 나타냅니다.').default('1'),
  })
  .describe('페이지네이션 쿼리 파라미터');

export const zPaginatedIgniteQueryParams = zSearchKeyword
  .merge(zPaginatedOffsetQuery)
  .merge(zDateQuery);

export const zPaginatedIgniteQuerySort = zPaginatedIgniteQueryParams.merge(
  zSortQuery(['videoViews']),
);

export const zTotalData = z
  .object({ total: z.number() })
  .describe('토탈 데이터 resp');

export const zWeeklyKeywordData = z.object({
  count: z.number(),
  limit: z.number(),
  page: z.number(),
});

export const dataObject = <T extends ZodTypeAny>(data: T) =>
  z.object({ data }).describe('data object');

export const zClustersObject = <T extends ZodTypeAny>(data: T) =>
  z
    .object({ clusterNumber: z.number(), data: data })
    .describe('clusters object');

export const zClusterNumber = z.object({
  clusterNumber: z
    .string()
    .default('4, 93, 14, 13, 57, 5, 43, 1, 10, 45')
    .describe('찾을 대상의 클러스터 번호 값을 입력받습니다.'),
});

export const zClusterNumberMulti = z.object({
  clusterNumber: z
    .string()
    .default('4, 93, 14, 13, 57, 5, 43, 1, 10, 45')
    .describe(
      '클러스터 번호 하나 단독, 다수의 클러스터로 페이지네이션 합니다. ex) 4, 93, 14, 13, 57, 5, 43, 1, 10, 45 ',
    ),
});
export const zKeywordsMulti = z.object({
  keywords: z
    .string()
    .default('캠핑,캠퍼,설악산')
    .describe('키워드 하나 단독, 다수로 필터링합니다. ex) 캠핑,캠퍼,설악산'),
});

export const zCategoryNumberMulti = z.object({
  categoryNumbers: z
    .string()
    .default('4, 93, 14, 13, 57, 5, 43, 1, 10, 45')
    .describe(
      '카테고리 번호 하나 단독, 다수의 카테고리로 페이지네이션 합니다. ex) 4, 93, 14, 13, 57, 5, 43, 1, 10, 45 ',
    ),
});
export const zAuth = z.object({
  Authorization: z
    .string()
    .describe("우리 사이트 accessToken(ex:'Bearer ~~~~~~')")
    .optional(),
});
export const zOnlyLimit = zPaginatedQuery.pick({ limit: true });
