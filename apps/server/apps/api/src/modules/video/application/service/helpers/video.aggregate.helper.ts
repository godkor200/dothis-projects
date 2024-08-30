import { VideoAggregateUtils } from '@Apps/modules/video/application/service/helpers/video.aggregate.utils';

import {
  IIncreaseDailyViews,
  IIncreaseData,
  IIncreaseHits,
  IIncreaseHitsData,
  IIncreaseSetVideoIds,
} from '@Apps/modules/video/application/service/helpers/video.aggregate.type';
import { TRangeVideoHistoryResult } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { PredictionStatus } from '@Apps/modules/video/application/dtos/find-individual-video-info.dto';
import { PredictedViews, VideoPrediction } from '@dothis/dto';
import {
  IFindVideoHistoryResponse,
  IVideoHistory,
} from '@Apps/modules/video/application/dtos/find-video.os.res';
import { GetRelatedVideoHistory } from '@Apps/modules/video/infrastructure/daos/video.dao';
/**
 * 비디오 데이터를 집계하고 통계를 계산하는 헬퍼 클래스.
 */
export class VideoAggregateHelper {
  // 공통 로직을 처리하는 헬퍼 함수
  private static processVideoData(
    groupedData: TRangeVideoHistoryResult[],
    callback: (
      video: TRangeVideoHistoryResult,
      prevVideo: TRangeVideoHistoryResult | null,
      currentData: any,
    ) => void,
  ): Map<
    string,
    {
      date: string;
      uniqueVideoCount: number;
      increaseViews: number;
      expectedHits?: number;
      maxPerformance?: number;
      minPerformance?: number;
      videoIds: Set<string>;
    }
  > {
    const videoHistoryMap = new Map<string, TRangeVideoHistoryResult[]>();

    for (const video of groupedData) {
      if (!videoHistoryMap.has(video.video_id)) {
        videoHistoryMap.set(video.video_id, []);
      }
      videoHistoryMap.get(video.video_id)!.push(video);
    }

    const result = new Map<
      string,
      {
        date: string;
        uniqueVideoCount: number;
        increaseViews: number;
        expectedHits?: number;
        maxPerformance?: number;
        minPerformance?: number;
        videoIds: Set<string>;
      }
    >();

    for (const [videoId, videos] of videoHistoryMap) {
      videos.sort(
        (a, b) =>
          new Date(
            parseInt(a.year_c),
            parseInt(a.month_c) - 1,
            parseInt(a.day_c),
          ).getTime() -
          new Date(
            parseInt(b.year_c),
            parseInt(b.month_c) - 1,
            parseInt(b.day_c),
          ).getTime(),
      );

      let prevVideo: TRangeVideoHistoryResult | null = null;

      for (const video of videos) {
        const { video_views, channel_average_views, year_c, month_c, day_c } =
          video;
        const date = `${year_c}-${month_c.padStart(2, '0')}-${day_c.padStart(
          2,
          '0',
        )}`;

        if (!prevVideo || !this.isConsecutiveDay(prevVideo, video)) {
          prevVideo = video_views !== 0 ? video : null;
          continue;
        }

        if (!result.has(date)) {
          result.set(date, {
            date,
            uniqueVideoCount: 0,
            increaseViews: 0,
            expectedHits: 0,
            maxPerformance: -Infinity,
            minPerformance: Infinity,
            videoIds: new Set(),
          });
        }

        const currentData = result.get(date);

        callback(video, prevVideo, currentData);

        prevVideo = video;
      }
    }

    return result;
  }

