import {
  IFindVideoHistoryResponse,
  IVideoHistory,
} from '@Apps/modules/video/application/dtos/find-video.os.res';
import { IIncreaseData } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { VideoPrediction, PredictedViews } from '@dothis/dto';
import { PredictionStatus } from '@Apps/modules/video/application/dtos/find-individual-video-info.dto';
import { GetRelatedVideoHistory } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { DateData } from '@Apps/modules/video/infrastructure/daos/video.res';
import { GetRelatedVideoAndVideoHistoryPickChannelAverageViews } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';

export interface IIncreaseHitsData extends IIncreaseData {
  uniqueVideoCount: number;
}
export class VideoAggregateService {
  private static videoHistoryMappingSort(histories: GetRelatedVideoHistory[]): {
    [videoId: string]: GetRelatedVideoHistory[];
  } {
    // 비디오 ID를 기준으로 그룹화
    let videoHistoryMap: { [videoId: string]: GetRelatedVideoHistory[] } = {};

    for (let history of histories) {
      if (!videoHistoryMap[history.videoId]) {
        videoHistoryMap[history.videoId] = [];
      }
      videoHistoryMap[history.videoId].push(history);
    }

    // 각 비디오별로 날짜순으로 정렬
    for (let videoId in videoHistoryMap) {
      videoHistoryMap[videoId].sort(
        (a, b) =>
          new Date(a.year, a.month - 1, a.day).getTime() -
          new Date(b.year, b.month - 1, b.day).getTime(),
      );
    }
    return videoHistoryMap;
  }
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
    let result: {
      [date: string]: IIncreaseHitsData & { videoIds: Set<string> };
    } = {};
    const videoHistoryMap = this.videoHistoryMappingSort(histories);

    for (let histories of Object.values(videoHistoryMap)) {
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
          console.log('current', history, 'prevVideo', prevVideo);
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
              uniqueVideoCount: undefined, //해당 날짜에 산정된 비디오의 수
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

  /**
   * 클러스터 별로 그룹화
   * @param data
   */
  static groupDataByCluster<T extends { videoCluster: number }>(
    data: T[],
  ): { [key: number]: T[] } {
    return data.reduce((acc, cur) => {
      const cluster = cur.videoCluster;
      if (!acc[cluster]) {
        acc[cluster] = [];
      }
      acc[cluster].push(cur);
      return acc;
    }, {});
  }
  /**
   * 클러스터 별로 그룹화 되지 않은 배열을 그룹회
   * @param data
   */
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
   * @param groupedData 날짜별 그룹화된 객체
   */

  static calculateMetrics(groupedData: {
    [key: string]: GetRelatedVideoAndVideoHistoryPickChannelAverageViews[];
  }): {
    date: string;
    uniqueVideoCount: number;
    increaseViews: number;
    expectedHits: number;
    maxPerformance: number;
    minPerformance: number;
  }[] {
    // 비디오 ID를 기준으로 그룹화
    let videoHistoryMap: {
      [
        videoId: string
      ]: GetRelatedVideoAndVideoHistoryPickChannelAverageViews[];
    } = {};

    for (let date in groupedData) {
      for (let video of groupedData[date]) {
        if (!videoHistoryMap[video.videoId]) {
          videoHistoryMap[video.videoId] = [];
        }
        videoHistoryMap[video.videoId].push(video);
      }
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
    let result: {
      date: string;
      uniqueVideoCount: number;
      increaseViews: number;
      expectedHits: number;
      maxPerformance: number;
      minPerformance: number;
      videoIds: Set<string>;
    }[] = [];

    for (let videoId in videoHistoryMap) {
      let videos = videoHistoryMap[videoId];
      let prevVideoViews = 0;
      let sumViews = 0;
      let totalPerformance = 0;
      let maxPerformance = -Infinity;
      let minPerformance = Infinity;

      for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        const { videoViews, channelAverageViews, year, month, day } = video;
        if (prevVideoViews) {
          const date = new Date(year, month - 1, day)
            .toISOString()
            .split('T')[0];

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

          result[date].uniqueVideoCount += 1;

          sumViews += videoViews;
          const averageIncreaseViews = sumViews / (i + 1);

          if (channelAverageViews !== 0 && videoViews !== 0) {
            const performance = videoViews / channelAverageViews;
            totalPerformance += performance;

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
              result[date].increaseViews += videoViews - prevVideoViews;
            } else {
              result[date].increaseViews += averageIncreaseViews;
            }
          } else {
            result[date].increaseViews += videoViews;
          }
        }
        prevVideoViews = videoViews;
      }
      for (let date in result) {
        result[date].expectedHits =
          totalPerformance / result[date].uniqueVideoCount;
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
}
