import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAnalyzeMyChannel } from '@Apps/modules/channel/application/dtos/analyze-channel.interface';
import { ChannelAnalysisRes } from '@dothis/dto';
import { Err, Ok, Result } from 'oxide.ts';
import { FIND_CHANNEL_EXTEND_HISTORY_IGNITE_DI_TOKEN } from '@Apps/modules/channel/channel-data.di-token.constants';
import { AnalyzeChannelDao } from '@Apps/modules/channel/infrastucture/daos/channel.dao';
import { ChannelAndExtendHistoryOutboundPort } from '@Apps/modules/channel/domain/ports/channel-profile.outbound.port';
import { Inject } from '@nestjs/common';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
export type TAnalyzeChannelRes = Result<
  ChannelAnalysisRes,
  VideoHistoryNotFoundError | TableNotFoundException
>;
@QueryHandler(GetAnalyzeMyChannel)
export class AnalyzeChannelQueryHandler
  implements IQueryHandler<GetAnalyzeMyChannel, TAnalyzeChannelRes>
{
  constructor(
    @Inject(FIND_CHANNEL_EXTEND_HISTORY_IGNITE_DI_TOKEN)
    private readonly channelAndExtendHistory: ChannelAndExtendHistoryOutboundPort,
  ) {}

  async execute(query: GetAnalyzeMyChannel): Promise<TAnalyzeChannelRes> {
    const dao = new AnalyzeChannelDao({ channelId: query.channelId });
    const extendHistory = await this.channelAndExtendHistory.execute(dao);
    if (extendHistory.isErr()) return Err(extendHistory.unwrapErr());
    const unwrap = extendHistory.unwrap()[0];

    return Ok({
      channelName: unwrap.channelName, // 채널명
      channelHandle: unwrap.channelLink, // 채널 핸들 (@로 시작하는 그거)
      subscribers: unwrap.channelSubscribers, // 구독자
      videoCount: unwrap.channelTotalVideos, // 동영상 수
      averageViews: unwrap.channelAverageViews, // 평균조회수
      mainKeywordsAndTags:
        unwrap?.mainlyUsedKeywords && unwrap.mainlyUsedKeywords !== ''
          ? unwrap.mainlyUsedKeywords
              .split(',')
              .map((keyword) => keyword.trim())
          : null,
    });
  }
}
