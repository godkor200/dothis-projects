import {
  IFindVideoIDAndChannelIdRes,
  IFindVideoIdRes,
} from '@Apps/modules/video/application/dtos/find-video.os.res';

export class VideoDataService {
  filterByDate(
    videos: IFindVideoIdRes[] | IFindVideoIDAndChannelIdRes[],
    startDate: Date,
    endDate: Date,
  ): IFindVideoIdRes[] | IFindVideoIDAndChannelIdRes[] {
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
