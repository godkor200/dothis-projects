import { VideoCacheRecord } from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
import {
  GetRelatedVideoAndVideoHistory,
  GetRelatedVideoAndVideoHistoryPickChannelAverageViews,
} from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { IChannelHistoryByChannelIdRes } from '@Apps/modules/channel-history/domain/ports/channel-history.outbound.port';

export class VideoDataMapper {
  private static videoIdToChannelMapping(videoCache: VideoCacheRecord): {
    [videoId: string]: string;
  } {
    console.time('사전 매핑 생성 시간');
    const videoIdToChannelMap = Object.values(videoCache).reduce(
      (map, videoList) => {
        videoList.forEach((video) => {
          map[video.videoId] = video.channelId;
        });
        return map;
      },
      {} as { [videoId: string]: string },
    );
    console.timeEnd('사전 매핑 생성 시간');
    return videoIdToChannelMap;
  }

  private static channelIdToAverageViewsMapping(
    channelHistories: IChannelHistoryByChannelIdRes[],
  ): { [channelId: string]: Record<string, number> } {
    console.time('채널 히스토리 사전 매핑 생성 시간');
    const channelIdToAverageViewsMap = channelHistories.reduce(
      (map, channelHistory) => {
        const dateKey = `${channelHistory.year}-${channelHistory.month}-${channelHistory.day}`;
        if (!map[channelHistory.channelId]) {
          map[channelHistory.channelId] = {};
        }
        map[channelHistory.channelId][dateKey] =
          channelHistory.channelAverageViews;
        return map;
      },
      {} as { [channelId: string]: Record<string, number> },
    );
    console.timeEnd('채널 히스토리 사전 매핑 생성 시간');
    return channelIdToAverageViewsMap;
  }

  static mergeVideoData(
    videoCache: VideoCacheRecord,
    videoHistories: GetRelatedVideoAndVideoHistory[],
    channelHistories?: IChannelHistoryByChannelIdRes[],
  ): GetRelatedVideoAndVideoHistoryPickChannelAverageViews[] {
    if (!videoHistories.length) {
      console.error('videoHistories is empty');
    }

    const videos: GetRelatedVideoAndVideoHistoryPickChannelAverageViews[] = [];

    // 1. Cache를 사전 매핑으로 변환
    const videoIdToChannelMap = this.videoIdToChannelMapping(videoCache);

    // 2. 채널 히스토리가 있을 경우에만 사전 매핑으로 변환
    if (channelHistories) {
      const channelIdToAverageViewsMap =
        this.channelIdToAverageViewsMapping(channelHistories);

      // 3. 비디오 히스토리를 매핑
      console.time('비디오 히스토리 매핑 시간');
      for (const videoHistory of videoHistories) {
        const channelId = videoIdToChannelMap[videoHistory.videoId];

        if (!channelId) {
          console.warn(
            `No channelId found for videoId: ${videoHistory.videoId}`,
          );
          continue; // 해당 videoId에 대한 channelId가 없는 경우 건너뜁니다.
        }

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
      }
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
    console.log('videoHistories', videoHistories);
    console.log('channelHistories', channelHistories);
    console.log('videoCache', videoCache);
    if (!Object.keys(videoCache).length) {
      console.error('videoCache is empty');
    }

    if (!videoHistories.length) {
      console.error('videoHistories is empty');
    }

    if (!channelHistories.length) {
      console.error('channelHistories is empty');
    }

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
            console.log('videoHistory', videoHistory);

            if (!videoHistory) {
              console.warn(
                `No videoHistory found for videoId: ${video.videoId}`,
              );
              return null;
            }

            const channelId = videoIdToChannelMap[video.videoId];
            console.log('channelId', channelId);
            if (!channelId) {
              console.warn(`No channelId found for videoId: ${video.videoId}`);
              return null; // 채널 ID가 없는 경우 건너뜁니다.
            }

            // Example fix for dateKey creation
            const dateKey = `${videoHistory.year}-${String(
              videoHistory.month,
            ).padStart(2, '0')}-${String(videoHistory.day).padStart(2, '0')}`;

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

            return null;
          })
          .filter(
            Boolean,
          ) as GetRelatedVideoAndVideoHistoryPickChannelAverageViews[];

      // 6. Store the video list for the current keyword
      keywordToVideosMap[keyword] = videosForKeyword;
    }

    console.timeEnd('mergeVideoByRelateWords 시간');

    return keywordToVideosMap;
  }
}
