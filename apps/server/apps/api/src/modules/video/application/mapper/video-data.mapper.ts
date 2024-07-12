import { VideoCacheRecord } from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
import {
  GetRelatedVideoAndVideoHistory,
  GetRelatedVideoAndVideoHistoryPickChannelAverageViews,
} from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { IChannelHistoryByChannelIdRes } from '@Apps/modules/channel-history/domain/ports/channel-history.outbound.port';

export class VideoDataMapper {
  private static videoIdToChannelMapping(videoCache: VideoCacheRecord) {
    console.time('사전 매핑 생성 시간');
    const videoIdToChannelMap: { [videoId: string]: string } = {};
    Object.values(videoCache).flatMap((videoList) => {
      videoList.forEach((video) => {
        videoIdToChannelMap[video.videoId] = video.channelId;
      });
    });
    console.timeEnd('사전 매핑 생성 시간');
    return videoIdToChannelMap;
  }

  private static channelIdToAverageViewsMapping(
    channelHistories: IChannelHistoryByChannelIdRes[],
  ) {
    console.time('채널 히스토리 사전 매핑 생성 시간');
    const channelIdToAverageViewsMap: {
      [channelId: string]: Record<string, number>;
    } = {};
    channelHistories.forEach((channelHistory) => {
      const dateKey = `${channelHistory.year}-${channelHistory.month}-${channelHistory.day}`;
      if (!channelIdToAverageViewsMap[channelHistory.channelId]) {
        channelIdToAverageViewsMap[channelHistory.channelId] = {};
      }
      channelIdToAverageViewsMap[channelHistory.channelId][dateKey] =
        channelHistory.channelAverageViews;
    });
    console.timeEnd('채널 히스토리 사전 매핑 생성 시간');
    return channelIdToAverageViewsMap;
  }

  static mergeVideoData(
    videoCache: VideoCacheRecord,
    videoHistories: GetRelatedVideoAndVideoHistory[],
    channelHistories?: IChannelHistoryByChannelIdRes[],
  ): GetRelatedVideoAndVideoHistoryPickChannelAverageViews[] {
    let videos: GetRelatedVideoAndVideoHistoryPickChannelAverageViews[] = [];

    // 1. Cache를 사전 매핑으로 변환
    const videoIdToChannelMap = this.videoIdToChannelMapping(videoCache);
    // 2. 채널 히스토리가 있을 경우에만 사전 매핑으로 변환
    if (channelHistories) {
      const channelIdToAverageViewsMap =
        this.channelIdToAverageViewsMapping(channelHistories);

      // 3. 비디오 히스토리를 매핑
      console.time('비디오 히스토리 매핑 시간');
      videoHistories.forEach((videoHistory) => {
        const channelId = videoIdToChannelMap[videoHistory.videoId];
        const dateKey = `${videoHistory.year}-${videoHistory.month}-${videoHistory.day}`;
        if (
          channelIdToAverageViewsMap[channelId] &&
          channelIdToAverageViewsMap[channelId][dateKey] !== undefined
        ) {
          const channelAverageViews =
            channelIdToAverageViewsMap[channelId][dateKey];
          const newVideo = {
            ...videoHistory,
            channelAverageViews,
          };

          videos.push(newVideo);
        }
      });
      console.timeEnd('비디오 히스토리 매핑 시간');
    }

    return videos;
  }

  static mergeVideoByRelateWords(
    videoCache: VideoCacheRecord,
    channelHistories: IChannelHistoryByChannelIdRes[],
    videoHistories: GetRelatedVideoAndVideoHistory[],
  ): Record<string, GetRelatedVideoAndVideoHistoryPickChannelAverageViews[]> {
    console.time('mergeVideoByRelateWords 시간');

    // 1. Convert cache to a mapping
    const videoIdToChannelMap = this.videoIdToChannelMapping(videoCache);

    // 2. Convert channel histories to a mapping
    const channelIdToAverageViewsMap =
      this.channelIdToAverageViewsMapping(channelHistories);

    // 3. Convert videoHistories to a Map for efficient lookup
    const videoHistoriesMap = new Map<string, GetRelatedVideoAndVideoHistory>(
      videoHistories.map((vh) => [vh.videoId, vh]),
    );

    // 4. Object to store video lists by keyword
    const keywordToVideosMap: Record<
      string,
      GetRelatedVideoAndVideoHistoryPickChannelAverageViews[]
    > = {};

    // 5. Iterate through each keyword in videoCache
    for (const keyword in videoCache) {
      const videosForKeyword: GetRelatedVideoAndVideoHistoryPickChannelAverageViews[] =
        videoCache[keyword]
          .map((video) => {
            const videoHistory = videoHistoriesMap.get(video.videoId);
            if (videoHistory) {
              const channelId = videoIdToChannelMap[video.videoId];
              const dateKey = `${videoHistory.year}-${videoHistory.month}-${videoHistory.day}`;
              if (
                channelIdToAverageViewsMap[channelId] &&
                channelIdToAverageViewsMap[channelId][dateKey] !== undefined
              ) {
                const channelAverageViews =
                  channelIdToAverageViewsMap[channelId][dateKey];
                return {
                  ...videoHistory,
                  channelAverageViews,
                };
              }
            }
            return null;
          })
          .filter(
            (video) => video !== null,
          ) as GetRelatedVideoAndVideoHistoryPickChannelAverageViews[];

      // 6. Store the video list for the current keyword
      keywordToVideosMap[keyword] = videosForKeyword;
    }

    console.timeEnd('mergeVideoByRelateWords 시간');

    return keywordToVideosMap;
  }
}
