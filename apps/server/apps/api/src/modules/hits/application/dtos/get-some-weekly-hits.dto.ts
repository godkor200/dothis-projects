import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zGetWeeklyViewsBySomeQuery } from '@dothis/dto';

export class GetSomeWeeklyHitsQuery extends createZodDto(
  extendApi(zGetWeeklyViewsBySomeQuery),
) {
  constructor(props: GetSomeWeeklyHitsQuery) {
    super();
    Object.assign(this, props);
  }
}

export class GetSomeWeeklyHitsDto extends GetSomeWeeklyHitsQuery {
  public keywords: string[];
  constructor(props: GetSomeWeeklyHitsDto) {
    super(props);
    this.keywords = props.keywords;
  }
}
