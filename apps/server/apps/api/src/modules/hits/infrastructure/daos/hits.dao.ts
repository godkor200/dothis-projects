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
import { GetProbabilitySuccessQuery } from '@Apps/modules/hits/application/dtos/get-probability-success.dto';
import { PickType } from '@nestjs/swagger';
import { GetWeeklyKeywordService } from '@Apps/modules/hits/application/services/get-weekly-keyword.service';
import { GetWeeklyKeywordDto } from '@Apps/modules/hits/application/dtos/get-weekly-keyword.dto';
export type TWeeklyhitsSqlField = z.TypeOf<
  typeof zGetWeeklyViewsQuery.shape.sort
>;

export class SearchRelationVideoAndHistoryDao {
  public from: string;
  public related: string;
  public search: string;
  public to: string;
  public relatedCluster: string[];
  constructor(props: FindDailyViewsV1Dto) {
    Object.assign(this, props);
    this.relatedCluster = props.clusterNumber;
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
interface BaseWeeklyViewsDaoInterface {
  from: string;
  page: number;
  limit: number;
  offset: number;
  sort: TWeeklyhitsSqlField;
  order: TSqlParam;
}
export class GetWeeklyViewsDao extends GetWeeklyViewsDto {}
class BaseWeeklyViewsDao implements BaseWeeklyViewsDaoInterface {
  readonly from: string;
  readonly page: number;
  readonly limit: number;
  readonly offset: number;
  readonly sort: TWeeklyhitsSqlField;
  readonly order: TSqlParam;

  constructor(props: any) {
    this.from = props.from;
    this.page = Number(props.page);
    this.limit = Number(props.limit);
    this.sort = props.sort;
    this.order = props.order;
  }
}

export class GetWeeklyViewsDaoV2 extends BaseWeeklyViewsDao {
  constructor(props: GetWeeklyViewsDtoV2) {
    super(props);
  }
}
// Pick 유틸리티를 사용하여 특정 속성 선택
type SomeWeeklyViewsProps = Pick<
  BaseWeeklyViewsDaoInterface,
  'from' | 'order' | 'sort'
>;
export class GetSomeWeeklyViewsDao {
  public keywords: string[];
  public category: string[];
  public from: string;
  readonly limit: number;
  readonly page: number;
  public order: TSqlParam;
  public sort: TWeeklyhitsSqlField;
  constructor(
    props: SomeWeeklyViewsProps & {
      keywords: string[];
      category: string[];
      page: string;
      limit: string;
    },
  ) {
    this.keywords = props.keywords;
    this.category = props.category;
    this.from = props.from;
    this.page = Number(props.page);
    this.limit = Number(props.limit);
    this.order = props.order;
    this.sort = props.sort;
  }
}
export class GetVideoViewsMatchingSearchOnSpecificDateDao extends GetProbabilitySuccessQuery {
  public readonly relatedCluster: string[];

  public readonly columns?: string[];

  constructor(props: GetVideoViewsMatchingSearchOnSpecificDateDao) {
    super();
    Object.assign(this, props);
  }
}
export class GetWeeklyKeyword extends GetWeeklyKeywordDto {
  constructor(props: GetWeeklyKeywordDto) {
    super(props);
    Object.assign(this, props);
  }
}
