import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import {
  findVideoBySearchKeyword,
  findVideoBySearchKeywordClusterNumber,
} from '@dothis/dto';

export class GetAnalysisHitsQuery extends createZodDto(
  extendApi(findVideoBySearchKeyword),
) {
  /**
   * GetAnalysisHitsQuery 정의:
   *
   * search: string
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
   *
   **/

  constructor(props: GetAnalysisHitsQuery) {
    super();
    Object.assign(this, props);
  }
}

export class GetAnalysisHitsDto extends GetAnalysisHitsQuery {
  readonly clusterNumber: string[];
  /**
   * GetAnalysisHitsDto 정의:
   *
   * search: string
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
   *
   * clusterNumber: string[]
   * - 클러스터 번호. pathParams를 통해 제공되어야 함.
   */
  constructor(props: GetAnalysisHitsDto) {
    super(props);
    Object.assign(this, props);
  }
}

export class GetAnalysisHitsV2Dto extends GetAnalysisHitsQuery {
  constructor(props: GetAnalysisHitsV2Dto) {
    super(props);
    Object.assign(this, props);
  }
}