  /**
   * 히스토리 데이터에 기반하여 비디오의 일일 조회수를 예측합니다.
   * "영상 조회수 성장 예측" 기능은 다음과 같은 기획을 가집니다:
   *
   * 영상 게시일이 3개월 이내인 경우:
   * 이 경우에는 아직 충분한 데이터가 모이지 않았다는 의미로 "데이터가 부족합니다"라는 메시지를 보여주어야 합니다.
   * 영상 게시일이 3개월 이후인 경우:
   * 이 경우에는 영상의 일일 조회수 데이터를 그래프로 보여주며, 이후 7일 동안의 조회수를 예측하여 같은 그래프에 함께 보여줍니다. 예측된 조회수는 다음과 같이 계산됩니다:
   * 계산일 + 1일의 예측 조회수 = 7일 전의 일일 조회수
   * 계산일 + 2일의 예측 조회수 = 6일 전의 일일 조회수
   * 계산일 + 3일의 예측 조회수 = 5일 전의 일일 조회수
   * 계산일 + 4일의 예측 조회수 = 4일 전의 일일 조회수
   * 계산일 + 5일의 예측 조회수 = 3일 전의 일일 조회수
   * 계산일 + 6일의 예측 조회수 = 2일 전의 일일 조회수
   * 계산일 + 7일의 예측 조회수 = 1일 전의 일일 조회수
   * 현재는 단순히 일주일 전의 조회수 데이터를 이용하여 일주일 후를 예측하지만, 조만간 네이버 API를 통해 얻은 "검색량" 데이터를 활용하여 예측 정확도를 향상시킬 예정입니다. 이 때, 검색량은 일주일치의 데이터를 곱하여 사용할 예정입니다.
   * 참고로, 영상이 게시된 후 대략 28일 이후부터는 구독자에 의한 조회가 거의 발생하지 않기 때문에, 조회수의 급격한 상승은 일어나지 않습니다. 그러므로, 대략 3개월 정도의 데이터를 수집한 후에 이 기능을 활성화하는 것이 적절합니다.
   * @param postDate 영상 개시일
   * @param dailyViewAggregate 비디오 일일조회수
   * @param postDate - 비디오가 게시된 날짜.
   * @param dailyViewAggregate - 일일 조회수 집계 데이터 배열.
   * @returns 예측 상태와 예측된 일일 조회수를 포함하는 객체.
   */
  static getVideoPrediction(
    postDate: string,
    dailyViewAggregate: IIncreaseData[],
  ): VideoPrediction {
    const date = new Date(postDate);

    if (VideoAggregateUtils.isWithinThreeMonths(date)) {
      return {
        status: PredictionStatus.INSUFFICIENT_DATA,
        dailyViews: null,
      };
    }
    const dailyViewAggregateMap = dailyViewAggregate.reduce((map, data) => {
      map[data.date] = data.increaseViews;
      return map;
    }, {} as Record<string, number>);

    let predictedViews: PredictedViews[] = [];
    let referenceDate = new Date();
    referenceDate.setHours(referenceDate.getHours() + 9);

    for (let i = 0; i < 7; i++) {
      referenceDate.setDate(referenceDate.getDate() - 7 + i);

      const yyyy = referenceDate.getFullYear().toString();
      const mm = ('0' + (referenceDate.getMonth() + 1)).slice(-2);
      const dd = ('0' + referenceDate.getDate()).slice(-2);

      const key = `${yyyy}-${mm}-${dd}`;
      const weeklyViews = dailyViewAggregateMap[key] || 0;

      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 9);
      currentDate.setDate(currentDate.getDate() + i);

      const currentYear = currentDate.getFullYear();
      const currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2);
      const currentDay = ('0' + currentDate.getDate()).slice(-2);
      const currentFormattedDate = `${currentYear}-${currentMonth}-${currentDay}`;

