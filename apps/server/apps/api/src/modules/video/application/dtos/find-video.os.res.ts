import {
  HitList,
  OsRes,
} from '@Apps/common/opensearch/interface/os.res.interface';

export interface IFindVideoHistoryResponse {
  video_id: string;
  video_views: number;
  video_likes: number;
  video_comments: number;
  crawled_date: string;
  channel_id: string;
  performance?: number;
}

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

export interface IVideoHistory
  extends OsRes<
    undefined,
    { video_history: HitList<IFindVideoHistoryResponse> }
  > {}
export enum CHANNEL_DATA {
  'CHANNEL_ID' = 'channel_id',
  'CHANNEL_NAME' = 'channel_name',
  'CHANNEL_URL' = 'channel_url',
  'CHANNEL_DESCRIPTION' = 'channel_description',
  'CHANNEL_SINCE' = 'channel_since',
  'CHANNEL_COUNTRY' = 'channel_country',
  'CHANNEL_LINK' = 'channel_link',
  'CHANNEL_CLUSTER' = 'channel_cluster',
  'CRAWLED_DATE' = 'crawled_date',
  'VIDEO_LIST' = 'video_list',
}
