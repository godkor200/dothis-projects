import { IFindVideoIdRes } from '@Apps/modules/video/interface/find-video.os.res';

export class VideoDataService {
  filterByDate(
    videos: IFindVideoIdRes[],
    startDate: Date,
    endDate: Date,
  ): IFindVideoIdRes[] {
    return videos.map((video) => {
      let filteredHistory = video.video_history.filter(
        (item) =>
          new Date(startDate) <= new Date(item.crawled_date) &&
          new Date(item.crawled_date) <= new Date(endDate),
      );

      return {
        ...video,
        video_history: filteredHistory,
      };
    });
  }
}