      predictedViews.push({
        date: currentFormattedDate,
        predictedViews: weeklyViews,
      });
    }

    return {
      status: PredictionStatus.PREDICTING,
      dailyViews: predictedViews,
    };
  }

  // Helper function to check if two dates are consecutive days
  static isConsecutiveDay(
    prev: TRangeVideoHistoryResult,
    current: TRangeVideoHistoryResult,
  ) {
    const prevDate = new Date(
      parseInt(prev.year_c),
      parseInt(prev.month_c) - 1,
      parseInt(prev.day_c),
    );
    const currentDate = new Date(
      parseInt(current.year_c),
      parseInt(current.month_c) - 1,
      parseInt(current.day_c),
    );
    return currentDate.getTime() - prevDate.getTime() === 86400000; // Check if currentDate is exactly one day after prevDate
  }

  static calculateDailyIncreases(
    groupedData: TRangeVideoHistoryResult[],
  ): IIncreaseDailyViews {
    const result = this.processVideoData(
      groupedData,
      (video, prevVideo, currentData) => {
        if (prevVideo) {
          const increaseViews = video.video_views - prevVideo.video_views;
          currentData.increaseViews += increaseViews;
        }

        if (video.channel_average_views !== 0 && video.video_views !== 0) {
          currentData.videoIds.add(video.video_id);
        }
      },
    );

    const data = Array.from(result.values()).map((data) => ({
      date: data.date,
      uniqueVideoCount: data.videoIds.size,
      increaseViews: data.increaseViews,
    }));
    return {
      representativeCategory: this.findLargestCluster(groupedData).videoCluster,
      data,
    };
  }
  /**
   * 날짜별로 그룹화된 데이터 배열을 일일조회수 기대조회수 둘다를 계산하는 함수
   * 목적:
   *  날짜별로 비디오의 조회수 증가량과 기대조회수를 계산합니다.
   *  비디오의 성과(조회수 대비 채널 평균 조회수 비율)를 계산합니다.
   *  날짜별로 최대 및 최소 성과를 추적합니다.
   * 주요 기능:
   *  videoHistoryMap을 생성하여 비디오 히스토리를 비디오 ID별로 그룹화하고 정렬합니다.
   *  각 비디오에 대해 날짜별로 조회수 증가량을 계산합니다.
   *  비디오의 성과를 계산하여 날짜별로 최대 및 최소 성과를 추적합니다.
   *  날짜별로 기대조회수(총 성과를 고유 비디오 수로 나눈 값)를 계산합니다.
   *  최종적으로 날짜별로 조회수 증가량, 기대조회수, 최대 및 최소 성과를 반환합니다
   * sudo:
   *  날짜별로 정렬된 객체를 불러와서 value 값은 비디오의 hitstory를 가지고 계산
   *  2024년 05월 01일 부터 05월 06일까지 산출한다면
   * history를 2024년 04월 30일부터 불러와서 05월 01일과 일일조회수를 계산하고
   * 5/1과 5/2를 뺴서 5/2일짜 일일조회수를 계산하고
   * 5/2과 5/3를 뺴서 5/3일짜 일일조회수를 계산하고
   * 5/3과 5/4를 뺴서 5/4일을 계산하고
   * ...
   * 5/5과 5/6일을 뺴서 5/6일을 계산
   * 예외사항:
   *  만약 5/2 일짜에 데이터가 전부 누락이 되어있다면 계산하지말고 다음 일일조회수날짜로 넘어감
   *  무조건 하루전에 데이터와 뺴서 데일리를 도출해야됨 없으면 건너띄워야됨
   * @param groupedData 날짜별 그룹화된 객체
   */

  static calculateMetrics(
    groupedData: TRangeVideoHistoryResult[],
  ): IIncreaseHits[] {
    const result = this.processVideoData(
      groupedData,
      (video, prevVideo, currentData) => {
        if (prevVideo) {
          const increaseViews = video.video_views - prevVideo.video_views;
          currentData.increaseViews += increaseViews;
        }

        if (video.channel_average_views !== 0 && video.video_views !== 0) {
          const performance = video.video_views / video.channel_average_views;
          currentData.expectedHits += performance;

          currentData.maxPerformance = Math.max(
            currentData.maxPerformance,
            performance,
          );
          currentData.minPerformance = Math.min(
            currentData.minPerformance,
            performance,
          );
          currentData.videoIds.add(video.video_id);
        }
      },
    );

    return Array.from(result.values()).map((data) => ({
      date: data.date,
      uniqueVideoCount: data.videoIds.size,
      increaseViews: data.increaseViews,
      expectedHits: data.videoIds.size
        ? data.expectedHits / data.videoIds.size
        : 0,
      maxPerformance: data.maxPerformance,
      minPerformance: data.minPerformance,
    }));
  }

  /**
   * 제일 관련된 클러스터 찾는 메소드
   * @param groupedData
   */
  static findLargestCluster(groupedData: TRangeVideoHistoryResult[]): {
    videoCluster: number;
    videoCount: number;
  } {
    const clusterMap = new Map<number, Set<string>>();

    for (const video of groupedData) {
      if (!clusterMap.has(video.video_cluster)) {
        clusterMap.set(video.video_cluster, new Set());
      }
      clusterMap.get(video.video_cluster)!.add(video.video_id);
    }

    let largestCluster = { videoCluster: -1, videoCount: 0 };

    for (const [clusterId, videoIds] of clusterMap) {
      if (videoIds.size > largestCluster.videoCount) {
        largestCluster = { videoCluster: clusterId, videoCount: videoIds.size };
      }
    }

    return largestCluster;
  }
}
