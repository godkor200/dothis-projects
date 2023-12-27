import {
  IFindVideoIdRes,
  IVideoHistory,
} from '@Apps/modules/video/interface/find-video.os.res';
import { IFindVideoHistoryResponse } from '@Apps/modules/video_history/interface/find-video.history.res';
import { IIncreaseData } from '@Apps/modules/daily_views/dtos/find-daily-views.dtos';

export class VideoAggregateService {
  /**
   * 일일 조회 수: 각 동영상들의 날짜별 증감에 따른 합계를 구하는 집계 함수입니다.
   * @param videoData
   * @private
   */
  calculateIncrease(videoData: IVideoHistory[]): IIncreaseData[] {
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

          let averageIncreaseViews = Math.floor(sumViews / i + 1);
          let averageIncreaseLikes = Math.floor(sumLikes / i + 1);
          let averageIncreaseComments = Math.floor(sumComments / i + 1);
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
}
