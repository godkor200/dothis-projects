import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindVideoPageQuery } from '@Apps/modules/video/queries/v1/find-video-paging/find-video-paging.req.dto';
import { IPagingRes } from '@Apps/modules/video/interface/find-many-video.interface';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoServicePort } from '@Apps/modules/video/database/video.service.port';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { Inject } from '@nestjs/common';
import { Ok, Result, Err } from 'oxide.ts';
import { CHANNEL_OS_DI_TOKEN } from '@Apps/modules/channel/constants/channel-data.di-token.constants';
import { ChannelQueryHandlerPort } from '@Apps/modules/channel/database/channel.query-handler.port';
@QueryHandler(FindVideoPageQuery)
export class FindVideoPageQueryHandler
  implements IQueryHandler<FindVideoPageQuery, Result<IPagingRes, Error>>
{
  constructor(
    @Inject(VIDEO_OS_DI_TOKEN)
    protected readonly video: VideoServicePort,

    @Inject(CHANNEL_OS_DI_TOKEN)
    protected readonly channelData: ChannelQueryHandlerPort,
  ) {}
  async execute(
    arg: FindVideoPageQuery,
  ): Promise<Result<IPagingRes, VideoNotFoundError>> {
    const res = await this.video.findVideoPaging(arg);
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
