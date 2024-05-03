import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zGetWeeklyViewsBySomeQuery } from '@dothis/dto';
import { TSqlParam } from '@Apps/modules/story-board/infrastructure/daos/story-board.dao';

export class GetSomeWeeklyHitsQuery extends createZodDto(
  extendApi(zGetWeeklyViewsBySomeQuery),
) {
  constructor(props: GetSomeWeeklyHitsQuery) {
    super();
    Object.assign(this, props);
  }
}
export interface GetSomeWeeklyHitsQueryInterface {
  from: string;
  limit: string;
  page: string;
  sort?:
    | 'id'
    | 'ranking'
    | 'keyword'
    | 'category'
    | 'weekly_views'
    | 'video_count'
    | 'competitive'
    | 'mega_channel'
    | 'changes'
    | 'YEAR'
    | 'MONTH'
    | 'DAY';
  order?: 'ASC' | 'DESC';
  keywords?: string[];
  categoryNumbers?: string[];
}

export class GetSomeWeeklyHitsDto {
  public limit: string;
  public page: string;
  public from: string;
  public sort?: string;
  public order?: TSqlParam;
  public keywords?: string[];
  public category?: string[];

  constructor(props: GetSomeWeeklyHitsQueryInterface) {
    this.limit = props.limit;
    this.page = props.page;
    this.sort = props.sort;
    this.from = props.from;
    this.order = props.order;
    this.keywords = props.keywords;
    this.category = props.categoryNumbers;
  }
}
