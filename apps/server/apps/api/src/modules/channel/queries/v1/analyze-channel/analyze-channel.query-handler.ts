import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AnalyzeChannelDto } from '@Apps/modules/channel/interface/analyze-channel.interface';
import { ChannelAnalysisRes } from '@dothis/dto';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/event/channel.errors';
import { Err, Ok, Result } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { CHANNEL_HISTORY_OS_DI_TOKEN } from '@Apps/modules/channel_history/constants/channel-history.di-token.constants';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/repository/database/channel-history.outbound.port';
import { CHANNEL_OS_DI_TOKEN } from '@Apps/modules/channel/constants/channel-data.di-token.constants';
import { ChannelQueryHandlerPort } from '@Apps/modules/channel/database/channel.query-handler.port';

@QueryHandler(AnalyzeChannelDto)
export class AnalyzeChannelQueryHandler
  implements
    IQueryHandler<
      AnalyzeChannelDto,
      Result<ChannelAnalysisRes, ChannelNotFoundError>
    >
{
  constructor(
    @Inject(CHANNEL_HISTORY_OS_DI_TOKEN)
    private readonly channelHistory: ChannelHistoryOutboundPort,

    @Inject(CHANNEL_OS_DI_TOKEN)
    protected readonly channelData: ChannelQueryHandlerPort,
  ) {}

  async execute(
    query: AnalyzeChannelDto,
  ): Promise<Result<ChannelAnalysisRes, ChannelNotFoundError>> {
    const { channelId } = query;
    const channel = await this.channelData.findChannelInfo(channelId);
    const channelHistory = await this.channelHistory.findChannelHistoryInfo(
      channelId,
    );

    if (!channel) return Err(new ChannelNotFoundError());
    return Ok({
      channelName: channel.channel_name, // 채널명
      channelHandle: channel.channel_url, // 채널 핸들 (@로 시작하는 그거)
      subscribers: channelHistory.channel_subscribers, // 구독자
      videoCount: channelHistory.channel_total_videos, // 동영상 수
      averageViews: channelHistory.channel_average_views, // 평균조회수
      mainKeywordsAndTags: channel?.channel_tags
        ? channel?.channel_tags.split(',')
        : undefined, // 주사용 키워드 & 태그
    });
  }
}
