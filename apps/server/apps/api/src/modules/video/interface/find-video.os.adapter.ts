import { VideoServicePort } from '@Apps/modules/video/database/video.service.port';
import { ExpectedViewsQuery } from '@Apps/modules/channel_history/dtos/expected-views.dtos';
import { OsRes } from '@Apps/common/aws/interface/os.res.interface';

export interface IFindVideoIDAndChannelIdRes {
  channel_id: string;
  video_id: string;
}

export interface FindVideoOsAdapter extends VideoServicePort {
  findVideoIdAndChannelId(
    query: ExpectedViewsQuery,
  ): Promise<OsRes<IFindVideoIDAndChannelIdRes>[]>;
}
