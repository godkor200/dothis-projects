import { AwsOpensearchConnetionService } from '@Apps/common/aws/service/aws.opensearch.service';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/database/channel-history.outbound.port';
import { IChannelHistoryRes } from '@Apps/modules/channel_history/dtos/expected-views.res';
import { IFindVideoHistoryResposne } from '@Apps/modules/video_history/interface/find-video.history.resposne';

export class ChannelHistoryQueryHandler
  extends AwsOpensearchConnetionService
  implements ChannelHistoryOutboundPort
{
  /**
   * 채널아이디로 채널의 히스토리를 불러온다.
   * ps: 현재 데이터 안정화 작업이 되지 않았으므로 이전에 데이터를 불러온다.
   * @param channelIds
   */
  async findChannelHistoryFullscan(
    channelIds: string[],
  ): Promise<IChannelHistoryRes[]> {
    let searchQuery = {
      index: `new_channel_history`,
      scroll: '10s',
      size: 10000,
      body: {
        query: {
          bool: {
            must: [
              {
                terms: {
                  channel_id: channelIds,
                },
              },
              /**
               * 지금 new-channel-history 인덱스를 사용하기 때문에 날짜가 의미가 없음
               *
               *
               *
               *
               {
                range: {
                  crawled_date: {
                    gte: fromDate + ' 00:00:00', // 시작 날짜 (greater than or equal)
                    lte: toDate + ' 00:00:00', // 종료 날짜 (less than or equal)
                  },
                },
              }
               */
            ],
          },
        },
      },
    };
    return await this.fullScan<IChannelHistoryRes>(searchQuery);
  }
}
