import { VideoCacheRecord } from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
import {
  GetRelatedVideoAndVideoHistory,
  GetRelatedVideoAndVideoHistoryPickChannelAverageViews,
} from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { IChannelHistoryByChannelIdRes } from '@Apps/modules/channel-history/domain/ports/channel-history.outbound.port';

export class VideoHelper {
  static mergeVideoData(
    videoCache: VideoCacheRecord,
    channelHistories: IChannelHistoryByChannelIdRes[],
    videoHistories: GetRelatedVideoAndVideoHistory[],
  ): GetRelatedVideoAndVideoHistoryPickChannelAverageViews[] {
    let videos: GetRelatedVideoAndVideoHistoryPickChannelAverageViews[] = [];

    // 1. Cache를 사전 매핑으로 변환
    console.time('사전 매핑 생성 시간');
    const videoIdToChannelMap: { [videoId: string]: string } = {};
    Object.values(videoCache).flatMap((videoList) => {
      videoList.forEach((video) => {
        videoIdToChannelMap[video.videoId] = video.channelId;
      });
    });
    console.timeEnd('사전 매핑 생성 시간');

    // 2. 채널 히스토리를 사전 매핑으로 변환
    console.time('채널 히스토리 사전 매핑 생성 시간');
    const channelIdToAverageViewsMap: { [channelId: string]: number } = {};
    channelHistories.forEach((channelHistory) => {
      channelIdToAverageViewsMap[channelHistory.channelId] =
        channelHistory.channelAverageViews;
    });
    console.timeEnd('채널 히스토리 사전 매핑 생성 시간');

    // 3. 비디오 히스토리를 매핑
    console.time('비디오 히스토리 매핑 시간');
    videoHistories.forEach((videoHistory) => {
      const channelId = videoIdToChannelMap[videoHistory.videoId];
      const channelAverageViews = channelIdToAverageViewsMap[channelId];
      if (channelAverageViews !== undefined) {
        const newVideo = {
          ...videoHistory,
          channelAverageViews,
        };
        videos.push(newVideo);
      }
    });
    console.timeEnd('비디오 히스토리 매핑 시간');

    return videos;
  }
}
