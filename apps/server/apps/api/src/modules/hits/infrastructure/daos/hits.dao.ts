import { FindDailyViewsV1Dto } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import {
  findVideoBySearchKeyword,
  findVideoBySearchKeywordClusterNumber,
  zGetWeeklyViewsQuery,
} from '@dothis/dto';
import {
  GetWeeklyViewsDto,
  GetWeeklyViewsDtoV2,
} from '@Apps/modules/hits/application/dtos/get-weekly-views-list.dto';
import { z } from 'zod';
import { TSqlParam } from '@Apps/modules/story-board/infrastructure/daos/story-board.dao';
import { GetProbabilitySuccessDto } from '@Apps/modules/hits/application/dtos/get-probability-success.dto';
export type TWeeklyhitsSqlField = z.TypeOf<
  typeof zGetWeeklyViewsQuery.shape.sort
>;
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

export class GetWeeklyViewsDao extends GetWeeklyViewsDto {}
export class GetWeeklyViewsDaoV2 {
  readonly from: string;
  readonly page: number;
  readonly limit: number;
  readonly offset: number;
  readonly field: TWeeklyhitsSqlField;
  readonly order: TSqlParam;

  constructor(props: GetWeeklyViewsDtoV2) {
    this.from = props.from;
    this.page = Number(props.page);
    this.limit = Number(props.limit);
    this.field = props.sort;
    this.order = props.order;
  }
}
export class GetVideoViewsMatchingSearchOnSpecificDateDao extends GetProbabilitySuccessDto {
  public readonly relatedCluster: string[];

  constructor(props: GetProbabilitySuccessDto) {
    super(props);
    const propsClusterNumber = !Array.isArray(props.clusterNumber)
      ? [props.clusterNumber]
      : props.clusterNumber;
    this.relatedCluster = propsClusterNumber;
  }
}
