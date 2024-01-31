import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAccumulateVideosV4Dto } from '@Apps/modules/video/dtos/find-accumulate-videos.dtos';

import {
  IFindAccumulateVideoWithOutUserSection,
  ISection,
  SECTION_NUMBER,
} from '@Apps/modules/video/interfaces/find-accumulate-videos.interface';
import { Ok, Result } from 'oxide.ts';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/event/channel.errors';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel_history/domain/event/channel_history.error';
import { ScrollApiError } from '@Apps/common/aws/domain/aws.os.error';
import { Inject } from '@nestjs/common';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/constants/video.di-token';
import { VideoQueryHandlerOutboundPort } from '@Apps/modules/video/database/video.query-handler.outbound.port';
import { FindVideosDao } from '@Apps/modules/video/database/video.dao';

@QueryHandler(FindAccumulateVideosV4Dto)
export class FindAccumulateVideosV4QueryHandler
  implements
    IQueryHandler<
      FindAccumulateVideosV4Dto,
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
    arg: FindAccumulateVideosV4Dto,
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
     * TODO: video_data 최신 데이터로 구현
     */
    const dao = new FindVideosDao({ cluster: 'data', ...arg });
    const videos = await this.video.findRelatedVideoIdAndChannelIdFullScan(dao);
    console.log(videos);
    /**
     * TODO: 비디오의 채널 id를 통해 channel_history에 채널 구독자수를 불러오는 로직 추가해야됨
     */
    return Ok({
      videoTotal: 0,
      section: [{ section: SECTION_NUMBER.RANGE_0_100, number: 0 }],
    });
  }
}
