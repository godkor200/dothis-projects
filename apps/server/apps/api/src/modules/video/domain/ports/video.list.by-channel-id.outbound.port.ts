import { VideoListByChannelIdDao } from '@Apps/modules/video/infrastructure/daos/video.list-by-channel-id.dao';
import { VideoListByChannelIdAdapterResult } from '@Apps/modules/video/infrastructure/adapters/video.list-by-channel-id.adapter';

export interface VideoListByChannelIdOutboundPort {
  execute(
    dao: VideoListByChannelIdDao,
  ): Promise<VideoListByChannelIdAdapterResult>;
}
