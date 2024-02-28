import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAccumulateVideosV1Dto } from '@Apps/modules/video/application/dtos/find-accumulate-videos.dtos';
import { Inject } from '@nestjs/common';
import {
  IFindAccumulateVideoWithOutUserSection,
  ISection,
  SECTION_NUMBER,
} from '@Apps/modules/video/application/dtos/find-accumulate-videos.interface';
import { Ok, Result } from 'oxide.ts';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel_history/domain/event/channel_history.error';
import { ScrollApiError } from '@Apps/common/aws/domain/aws.os.error';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoQueryHandlerOutboundPort } from '@Apps/modules/video/domain/ports/video.query-handler.outbound.port';

@QueryHandler(FindAccumulateVideosV1Dto)
export class FindAccumulateVideosV1QueryHandler
  implements
    IQueryHandler<
      FindAccumulateVideosV1Dto,
      Result<
        IFindAccumulateVideoWithOutUserSection<ISection[]>,
        | ChannelNotFoundError
        | VideoNotFoundError
        | ChannelHistoryNotFoundError
        | ScrollApiError
      >
    >
{
  constructor(
    @Inject(VIDEO_OS_DI_TOKEN)
    protected readonly video: VideoQueryHandlerOutboundPort,
  ) {}

  /**
   * 연간 조회수 기능
   * @param arg
   */
  async execute(
    arg: FindAccumulateVideosV1Dto,
  ): Promise<
    Result<
      IFindAccumulateVideoWithOutUserSection<ISection[]>,
      | ChannelNotFoundError
      | VideoNotFoundError
      | ChannelHistoryNotFoundError
      | ScrollApiError
    >
  > {
    /**
     * TODO: 비디오 클러스터로 구현
     */

    return Ok({
      videoTotal: 0,
      section: [{ section: SECTION_NUMBER.RANGE_0_100, number: 0 }],
    });
  }
}
