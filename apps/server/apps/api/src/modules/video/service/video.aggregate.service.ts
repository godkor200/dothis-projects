import {
  IFindVideoIdRes,
  IVideoHistory,
} from '@Apps/modules/video/interface/find-video.os.res';
import { IIncreaseData } from '@Apps/modules/daily_views/queries/v2/find-daily-views/find-daily-views.v2.query-handler';
import { IFindVideoHistoryResponse } from '@Apps/modules/video_history/interface/find-video.history.res';

export class VideoAggregateService {
  /**
   * 일일 조회 수: 각 동영상들의 날짜별 증감에 따른 합계
   * @param videoData
   * @private
   */
  calculateIncrease(videoData: IVideoHistory[]): IIncreaseData[] {
    let result: IIncreaseData[] = [];

    for (let video of videoData) {
      let videoList = video.inner_hits.video_history.hits.hits;
      // Sort the data by 'crawled_date'
      videoList.sort((a, b) =>
        a._source.crawled_date.localeCompare(b._source.crawled_date),
      );

      let prevVideo: IFindVideoHistoryResponse = null;

      for (let i = 0; i < videoList.length; i++) {
        if (prevVideo) {
          let video = videoList[i]._source;
          const date = new Date(video.crawled_date).toISOString().split('T')[0]; // Extract only the date part
          const increaseViews = video.video_views - prevVideo.video_views;
          const increaseLikes = video.video_likes - prevVideo.video_likes;
          const increaseComments =
            video.video_comments - prevVideo.video_comments;

          if (!result[date]) {
            result[date] = {
              date,
              increase_views: 0,
              increase_likes: 0,
              increase_comments: 0,
            };
          }

          result[date].increase_views += increaseViews;
          result[date].increase_likes += increaseLikes;
          result[date].increase_comments += increaseComments;
        }

        prevVideo = { ...videoList[i]._source };
      }
    }

    return Object.values(result);
  }
}
