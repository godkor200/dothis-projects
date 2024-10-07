import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  GetRegisteredChannelDto,
  GetRegisteredChannelRes,
} from '@Apps/modules/channel/application/dtos/register-channel.dto';
import { Inject } from '@nestjs/common';
import {
  CHANNEL_DATA_DI_TOKEN,
  CHANNEL_INFO_ADAPTER_DI_TOKEN,
  CHANNEL_REGISTRATION,
} from '@Apps/modules/channel/channel.di-token';
import { ChannelAnalysisRepositoryPort } from '@Apps/modules/channel/infrastucture/repositories/channel-analysis.repository.port';
import { ChannelInfoOutboundPort } from '@Apps/modules/channel/domain/ports/channel-info.outbound.port';
import { ChannelAdapterOutboundPort } from '@Apps/modules/channel/domain/ports/channel.adapter.port';
import { Err, Ok, Result } from 'oxide.ts';
import {
  ChannelNotFoundError,
  NoRegisteredChannelsError,
} from '@Apps/modules/channel/domain/events/channel.errors';

interface ChannelInfo {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  registeredChannelId: string;
  userId: number;
  channel_name: string;
  channel_total_videos: number;
  channel_subscribers: number;
  channel_average_views: number;
  channel_id: string;
  channel_total_views: number;
  channelThumbnail: string;
}

export type GetRegisteredChannelResult = Result<
  GetRegisteredChannelRes[],
  ChannelNotFoundError | NoRegisteredChannelsError
>;

@QueryHandler(GetRegisteredChannelDto)
export class GetRegisteredChannelService
  implements IQueryHandler<GetRegisteredChannelDto, GetRegisteredChannelResult>
{
  constructor(
    @Inject(CHANNEL_REGISTRATION)
    private readonly channelAnalysisRepository: ChannelAnalysisRepositoryPort,

    @Inject(CHANNEL_INFO_ADAPTER_DI_TOKEN)
    private readonly channelInfoAdapter: ChannelInfoOutboundPort,

    @Inject(CHANNEL_DATA_DI_TOKEN)
    private readonly channelDataInfoAdapter: ChannelAdapterOutboundPort,
  ) {}

  async execute(
    dto: GetRegisteredChannelDto,
  ): Promise<GetRegisteredChannelResult> {
    try {
      const channelList = await this.channelAnalysisRepository.findByUserId(
        dto.userId,
      );
      if (!channelList.length) {
        return Err(new NoRegisteredChannelsError());
      }
      const channelInfoRes: ChannelInfo[] = await Promise.all(
        channelList.map(async (data) => {
          const result = await this.channelInfoAdapter.execute(
            data.registeredChannelId,
          );
          const channelData = await this.channelDataInfoAdapter.execute([
            data.registeredChannelId,
          ]);

          // 성공적인 결과만 반환
          if (result.isOk() && channelData.isOk()) {
            const channelDataUnwrap = channelData.unwrap();

            const channelThumbnail = channelDataUnwrap[0].channelThumbnail;
            return {
              ...data,
              ...result.unwrap()['0'],
              channelThumbnail,
            } as ChannelInfo;
          } else {
            // 이 경우엔 또는 null로 넘기고 후처리에서 필터링
            return null;
          }
        }),
      );

      // null로 넘긴 처리 된 것들은 필터링
      const filteredChannelInfoRes = channelInfoRes
        .filter((info) => info !== null)
        .map((element) => ({
          channelId: element.registeredChannelId,
          channelName: element.channel_name,
          channelThumbnail: element.channelThumbnail,
          channelSubscribers: element.channel_subscribers,
          channelTotalVideos: element.channel_total_videos,
          channelAverageViews: element.channel_total_videos,
        }));

      return Ok(filteredChannelInfoRes);
    } catch (error) {
      return Err(error); // Handle error properly
    }
  }
}
