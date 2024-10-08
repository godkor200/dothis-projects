import { Err, Ok, Result } from 'oxide.ts';
import {
  RegisteredChannelContentsDto,
  RegisteredChannelContentsRes,
} from '@Apps/modules/channel/application/dtos/registered-channel-contents.dto';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { VideoListByChannelIdOutboundPort } from '@Apps/modules/video/domain/ports/video.list.by-channel-id.outbound.port';
import { Inject } from '@nestjs/common';
import { VIDEO_LIST_BY_CHANNEL_ID_ADAPTER_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';

export type GetRegisterChannelListResult = Result<
  RegisteredChannelContentsRes,
  VideoNotFoundError
>;
@QueryHandler(RegisteredChannelContentsDto)
export class GetRegisterContentListService
  implements
    IQueryHandler<RegisteredChannelContentsDto, GetRegisterChannelListResult>
{
  constructor(
    @Inject(VIDEO_LIST_BY_CHANNEL_ID_ADAPTER_DI_TOKEN)
    private readonly videoListByChannelIdAdapter: VideoListByChannelIdOutboundPort,
  ) {}
  async execute(
    query: RegisteredChannelContentsDto,
  ): Promise<GetRegisterChannelListResult> {
    try {
      const { channelId, from, search, order, sort } = query;
      const res = await this.videoListByChannelIdAdapter.execute({
        channelId,
        from,
        search,
        sort,
        order,
      });

      if (res.isOk()) {
        const result = res.unwrap().map((ele) => {
          return {
            videoId: ele.video_id,
            videoTitle: ele.video_title,
            videoViews: ele.video_views,
            videoPublished: new Date(ele.video_published),
            videoUseText: ele.use_text,
          };
        });

        return Ok(result);
      }
      return Err(res.unwrapErr());
    } catch (e) {
      return Err(e);
    }
  }
}
