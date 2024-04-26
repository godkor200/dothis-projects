import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ChannelIdDto } from '@Apps/modules/channel/application/dtos/analyze-channel.interface';
import { ChannelAnalysisRes } from '@dothis/dto';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { Err, Ok, Result } from 'oxide.ts';
import { FIND_CHANNEL_EXTEND_HISTORY_IGNITE_DI_TOKEN } from '@Apps/modules/channel/channel-data.di-token.constants';
import { AnalyzeChannelDao } from '@Apps/modules/channel/infrastucture/daos/channel.dao';
import { ChannelAndExtendHistoryOutboundPort } from '@Apps/modules/channel/domain/ports/channel-profile.outbound.port';
import { Inject } from '@nestjs/common';

@QueryHandler(ChannelIdDto)
export class AnalyzeChannelQueryHandler
  implements
    IQueryHandler<
      ChannelIdDto,
      Result<ChannelAnalysisRes, ChannelNotFoundError>
    >
{
  constructor(
    @Inject(FIND_CHANNEL_EXTEND_HISTORY_IGNITE_DI_TOKEN)
    private readonly channelAndExtendHistory: ChannelAndExtendHistoryOutboundPort,
  ) {}

  async execute(
    query: ChannelIdDto,
  ): Promise<Result<ChannelAnalysisRes, ChannelNotFoundError>> {
    const dao = new AnalyzeChannelDao({ channelId: query.channelId });
    const extendHistory = await this.channelAndExtendHistory.execute(dao);
    if (extendHistory.isErr()) return Err(extendHistory.unwrapErr());
    const unwrap = extendHistory.unwrap();
    console.log(unwrap);
    return Ok({
      channelName: unwrap.channel_name, // 채널명
      channelHandle: unwrap.channel_url, // 채널 핸들 (@로 시작하는 그거)
      subscribers: unwrap.channel_subscribers, // 구독자
      videoCount: unwrap.channel_total_videos, // 동영상 수
      averageViews: unwrap.channel_average_views, // 평균조회수
      mainKeywordsAndTags: unwrap?.channel_tags
        ? unwrap?.channel_tags.split(',')
        : undefined, // 주사용 키워드 & 태그
    });
  }
}
