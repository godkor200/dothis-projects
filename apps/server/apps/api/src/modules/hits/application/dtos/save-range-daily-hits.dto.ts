import { zAllOptionalSearchKeyword } from '@dothis/dto';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';

export class SaveRangeDailyHitQuery extends createZodDto(
  extendApi(zAllOptionalSearchKeyword),
) {
  /**
   * SaveRangeDailyHitQuery 정의:
   *
   * search: string (optional)
   * - 탐색어. 기본값: '서울'
   *
   * related: string (optional)
   * - 연관어. 기본값: '대구'. 선택적 항목.
   *
   * from: string
   * - 언제부터 날짜. 형식: 'YYYY-MM-DD'. 기본값: '2024-05-01'
   *
   * to: string
   * - 까지 날짜. 형식: 'YYYY-MM-DD'. 기본값: '2024-05-07'
   */
  constructor(props: SaveRangeDailyHitQuery) {
    super();
    Object.assign(this, props);
  }
}

export class SaveRangeDailyHitsDto extends SaveRangeDailyHitQuery {
  /**
   * SaveRangeDailyHitDto 정의:
   *
   * search: string (optional)
   * - 탐색어. 기본값: '서울'
   *
   * related: string (optional)
   * - 연관어. 기본값: '대구'. 선택적 항목.
   *
   * from: string
   * - 언제부터 날짜. 형식: 'YYYY-MM-DD'. 기본값: '2024-05-01'
   *
   * to: string
   * - 까지 날짜. 형식: 'YYYY-MM-DD'. 기본값: '2024-05-07'
   */
  constructor(props: SaveRangeDailyHitsDto) {
    super(props);
    Object.assign(this, props);
  }
}
