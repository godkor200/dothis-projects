import { WeeklyViewsOutboundPort } from '@Apps/modules/weekly_views/repository/database/weekly-views.outbound.port';
import { AwsOpenSearchConnectionService } from '@Apps/common/aws/service/aws.opensearch.service';
import { GetWeeklyViewsQuery } from '@Apps/modules/weekly_views/dtos/get-weekly-views-list.dto';
import { from, lastValueFrom } from 'rxjs';
export class SearchQueryBuilder {
  static WeeklyViews(index: string, last?: string) {
    let searchQuery = {
      index,
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
  ): Promise<any> {
    const { from: DateForm, to, last } = arg;
    const alias = 'weekly-views*';
    const indexList = await this.getIndices(alias);
    const index = indexList[0].index;
    const searchQuery = SearchQueryBuilder.WeeklyViews(index, last);
    const observable$ = from(
      this.client.search(searchQuery).then((res) => ({
        total: res.body.hits.total,
        data: res.body.hits.hits,
      })),
    );

    return await lastValueFrom(observable$);
  }
}
