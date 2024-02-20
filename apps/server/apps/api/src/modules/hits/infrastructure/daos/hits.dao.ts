import { FindDailyViewsV1Dto } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import {
  findVideoBySearchKeyword,
  findVideoBySearchKeywordClusterNumber,
} from '@dothis/dto';

export class SearchRelationVideoAndHistoryDao extends createZodDto(
  extendApi(findVideoBySearchKeyword),
) {
  constructor(props: SearchRelationVideoAndHistoryDao) {
    super();
    Object.assign(this, props);
  }
}

export class SearchRelationVideoDao extends SearchRelationVideoAndHistoryDao {
  constructor(props: FindDailyViewsV1Dto) {
    super(props);
    Object.assign(this, props);
  }
}

export class RelatedVideoAndVideoHistoryDao extends createZodDto(
  extendApi(findVideoBySearchKeywordClusterNumber),
) {}
export class RelatedVideoAndCountByDayDao extends createZodDto(
  extendApi(findVideoBySearchKeywordClusterNumber),
) {}
