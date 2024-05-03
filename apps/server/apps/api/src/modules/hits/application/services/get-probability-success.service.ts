import { GetProbabilitySuccessInboundPort } from '@Apps/modules/hits/domain/ports/get-probability-success.inbound.port';
import { GetProbabilitySuccessDto } from '@Apps/modules/hits/application/dtos/get-probability-success.dto';
import {
  GetProbabilityRes,
  TGetProbabilityRes,
} from '@Apps/modules/hits/application/queries/get-probability-success.query-handler';
import { IGetVideoViewsMatchingSearchOnSpecificDateOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { Inject } from '@nestjs/common';
import { VIDEO_VIEWS_BY_DATE_KEYWORD_IGNITE_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { GetVideoViewsMatchingSearchOnSpecificDateDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { ChannelHistoryByChannelIdOutboundPort } from '@Apps/modules/channel-history/domain/ports/channel-history.outbound.port';
import { CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN } from '@Apps/modules/channel-history/channel-history.di-token.constants';
import { Err, Ok } from 'oxide.ts';
import { GetVideoViewsMatchingSearchOnSpecificDateRes } from '@Apps/modules/video/infrastructure/daos/video.res';

export class GetProbabilitySuccessService
  implements GetProbabilitySuccessInboundPort
{
  /**
   * 1. 한번의 쿼리로는 지금 현행상태에서는 느림
   * @param getVideoAndChannelViewsByDateAndKeywords VIDEO_CHANNEL_AVERG_VIEWS_BY_DATE_KEYWORD_IGNITE_DI_TOKEN
   */
  constructor(
    @Inject(VIDEO_VIEWS_BY_DATE_KEYWORD_IGNITE_DI_TOKEN)
    private readonly getVideoViewsMatchingSearchOnSpecificDate: IGetVideoViewsMatchingSearchOnSpecificDateOutboundPort,

    @Inject(CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN)
    private readonly getChannelHistoryByChannelId: ChannelHistoryByChannelIdOutboundPort,
  ) {}

  async execute(dto: GetProbabilitySuccessDto): Promise<TGetProbabilityRes> {
    try {
      const videoDataDao = new GetVideoViewsMatchingSearchOnSpecificDateDao({
        relatedCluster: dto.clusterNumber,
        ...dto,
      });

      const videoDataResult =
        await this.getVideoViewsMatchingSearchOnSpecificDate.execute<GetVideoViewsMatchingSearchOnSpecificDateRes>(
          videoDataDao,
        );

      if (videoDataResult.isOk()) {
        const videos = videoDataResult.unwrap();
        const channelIds = videos.map((video) => video.channelId);

        const channelHistoryResult =
          await this.getChannelHistoryByChannelId.execute(channelIds);

        if (channelHistoryResult.isOk()) {
          const channelHistories = channelHistoryResult.unwrap();
          let countAboveAverage = 0;
          let totalVideoCount = videos.length;

          videos.forEach((video) => {
            const channelAverageViews =
              channelHistories.find(
                (channel) => channel.channelId === video.channelId,
              )?.channelAverageViews || 0;
            if (video.videoViews > channelAverageViews) {
              countAboveAverage++;
            }
          });

          const successProbability: GetProbabilityRes = {
            totalVideoCount: totalVideoCount,
            countAboveAverage: countAboveAverage,
          };

          // 결과값으로 총 비디오 갯수와 평균 이상인 비디오의 갯수를 리턴
          return Ok({ success: true, data: successProbability });
        }
        return Err(channelHistoryResult.unwrapErr());
      }
      // 결과를 찾을 수 없거나 오류가 발생한 경우에 대한 처리
      return Err(videoDataResult.unwrapErr());
    } catch (e) {
      return Err(e);
    }
  }
}
