import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { SortOrderQuery as SORT_ENUM, zGetWeeklyViewsQuery } from '@dothis/dto';

export class GetWeeklyViewsQuery extends createZodDto(
  extendApi(zGetWeeklyViewsQuery),
) {}
export class GetWeeklyViewsDto implements GetWeeklyViewsQuery {
  constructor(props: GetWeeklyViewsDto) {
    Object.assign(this, props);
  }
}

/**
 * zod enum은 조드에서 typescript enum 직접적 변환이 어려움
 */
export enum SortQueryEnum {
  KEYWORD = 'keyword',
  CATEGORY = 'category',
  WEEKLY_VIEWS = 'weekly_views',
  VIDEO_COUNT = 'video_count',
  COMPETITIVE = 'competitive',
  MEGA_CHANNEL = 'mega_channel',
  CHANEGES = 'changes',
}

export function isValidSortQuery(query: string): query is SortQueryEnum {
  return Object.values(SortQueryEnum).includes(query as SortQueryEnum);
}
