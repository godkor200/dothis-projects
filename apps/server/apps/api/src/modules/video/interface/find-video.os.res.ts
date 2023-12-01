import { IFindVideoHistoryResponse } from '@Apps/modules/video_history/interface/find-video.history.res';

export interface IFindVideoIDAndChannelIdRes {
  channel_id: string;
  video_id: string;
  video_history?: IFindVideoHistoryResponse[];
}

export interface IFindVideoIdRes
  extends Pick<IFindVideoIDAndChannelIdRes, 'video_history' | 'video_id'> {}

export function isIFindVideoIDAndChannelIdRes(
  obj: any,
): obj is IFindVideoIDAndChannelIdRes {
  return (
    typeof obj.channel_id === 'string' &&
    typeof obj.video_id === 'string' &&
    Array.isArray(obj.video_history)
  );
}

export function isIFindVideoIdRes(obj: any): obj is IFindVideoIdRes {
  return typeof obj.video_id === 'string' && Array.isArray(obj.video_history);
}
