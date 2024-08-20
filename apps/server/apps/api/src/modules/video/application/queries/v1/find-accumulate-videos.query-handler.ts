import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAccumulateVideosV1Dto } from '@Apps/modules/video/application/dtos/find-accumulate-videos.dtos';
import { Inject } from '@nestjs/common';
import {
  IFindAccumulateVideoWithOutUserSection,
  ISection,
} from '@Apps/modules/video/application/dtos/find-accumulate-videos.interface';
import { Result } from 'oxide.ts';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel-history/domain/events/channel_history.error';
import { ScrollApiError } from '@Apps/common/opensearch/domain/aws.os.error';
import { VIDEO_GET_ACCUMULATE_IGNITE_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { IRes } from '@Libs/types';
import { FindAccumulateVideoInboundPort } from '@Apps/modules/video/domain/ports/find-accumulate-video.inbound.port';
export type IFindAccumulateVideosV1Res = Result<
  IRes<IFindAccumulateVideoWithOutUserSection<ISection[]>>,
  | ChannelNotFoundError
  | VideoNotFoundError
  | ChannelHistoryNotFoundError
  | ScrollApiError
>;
@QueryHandler(FindAccumulateVideosV1Dto)
export class FindAccumulateVideosV1QueryHandler
  implements
    IQueryHandler<FindAccumulateVideosV1Dto, IFindAccumulateVideosV1Res>
{
  constructor(
    @Inject(VIDEO_GET_ACCUMULATE_IGNITE_DI_TOKEN)
    protected readonly findAccumulateVideo: FindAccumulateVideoInboundPort,
  ) {}

  async execute(
    dto: FindAccumulateVideosV1Dto,
  ): Promise<IFindAccumulateVideosV1Res> {
    return await this.findAccumulateVideo.execute(dto);
  }
}
