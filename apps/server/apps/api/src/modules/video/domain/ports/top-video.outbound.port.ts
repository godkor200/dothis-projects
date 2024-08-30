import { Result } from 'oxide.ts';
import { TopVideoDao } from '@Apps/modules/video/infrastructure/daos/top-video.dao';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
export type TopVideoAdapterResult = {
  video_id: string;
  video_views: number;
  video_title: string;
  channel_name: string;
  video_published: string;
};
export type TopVideoResult = Result<
  { items: TopVideoAdapterResult[] },
  VideoNotFoundError
>;

export interface TopVideoOutboundPort {
  execute(dao: TopVideoDao): Promise<TopVideoResult>;
}
