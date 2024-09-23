// Response DTO
import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';
import { zGetVideoTimelineQuery, zGetVideoTimelineResponse } from '@dothis/dto';

export class GetVideoTimelineResult extends createZodDto(
  extendApi(zGetVideoTimelineResponse),
) {}

// Query DTO
export class GetVideoTimelineQuery extends createZodDto(
  extendApi(zGetVideoTimelineQuery),
) {
  constructor(props: GetVideoTimelineQuery) {
    super();
    Object.assign(this, props);
  }
}

// Main DTO
export class GetVideoTimelineDto extends GetVideoTimelineQuery {
  constructor(props: GetVideoTimelineDto) {
    super(props);
    Object.assign(this, props);
  }
}
