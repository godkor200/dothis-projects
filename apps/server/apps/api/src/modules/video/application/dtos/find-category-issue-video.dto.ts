import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zCategoryIssueVideos } from '@dothis/dto'; // zod 라이브러리 사용

// DTO 클래스들 정의
export class FindCategoryIssueVideoQuery extends createZodDto(
  extendApi(zCategoryIssueVideos),
) {
  constructor(props: FindCategoryIssueVideoQuery) {
    super();
    Object.assign(this, props);
  }
}

export interface FindCategoryIssueVideoParamsInterface {
  categoryNumbers: string[];
}

export class FindCategoryIssueVideoDto
  implements FindCategoryIssueVideoParamsInterface
{
  categoryNumbers: string[];

  constructor(props: FindCategoryIssueVideoParamsInterface) {
    Object.assign(this, props);
  }
}
export interface CategoryIssueVideoQueryParams {
  /**
   * 언제부터 날짜. 형식: 'YYYY-MM-DD'. 기본값: '2024-05-01'
   */
  from: string;

  /**
   * 까지 날짜. 형식: 'YYYY-MM-DD'. 기본값: '2024-05-07'
   */
  to: string;

  /**
   * 페이지 표시할 갯수
   */
  limit: string;

  /**
   * 카테고리 번호 하나 단독, 다수의 카테고리로 페이지네이션 합니다.
   * ex) 4, 93, 14, 13, 57, 5, 43, 1, 10, 45
   */
  categoryNumbers: string[];
}
