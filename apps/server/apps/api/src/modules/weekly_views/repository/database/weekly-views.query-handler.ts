import { WeeklyViewsOutboundPort } from '@Apps/modules/weekly_views/repository/database/weekly-views.outbound.port';
import { AwsOpenSearchConnectionService } from '@Apps/common/aws/service/aws.opensearch.service';
import {
  GetWeeklyViewsQuery,
  isValidSortQuery,
  SortQueryEnum,
} from '@Apps/modules/weekly_views/dtos/get-weekly-views-list.dto';
import { from, lastValueFrom } from 'rxjs';
import { WeeklyViewsError } from '@Apps/modules/weekly_views/domain/event/weekly-views.error';
import { WeeklyKeywordsRes } from '@Libs/commons/src/interfaces/types/res.types';
import { OrderEnum } from '@Libs/commons/src/interfaces/types/dto.types';

export class SearchQueryBuilder {
  static WeeklyViews(
    index: string,
    limit: string,
    last?: string,
    sort: SortQueryEnum = SortQueryEnum.WEEKLY_VIEWS,
    order: OrderEnum = 'desc',
  ) {
    let searchQuery = {
      index,
      size: Number(limit),
      body: {},
    };
    if (last) searchQuery.body['search_after'] = [last];
    if (sort) searchQuery.body['sort'] = [{ [sort]: { order } }];

    return searchQuery;
  }
}
export class WeeklyViewsQueryHandler
  extends AwsOpenSearchConnectionService
  implements WeeklyViewsOutboundPort
{
  async getPaginatedWeeklyViewsByKeyword(
    arg: GetWeeklyViewsQuery,
  ): Promise<WeeklyKeywordsRes | WeeklyViewsError> {
    const { from: DateForm, limit, last, sort, order } = arg;
    const alias = 'weekly-hits-' + DateForm;
    const indexList = await this.getIndices(alias);
    const index = indexList[0].index;
    if (!indexList && !index) {
      return new WeeklyViewsError(
        WeeklyViewsError.message + 'The date must be set from 01/08/2024.',
      );
    }
    const searchQuery = SearchQueryBuilder.WeeklyViews(
      index,
      limit,
      last,
      isValidSortQuery(sort) ? sort : undefined,
      order,
    );
    const totalDoc = await this.countDocuments(searchQuery);
    if (!totalDoc) return new WeeklyViewsError();
    const observable$ = from(
      this.client.search(searchQuery).then((res) => ({
        total: totalDoc,
        data: res.body.hits.hits,
      })),
    );

    return await lastValueFrom(observable$);
  }
}
