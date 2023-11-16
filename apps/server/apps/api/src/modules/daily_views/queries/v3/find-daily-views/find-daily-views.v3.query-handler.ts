import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import {
  FindDailyViewsQuery,
  FindDailyViewsV3Query,
} from '@Apps/modules/daily_views/dtos/find-daily-views.dtos';
import { VIDEO_HISTORY_OS_DI_TOKEN } from '@Apps/modules/video_history/video_history.di-token';
import { FindVideoHistoryOsAdapter } from '@Apps/modules/video_history/interface/find-video-history.os.adapter';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { VideoHistoryNotFoundError } from '@Apps/modules/video_history/domain/event/video_history.err';
import { Err, Ok, Result } from 'oxide.ts';
import { VideoServicePort } from '@Apps/modules/video/database/video.service.port';

import {
  FindVideoDateQuery,
  VIDEO_DATA_KEY,
} from '@Apps/modules/video/dtos/find-videos.dtos';
import { IFindVideoIdRes } from '@Apps/modules/video/interface/find-video.os.res';

export interface IIncreaseData {
  date: string;
  increase_views: number;
  increase_likes: number;
  increase_comments: number;
}
@QueryHandler(FindDailyViewsV3Query)
export class FindDailyViewsQueryOsV3Handler
  implements
    IQueryHandler<
      FindDailyViewsQuery,
      Result<IIncreaseData[], VideoNotFoundError | VideoHistoryNotFoundError>
    >
{
  constructor(
    @Inject(VIDEO_OS_DI_TOKEN)
    private readonly video: VideoServicePort,
  ) {}

  async execute(
    query: FindDailyViewsQuery,
  ): Promise<
    Result<IIncreaseData[], VideoNotFoundError | VideoHistoryNotFoundError>
  > {
    const arg: FindVideoDateQuery = {
      ...query,
      data: [VIDEO_DATA_KEY.VIDEO_ID, VIDEO_DATA_KEY.VIDEO_HISTORY],
    };
    const videos =
      await this.video.findvideoIdfullScanAndVideos<IFindVideoIdRes>(arg);
    if (!videos) return Err(new VideoNotFoundError());

    return Ok(this.calculateIncrease(videos));
  }

  /**
   * 일일 조회 수: 각 동영상들의 날짜별 증감에 따른 합계
   * @param videoData
   * @private
   */
  private calculateIncrease(videoData: IFindVideoIdRes[]): IIncreaseData[] {
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
