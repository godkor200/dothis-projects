import { AwsOpensearchConnetionService } from '@Apps/common/aws/service/aws.opensearch.service';
import { VideoHistoryQueryHandlerPort } from '@Apps/modules/video_history/database/video_history.query-handler.port';
import { FindVideoHistoryResposne } from '@Apps/modules/video_history/interface/find-video.history.resposne';
import { from, lastValueFrom } from 'rxjs';

export class VideoHistoryQueryHandler
  extends AwsOpensearchConnetionService
  implements VideoHistoryQueryHandlerPort
{
  async findVideoHistory(
    videoIds: string[],
    fromDate: string,
    toDate: string,
  ): Promise<FindVideoHistoryResposne[]> {
    console.log(videoIds, fromDate, toDate);
    const searchQuery = {
      index: 'new_video_history',
      body: {
        query: {
          bool: {
            must: [
              {
                terms: {
                  video_id: videoIds,
                },
              },
              {
                range: {
                  video_date: {
                    gte: fromDate + ' 00:00:00', // 시작 날짜 (greater than or equal)
                    lte: toDate + ' 00:00:00', // 종료 날짜 (less than or equal)
                  },
                },
              },
            ],
          },
        },
      },
    };

    const observable$ = from(
      this.client.search(searchQuery).then((res) => res.body.hits.hits),
    );
    return await lastValueFrom(observable$);
  }
}
