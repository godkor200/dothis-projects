import { WeeklyViewsOutboundPort } from '@Apps/modules/weekly_views/repository/database/weekly-views.outbound.port';
import { AwsOpenSearchConnectionService } from '@Apps/common/aws/service/aws.opensearch.service';
import { GetWeeklyViewsQuery } from '@Apps/modules/weekly_views/dtos/get-weekly-views-list.dto';
import { from, lastValueFrom } from 'rxjs';
import { Err, Ok, Result } from 'oxide.ts';
import { WeeklyViewsError } from '@Apps/modules/weekly_views/domain/event/weekly-views.error';
import { WeeklyKeywordsRes } from '@Libs/commons/src/types/res.types';

export class SearchQueryBuilder {
  static WeeklyViews(index: string, limit: number, last?: string) {
    let searchQuery = {
      index,
      size: limit,
      body: {},
    };
    if (last) searchQuery.body['search_after'] = [last];

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
    const { from: DateForm, limit, last } = arg;
    const alias = 'weekly-views-' + DateForm;
    const indexList = await this.getIndices(alias);
    const index = indexList[0].index;
    if (!indexList && !index) {
      return new WeeklyViewsError(
        WeeklyViewsError.message + 'The date must be set from 01/08/2024.',
      );
    }
    const searchQuery = SearchQueryBuilder.WeeklyViews(index, limit, last);
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
