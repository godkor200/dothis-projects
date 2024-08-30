// Response DTO
import { createZodDto } from '@anatine/zod-nestjs';
import {
  zSubscriberViewAnalysisRes,
  findVideoBySearchKeywordPickToDate,
} from '@dothis/dto'; // 각 zod 스키마는 실제 정의 경로로 설정
import { extendApi } from '@anatine/zod-openapi';

// GetSubscriberViewAnalysisRes는 구독자 구간별 조회수 분석 결과에 대한 스키마 참조
export class GetSubscriberViewAnalysisRes extends createZodDto(
  extendApi(zSubscriberViewAnalysisRes),
) {}

// Query DTO
export class GetSubscriberViewAnalysisQuery extends createZodDto(
  extendApi(findVideoBySearchKeywordPickToDate),
) {
  constructor(props: GetSubscriberViewAnalysisQuery) {
    super();
    Object.assign(this, props);
  }
}

// Main DTO
export class GetSubscriberViewAnalysisDto extends GetSubscriberViewAnalysisQuery {
  constructor(props: GetSubscriberViewAnalysisDto) {
    super(props);
    Object.assign(this, props);
  }
}
