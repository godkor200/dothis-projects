export interface IFindVideoIDAndChannelIdRes {
  channel_id: string;
  video_id: string;
}

export interface IFindVideoIdRes
  extends Pick<IFindVideoIDAndChannelIdRes, 'video_id'> {}
