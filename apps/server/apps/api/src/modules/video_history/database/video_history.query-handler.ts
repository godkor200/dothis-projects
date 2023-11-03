import { AwsOpensearchConnetionService } from '@Apps/common/aws/service/aws.opensearch.service';
import { VideoHistoryQueryHandlerPort } from '@Apps/modules/video_history/database/video_history.query-handler.port';
import { IFindVideoHistoryResposne } from '@Apps/modules/video_history/interface/find-video.history.resposne';
import { OsRes } from '@Apps/common/aws/interface/os.res.interface';

export class VideoHistoryQueryHandler
  extends AwsOpensearchConnetionService
  implements VideoHistoryQueryHandlerPort
{
  async findVideoHistoryFullscan(
    videoIds: string[],
    fromDate: string,
    toDate: string,
    clusterNumber: string,
  ): Promise<IFindVideoHistoryResposne[]> {
    const searchQuery = {
      index: `video-history-${clusterNumber}-*`,
      scroll: '10s',
      size: 10000,
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
                  crawled_date: {
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

    return await this.fullScan<IFindVideoHistoryResposne>(searchQuery);
  }
}
