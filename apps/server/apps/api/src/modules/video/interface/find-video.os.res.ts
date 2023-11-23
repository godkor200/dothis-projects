import { IFindVideoHistoryResponse } from '@Apps/modules/video_history/interface/find-video.history.res';

export interface IFindVideoIDAndChannelIdRes {
  channel_id: string;
  video_id: string;
  video_history?: IFindVideoHistoryResponse[];
}

export interface IFindVideoIdRes
  extends Pick<IFindVideoIDAndChannelIdRes, 'video_history' | 'video_id'> {}
