import { IVideoHistory } from '@Apps/modules/video/application/dtos/find-video.os.res';

import { IIncreaseData } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { VideoPrediction, PredictedViews } from '@dothis/dto';
import { PredictionStatus } from '@Apps/modules/video/application/dtos/find-individual-video-info.dto';
import { GetRelatedVideoHistory } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { IFindVideoHistoryResponse } from '@Apps/modules/video-history/application/service/find-video-history.service';
import { DateData } from '@Apps/modules/video/infrastructure/daos/video.res';
import { GetRelatedVideoAndVideoHistory } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
export interface IIncreaseHitsData extends IIncreaseData {
  uniqueVideoCount: number;
}
export class VideoAggregateService {
  /**
   * 평균값 구하는 함수, 소수점 내림
   * @param sum
   * @param index
   * @private
   */
  private static calculateAverageIncrease(sum: number, index: number): number {
    return Math.floor(sum / (index + 1));
  }

  /**
   * 3개월이내 인지 판별하는 함수
   * @param date
   * @private
   */
  private static isWithinThreeMonths(date: Date): boolean {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return date >= threeMonthsAgo;
  }
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
    let result: IIncreaseData[] = [];
    for (let video of videoData) {
      let videoList = video.inner_hits.video_history.hits.hits;

      /*
       * 기존에 정렬이 되어 있으나 만약을 위해서 정렬을 해줌
       * */
      videoList.sort((a, b) =>
        a._source.crawled_date.localeCompare(b._source.crawled_date),
      );

      let prevVideo: IFindVideoHistoryResponse = null;
      let sumViews = 0;
      let sumLikes = 0;
      let sumComments = 0;
      /**
       * 비디오 리스트를 날짜별로 순회
       */
      for (let i = 0; i < videoList.length; i++) {
        if (prevVideo) {
          let video = videoList[i]._source;
          const date = new Date(video.crawled_date).toISOString().split('T')[0]; // Extract only the date part
          /**
           * 증가량의 평균을 계산
           */
          sumViews += video.video_views;
          sumLikes += video.video_likes;
          sumComments += video.video_comments;

          let averageIncreaseViews = this.calculateAverageIncrease(
            sumViews,
            i + 1,
          );
          let averageIncreaseLikes = this.calculateAverageIncrease(
            sumLikes,
            i + 1,
          );
          let averageIncreaseComments = this.calculateAverageIncrease(
            sumComments,
            i + 1,
          );
          /**
           * 증가량을 계산
           */
          const increaseViews =
            video.video_views !== 0
              ? video.video_views - prevVideo.video_views
              : averageIncreaseViews;
          const increaseLikes =
            video.video_likes !== 0
              ? Math.abs(video.video_likes - prevVideo.video_likes)
              : averageIncreaseLikes;
          const increaseComments =
            video.video_comments !== 0
              ? Math.abs(video.video_comments - prevVideo.video_comments)
              : averageIncreaseComments;
          /**
           * 중복 체크를 위한 키값 생성
           */
          if (!result[date]) {
            result[date] = {
              date,
              increase_views: 0,
              increase_likes: 0,
              increase_comments: 0,
            };
          }
          /**
           * 생성되거나 기존에 있는 날짜에 증감을 더함
           */
          result[date].increase_views += increaseViews;
          result[date].increase_likes += increaseLikes;
          result[date].increase_comments += increaseComments;
        }

        prevVideo = { ...videoList[i]._source };
      }
    }
    /**
     * 중복체크를 위해 사용한 key를 버리고 value만 리턴
     */
    return Object.values(result);
  }

  /**
   *
   * @param histories
   * @return {
   *      increase_views: 일일증가 조회수
   *      increase_likes: 일일증가 좋아요수
   *      increase_comments: 일일증가 코맨트수
   * }
   */
  static calculateIncreaseBySource(
    histories: IFindVideoHistoryResponse[],
  ): IIncreaseData[] {
    let result: IIncreaseData[] = [];

    histories.sort((a, b) => a.crawled_date.localeCompare(b.crawled_date));
    let prevVideo: IFindVideoHistoryResponse = null;
    let sumViews = 0;
    let sumLikes = 0;
    let sumComments = 0;
    for (let [i, history] of histories.entries()) {
      /**
       * 비디오 리스트를 날짜별로 순회
       */

      if (prevVideo) {
        const date = new Date(history.crawled_date).toISOString().split('T')[0]; // Extract only the date part
        /**
         * 증가량의 평균을 계산
         */
        sumViews += history.video_views;
        sumLikes += history.video_likes;
        sumComments += history.video_comments;

        let averageIncreaseViews = this.calculateAverageIncrease(
          sumViews,
          i + 1,
        );
        let averageIncreaseLikes = this.calculateAverageIncrease(
          sumLikes,
          i + 1,
        );
        let averageIncreaseComments = this.calculateAverageIncrease(
          sumComments,
          i + 1,
        );
        /**
         * 증가량을 계산
         */
        const increaseViews =
          history.video_views !== 0
            ? history.video_views - prevVideo.video_views
            : averageIncreaseViews;
        const increaseLikes =
          history.video_likes !== 0
            ? Math.abs(history.video_likes - prevVideo.video_likes)
            : averageIncreaseLikes;
        const increaseComments =
          history.video_comments !== 0
            ? Math.abs(history.video_comments - prevVideo.video_comments)
            : averageIncreaseComments;
        /**
         * 중복 체크를 위한 키값 생성
         */

        if (!result[date]) {
          result[date] = {
            date,
            increase_views: 0,
            increase_likes: 0,
            increase_comments: 0,
          };
        }
        /**
         * 생성되거나 기존에 있는 날짜에 증감을 더함
         */
        result[date].increase_views += increaseViews;
        result[date].increase_likes += increaseLikes;
        result[date].increase_comments += increaseComments;
      }

      prevVideo = history;
    }

    return Object.values(result);
  }
  static calculateIncreaseByIgnite(
    histories: GetRelatedVideoHistory[],
  ): IIncreaseHitsData[] {
    let result: {
      [date: string]: IIncreaseHitsData;
    } = {};

    histories.sort(
      (a, b) =>
        new Date(a.year, a.month - 1, a.day).getTime() -
        new Date(b.year, b.month - 1, b.day).getTime(),
    );

    let prevVideo: GetRelatedVideoHistory = null;
    let sumViews = 0;
    let sumLikes = 0;
    let sumComments = 0;

    for (let [i, history] of histories.entries()) {
      if (prevVideo) {
        const date = new Date(history.year, history.month - 1, history.day)
          .toISOString()
          .split('T')[0]; // Extract only the date part

        sumViews += history.videoViews;
        sumLikes += history.videoLikes;
        sumComments += history.videoComments;

        let averageIncreaseViews = sumViews / (i + 1);
        let averageIncreaseLike = sumLikes / (i + 1);
        let averageIncreaseComments = sumComments / (i + 1);

        const increaseViews =
          history.videoViews !== 0
            ? history.videoViews - prevVideo.videoViews
            : averageIncreaseViews;
        const increaseLikes =
          history.videoLikes !== 0
            ? history.videoLikes - prevVideo.videoLikes
            : averageIncreaseLike;
        const increaseComments =
          history.videoComments !== 0
            ? history.videoComments - prevVideo.videoComments
            : averageIncreaseComments;

        if (!result[date]) {
          result[date] = {
            date,
            increaseViews: 0,
            increaseLikes: 0,
            increaseComments: 0,
            uniqueVideoCount: undefined,
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
   */
  static getVideoPrediction(
    postDate: string,
    dailyViewAggregate: IIncreaseData[],
  ): VideoPrediction {
    const date = new Date(postDate);

    if (this.isWithinThreeMonths(date)) {
      return {
        status: PredictionStatus.INSUFFICIENT_DATA,
        dailyViews: null,
      };
    }

    // dailyViewAggregate를 객체로 변환하여 빠른 조회를 가능하게 함
    const dailyViewAggregateMap = dailyViewAggregate.reduce((map, data) => {
      map[data.date] = data.increaseViews;
      return map;
    }, {});

    let predictedViews: PredictedViews[] = [];
    let referenceDate = new Date();
    // 기준 시간을 한국 시간으로 변환
    referenceDate.setHours(referenceDate.getHours() + 9);
    for (let i = 0; i < 7; i++) {
      referenceDate.setDate(referenceDate.getDate() - 7 + i);

      const yyyy = referenceDate.getFullYear().toString();
      const mm = (referenceDate.getMonth() + 1).toString().padStart(2, '0');
      const dd = referenceDate.getDate().toString().padStart(2, '0');

      const formattedDate = `${yyyy}-${mm}-${dd}`;

      // dailyViewAggregateMap에서 빠르게 데이터를 조회
      if (dailyViewAggregateMap.hasOwnProperty(formattedDate)) {
        predictedViews.push({
          date: formattedDate,
          predictedViews: dailyViewAggregateMap[formattedDate],
        });
      }
    }

    return {
      status: PredictionStatus.PREDICTING,
      dailyViews: predictedViews,
    };
  }
  static groupDataByDate<T extends DateData>(
    data: T[],
  ): { [key: string]: T[] } {
    return data.reduce((acc, cur) => {
      const date = `${cur.year}-${String(cur.month).padStart(2, '0')}-${String(
        cur.day,
      ).padStart(2, '0')}`;
      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(cur);
      return acc;
    }, {});
  }

  /**
   * 날짜별로 그룹화된 데이터 배열을 일일조회수 기대조회수를 계산하는 함수
   * @param groupedData 날짜별 그룹화된 객체
   */
  static calculateMetrics(groupedData: {
    [key: string]: GetRelatedVideoAndVideoHistory[];
  }) {
    return Object.entries(groupedData).map(([date, videos]) => {
      const uniqueVideoCount = videos.length;
      let sumViews = 0;
      let prevVideoViews = 0;
      let increaseViews = 0;
      let totalPerformance = 0;
      let maxPerformance = -Infinity;
      let minPerformance = Infinity;

      for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        const { videoViews, channelAverageViews } = video;
        sumViews += videoViews;
        const averageIncreaseViews = sumViews / (i + 1);

        if (channelAverageViews !== 0 && videoViews !== 0) {
          const performance = videoViews / channelAverageViews;
          totalPerformance += performance;

          if (performance > maxPerformance) {
            maxPerformance = performance;
          }
          if (performance < minPerformance) {
            minPerformance = performance;
          }
        }

        if (i > 0) {
          if (video.videoViews !== 0) {
            increaseViews += video.videoViews - prevVideoViews;
          } else {
            increaseViews += averageIncreaseViews;
          }
        } else {
          increaseViews += videoViews;
        }

        prevVideoViews = videoViews;
      }

      return {
        date,
        uniqueVideoCount,
        increaseViews,
        expectedHits: totalPerformance / uniqueVideoCount,
        maxPerformance,
        minPerformance,
      };
    });
  }
}
