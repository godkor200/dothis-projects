import { VideoAggregateUtils } from '@Apps/modules/video/application/service/helpers/video.aggregate.utils';

import {
  IIncreaseData,
  IIncreaseHits,
  IIncreaseHitsData,
  IIncreaseSetVideoIds,
} from '@Apps/modules/video/application/service/helpers/video.aggregate.type';
import { GetRelatedVideoAndVideoHistoryPickChannelAverageViews } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
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
  /**
   * 일일 조회 수: 각 동영상들의 날짜별 증감에 따른 합계를 구하는 집계 함수입니다.
   * @param videoData
   * @return {
   *      increase_views: 일일증가 조회수
   *      increase_likes: 일일증가 좋아요수
   *      increase_comments: 일일증가 코맨트수
   * }
   */
  static calculateIncrease(videoData: IVideoHistory[]): IIncreaseData[] {
    let result: Record<string, IIncreaseData> = {};
    for (let video of videoData) {
      let videoList = video.inner_hits.video_history.hits.hits.map(
        (hit) => hit._source,
      );
      videoList.sort((a, b) => a.crawled_date.localeCompare(b.crawled_date));

      let prevVideo: IFindVideoHistoryResponse | null = null;
      let sumViews = 0,
        sumLikes = 0,
        sumComments = 0;

      for (let i = 0; i < videoList.length; i++) {
        let currentVideo = videoList[i];
        const date = currentVideo.crawled_date.split('T')[0];

        sumViews += currentVideo.video_views;
        sumLikes += currentVideo.video_likes;
        sumComments += currentVideo.video_comments;

        if (prevVideo) {
          const increaseViews =
            currentVideo.video_views !== 0
              ? currentVideo.video_views - prevVideo.video_views
              : VideoAggregateUtils.calculateAverage(sumViews, i + 1);
          const increaseLikes =
            currentVideo.video_likes !== 0
              ? Math.abs(currentVideo.video_likes - prevVideo.video_likes)
              : VideoAggregateUtils.calculateAverage(sumLikes, i + 1);
          const increaseComments =
            currentVideo.video_comments !== 0
              ? Math.abs(currentVideo.video_comments - prevVideo.video_comments)
              : VideoAggregateUtils.calculateAverage(sumComments, i + 1);

          if (!result[date]) {
            result[date] = {
              date,
              increaseViews: 0,
              increaseLikes: 0,
              increaseComments: 0,
            };
          }

          result[date].increaseViews += increaseViews;
          result[date].increaseLikes += increaseLikes;
          result[date].increaseComments += increaseComments;
        }

        prevVideo = currentVideo;
      }
    }
    return Object.values(result);
  }
  /**
   * opensearch 소스 데이터에 기반하여 각 비디오의 조회수, 좋아요 및 댓글 수 증가를 계산합니다.
   * @param histories - 비디오 히스토리 응답 데이터 배열.
   * @return {
   *      increase_views: 일일증가 조회수
   *      increase_likes: 일일증가 좋아요수
   *      increase_comments: 일일증가 코맨트수
   * }
   */
  static calculateIncreaseBySource(
    histories: IFindVideoHistoryResponse[],
  ): IIncreaseData[] {
    let result: Record<string, IIncreaseData> = {};
    histories.sort((a, b) => a.crawled_date.localeCompare(b.crawled_date));

    let prevVideo: IFindVideoHistoryResponse | null = null;
    let sumViews = 0,
      sumLikes = 0,
      sumComments = 0;

    for (let i = 0; i < histories.length; i++) {
      let history = histories[i];
      const date = history.crawled_date.split('T')[0];

      sumViews += history.video_views;
      sumLikes += history.video_likes;
      sumComments += history.video_comments;

      if (prevVideo) {
        const increaseViews =
          history.video_views !== 0
            ? history.video_views - prevVideo.video_views
            : VideoAggregateUtils.calculateAverage(sumViews, i + 1);
        const increaseLikes =
          history.video_likes !== 0
            ? Math.abs(history.video_likes - prevVideo.video_likes)
            : VideoAggregateUtils.calculateAverage(sumLikes, i + 1);
        const increaseComments =
          history.video_comments !== 0
            ? Math.abs(history.video_comments - prevVideo.video_comments)
            : VideoAggregateUtils.calculateAverage(sumComments, i + 1);

        if (!result[date]) {
          result[date] = {
            date,
            increaseViews: 0,
            increaseLikes: 0,
            increaseComments: 0,
          };
        }

        result[date].increaseViews += increaseViews;
        result[date].increaseLikes += increaseLikes;
        result[date].increaseComments += increaseComments;
      }

      prevVideo = history;
    }

    return Object.values(result);
  }
  /**
   * 목적:
   *  특정 날짜별로 조회수, 좋아요 수, 댓글 수의 증가량을 계산합니다.
   *  날짜별로 고유 비디오 개수를 계산합니다.
   * 주요 기능:
   *  videoHistoryMap을 생성하여 비디오 히스토리를 정렬합니다.
   *  각 날짜별로 조회수, 좋아요 수, 댓글 수의 증가량을 계산합니다.
   *  각 날짜에 대해 고유 비디오 ID를 추적하여 고유 비디오 개수를 계산합니다.
   *  최종적으로 날짜별로 증가량과 고유 비디오 개수를 반환합니다.
   * 일일조회수
   * @param histories
   */
  static calculateIncreaseByIgnite(
    histories: GetRelatedVideoHistory[],
  ): IIncreaseHitsData[] {
    let result: Record<string, IIncreaseHitsData & { videoIds: Set<string> }> =
      {};
    const videoHistoryMap = VideoAggregateUtils.groupBy(
      histories,
      (history) => history.videoId,
    );

    for (let histories of Object.values(videoHistoryMap)) {
      histories = VideoAggregateUtils.sortByDate(histories);

      let prevVideo: GetRelatedVideoHistory | null = null;
      let sumViews = 0,
        sumLikes = 0,
        sumComments = 0;

      for (let i = 0; i < histories.length; i++) {
        let history = histories[i];
        const date = new Date(history.year, history.month - 1, history.day)
          .toISOString()
          .split('T')[0];

        sumViews += history.videoViews;
        sumLikes += history.videoLikes;
        sumComments += history.videoComments;

        if (
          prevVideo &&
          VideoAggregateUtils.isPreviousDay(prevVideo, history)
        ) {
          const { increaseViews, increaseLikes, increaseComments } =
            VideoAggregateUtils.calculateIncreases(
              prevVideo,
              history,
              sumViews,
              sumLikes,
              sumComments,
              i,
            );
          if (!result[date]) {
            result[date] = {
              date,
              increaseViews: 0,
              increaseLikes: 0,
              increaseComments: 0,
              uniqueVideoCount: 0,
              videoIds: new Set<string>(),
            };
          }

          result[date].increaseViews += increaseViews;
          result[date].increaseLikes += increaseLikes;
          result[date].increaseComments += increaseComments;
          result[date].videoIds.add(history.videoId);
        }

        prevVideo = history;
      }
    }

    return Object.values(result).map((data) => {
      const { videoIds, ...rest } = data;
      return {
        ...rest,
        uniqueVideoCount: videoIds.size,
      };
    });
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
    groupedData: GetRelatedVideoAndVideoHistoryPickChannelAverageViews[],
  ): IIncreaseHits[] {
    // 비디오 ID를 기준으로 그룹화
    let videoHistoryMap: {
      [
        videoId: string
      ]: GetRelatedVideoAndVideoHistoryPickChannelAverageViews[];
    } = {};

    for (let video of groupedData) {
      if (!videoHistoryMap[video.videoId]) {
        videoHistoryMap[video.videoId] = [];
      }
      videoHistoryMap[video.videoId].push(video);
    }

    // 각 비디오별로 날짜순으로 정렬
    for (let videoId in videoHistoryMap) {
      videoHistoryMap[videoId].sort(
        (a, b) =>
          new Date(a.year, a.month - 1, a.day).getTime() -
          new Date(b.year, b.month - 1, b.day).getTime(),
      );
    }

    // 날짜별로 그룹화된 데이터에 대해 증가량과 기대조회수 계산
    let result: IIncreaseSetVideoIds[] = [];

    for (let videoId in videoHistoryMap) {
      let videos = videoHistoryMap[videoId];
      let prevVideo: GetRelatedVideoAndVideoHistoryPickChannelAverageViews | null =
        null;
      let sumViews = 0;
      let maxPerformance = -Infinity;
      let minPerformance = Infinity;

      for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        const { videoViews, channelAverageViews, year, month, day } = video;

        const date = new Date(year, month - 1, day).toISOString().split('T')[0];

        // 누락된 데이터가 있으면 해당 날짜 및 이전 날짜 계산을 건너뜀
        if (
          !prevVideo ||
          !VideoAggregateUtils.isPreviousDay(prevVideo, video)
        ) {
          prevVideo = videoViews !== 0 ? video : null;
          continue;
        }

        if (!result[date]) {
          result[date] = {
            date,
            uniqueVideoCount: 0,
            increaseViews: 0,
            expectedHits: 0,
            maxPerformance,
            minPerformance,
            videoIds: new Set<string>(),
          };
        }

        if (channelAverageViews !== 0 && videoViews !== 0) {
          const performance = videoViews / channelAverageViews;
          result[date].expectedHits += performance;

          if (performance > result[date].maxPerformance) {
            result[date].maxPerformance = performance;
          }
          if (performance < result[date].minPerformance) {
            result[date].minPerformance = performance;
          }
          result[date].videoIds.add(video.videoId);
        }

        if (i > 0) {
          if (videoViews !== 0) {
            result[date].increaseViews += videoViews - prevVideo.videoViews;
          } else {
            const averageIncreaseViews = sumViews / (i + 1);
            result[date].increaseViews += averageIncreaseViews;
          }
        } else {
          result[date].increaseViews += videoViews;
        }
        sumViews += videoViews;
        prevVideo = video;
      }
    }

    for (let date in result) {
      result[date].expectedHits =
        result[date].expectedHits / result[date].videoIds.size;
    }

    return Object.values(result).map((data) => {
      const { videoIds, ...rest } = data;
      return {
        ...rest,
        uniqueVideoCount: videoIds.size,
      };
    });
  }
}
