// Response DTO
import { createZodDto } from '@anatine/zod-nestjs';
import {
  zChannelFilterAndSortQuery,
  zChannelListResponseObject,
} from '@dothis/dto'; // 각 zod 스키마는 실제 정의 경로로 설정
import { extendApi } from '@anatine/zod-openapi';

// GetChannelListRes는 채널 목록 조회 결과에 대한 스키마 참조
export class GetChannelListRes extends createZodDto(
  extendApi(zChannelListResponseObject),
) {}

// Query DTO
export class GetChannelListQuery extends createZodDto(
  extendApi(zChannelFilterAndSortQuery),
) {
  constructor(props: GetChannelListQuery) {
    super();
    Object.assign(this, props);
  }
}

// Main DTO
export class GetChannelListDto extends GetChannelListQuery {
  constructor(props: GetChannelListDto) {
    super(props);
    Object.assign(this, props);
  }
}
