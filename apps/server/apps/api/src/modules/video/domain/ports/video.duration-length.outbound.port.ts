import { VideoDurationLengthDao } from '@Apps/modules/video/infrastructure/daos/video.duration-length.dao';
import { Result } from 'oxide.ts';

export type VideoBucket = {
  key: string;
  from: number;
  to: number;
  doc_count: number;
  total_video_views: number;
};

export type VideoDurationLengthResult = Result<VideoBucket[], any>;

export interface VideoDurationLengthOutboundPort {
  execute(dao: VideoDurationLengthDao): Promise<VideoDurationLengthResult>;
}
