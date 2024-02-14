import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { IPagingRes } from '@Apps/modules/video/interfaces/find-many-video.interface';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/constants/video.di-token';
import { VideoQueryHandlerOutboundPort } from '@Apps/modules/video/domain/ports/video.query-handler.outbound.port';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { Inject } from '@nestjs/common';
import { Ok, Result, Err } from 'oxide.ts';
import { CHANNEL_OS_DI_TOKEN } from '@Apps/modules/channel/constants/channel-data.di-token.constants';
import { ChannelQueryHandlerPort } from '@Apps/modules/channel/database/channel.query-handler.port';
import { IFindVideoPageV1Dto } from '@Apps/modules/video/application/dtos/find-video-paging.req.dto';
@QueryHandler(IFindVideoPageV1Dto)
export class FindVideoPageQueryHandler
  implements IQueryHandler<IFindVideoPageV1Dto, Result<IPagingRes, Error>>
{
  constructor(
    @Inject(VIDEO_OS_DI_TOKEN)
    protected readonly video: VideoQueryHandlerOutboundPort,

    @Inject(CHANNEL_OS_DI_TOKEN)
    protected readonly channelData: ChannelQueryHandlerPort,
  ) {}
  async execute(
    arg: IFindVideoPageV1Dto,
  ): Promise<Result<IPagingRes, VideoNotFoundError>> {
    const res = await this.video.findVideoPaging({ ...arg });

    if (!res.total.value) return Err(new VideoNotFoundError());

    const videos = await Promise.all(
      res.data.map(async (video) => {
        const channel_name = await this.channelData.findChannelName(
          video._source.channel_id,
        );
        return {
          ...video,
          _source: {
            ...video._source,
            channel_name,
          },
        };
      }),
    );
    const updatedRes = {
      ...res,
      data: videos,
    };

    return Ok(updatedRes);
  }
}
