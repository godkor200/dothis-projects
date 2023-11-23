import { IFindVideoIdRes } from '@Apps/modules/video/interface/find-video.os.res';
import { IIncreaseData } from '@Apps/modules/daily_views/queries/v2/find-daily-views/find-daily-views.v2.query-handler';

export class VideoAggregateService {
  /**
   * 일일 조회 수: 각 동영상들의 날짜별 증감에 따른 합계
   * @param videoData
   * @private
   */
  calculateIncrease(videoData: IFindVideoIdRes[]): IIncreaseData[] {
    let result: IIncreaseData[] = [];

    for (let video of videoData) {
      // Sort the data by 'crawled_date'
      video.video_history.sort((a, b) =>
        a.crawled_date.localeCompare(b.crawled_date),
      );

      let prevVideo = null;

      for (let i = 0; i < video.video_history.length; i++) {
        if (prevVideo) {
          const date = new Date(video.video_history[i].crawled_date)
            .toISOString()
            .split('T')[0]; // Extract only the date part

          const increaseViews =
            video.video_history[i].video_views - prevVideo.video_views;
          const increaseLikes =
            video.video_history[i].video_likes - prevVideo.video_likes;
          const increaseComments =
            video.video_history[i].video_comments - prevVideo.video_comments;

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

        prevVideo = { ...video.video_history[i] };
      }
    }

    return Object.values(result);
  }
}
