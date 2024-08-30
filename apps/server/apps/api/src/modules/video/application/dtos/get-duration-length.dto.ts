// Response DTO
import { createZodDto } from '@anatine/zod-nestjs';
import {
  findVideoBySearchKeywordPickToDate,
  zAnalysedVideoLengthRes,
} from '@dothis/dto';
import { extendApi } from '@anatine/zod-openapi';

export class GetDurationLengthRes extends createZodDto(
  extendApi(zAnalysedVideoLengthRes), // 실제 영상 길이 분석 결과에 대한 스키마 참조
) {}

// Query DTO
export class GetDurationLengthQuery extends createZodDto(
  extendApi(findVideoBySearchKeywordPickToDate), // limit 옵션과 다른 필요한 필드를 스키마에 추가한 것으로 가정
) {
  constructor(props: GetDurationLengthQuery) {
    super();
    Object.assign(this, props);
  }
}

// Main DTO
export class GetDurationLengthDto extends GetDurationLengthQuery {
  constructor(props: GetDurationLengthDto) {
    super(props);
    Object.assign(this, props);
  }
}
