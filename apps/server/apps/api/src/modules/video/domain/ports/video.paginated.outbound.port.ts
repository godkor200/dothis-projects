import { VideoPaginatedDao } from '@Apps/modules/video/infrastructure/daos/video.paginated.dao';
import { Result } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
export type VideoPaginatedAdapterResult = {
  video_id: string;
  video_views: number;
};
export type VideoPaginatedResult = Result<
  { total: number; items: VideoPaginatedAdapterResult[] },
  VideoNotFoundError
>;

export interface IGetVideoPaginatedOutboundPort {
  execute(dao: VideoPaginatedDao): Promise<VideoPaginatedResult>;
}
