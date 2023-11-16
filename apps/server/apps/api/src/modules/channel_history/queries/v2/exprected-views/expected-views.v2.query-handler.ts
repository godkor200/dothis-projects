import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  CHANNEL_DATA_KEY,
  ExpectedViewsQuery,
  ExpectedViewsV2Query,
} from '@Apps/modules/channel_history/dtos/expected-views.dtos';
import { IExpectedData } from '@Apps/modules/channel_history/queries/v1/exprected-views/expected-views.http.controller';
import { Err, Ok, Result } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { IFindVideoIDAndChannelIdRes } from '@Apps/modules/video/interface/find-video.os.res';
import { CHANNEL_HISTORY_OS_DI_TOKEN } from '@Apps/modules/channel_history/constants/channel-history.di-token.constants';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/database/channel-history.outbound.port';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { IChannelExpViewsRes } from '@Apps/modules/channel_history/dtos/expected-views.res';
import { VideoServicePort } from '@Apps/modules/video/database/video.service.port';
import { VIDEO_DATA_KEY } from '@Apps/modules/video/dtos/find-videos.dtos';

@QueryHandler(ExpectedViewsV2Query)
export class ExpectedViewsV2QueryHandler
  implements
    IQueryHandler<
      ExpectedViewsV2Query,
      Result<IExpectedData[], VideoNotFoundError>
    >
{
  constructor(
    @Inject(VIDEO_OS_DI_TOKEN)
    private readonly video: VideoServicePort,

    @Inject(CHANNEL_HISTORY_OS_DI_TOKEN)
    private readonly channelHistory: ChannelHistoryOutboundPort,
  ) {}

  /**
   * 1. video를 다 찾음
   * 2. 선별된 video_id로 video 히스토리를 찾음
   * 3. 채널 히스토리도 찾음
   * 4. 채널, 비디오 히스토리에서 각각 채널아이디, 날짜를 비교해서 맞으면 비디오 히스토리의 조회수/채널의 평균조회수 계산
   * 5. 날짜 별로 계산된 것을 모두 더하고 평균을 내어 리턴
   * @param query
   */
  async execute(
    query: ExpectedViewsV2Query,
  ): Promise<Result<IExpectedData[], VideoNotFoundError>> {
    const arg = {
      ...query,
      data: [
        VIDEO_DATA_KEY.VIDEO_ID,
        VIDEO_DATA_KEY.CHANNEL_ID,
        VIDEO_DATA_KEY.VIDEO_HISTORY,
      ],
    };
    //탐색어 + 관련어 비디오,
    const searchRelatedVideo =
      await this.video.findvideoIdfullScanAndVideos<IFindVideoIDAndChannelIdRes>(
        arg,
      );
    if (!searchRelatedVideo) return Err(new VideoNotFoundError());
    //채널 아이디들이랑, 비디오 아이디를 분리
    const { channelIds, videoIds } = searchRelatedVideo.reduce(
      (acc, e) => {
        acc.channelIds.push(e.channel_id);
        acc.videoIds.push(e.video_id);
        return acc;
      },
      { channelIds: [], videoIds: [] },
    );
    /**
     * 해당날짜의 각 채널의 평균 조회수를 찾기 위해 히스토리를 가져옴, 해당날짜의 각 비디오의 조회수를 알기 위해 비디오 히스토리를 가져옴
     * 병렬처리로 수정
     */
    const [channelHistory] = await Promise.all([
      this.channelHistory.findChannelHistoryFullScan<IChannelExpViewsRes>(
        channelIds,
        [
          CHANNEL_DATA_KEY.CHANNEL_ID,
          CHANNEL_DATA_KEY.CHANNEL_AVERAGE_VIEWS,
          CHANNEL_DATA_KEY.CRAWLED_DATE,
        ],
      ),
    ]);

    return Ok(this.calculateAverageViews(searchRelatedVideo, channelHistory));
  }

  /**
   *   1. 채널, 비디오 히스토리에서 각각 채널아이디, 날짜를 비교해서 맞으면 비디오 히스토리의 조회수/채널의 평균조회수 계산
   *   2. 날짜 별로 계산된 것을 모두 더하고 평균을 내어 리턴
   */
  /**
   * 평균 기대조회수 리턴
   * @param searchRelatedVideo 관계된 비디오들
   * @param channelHistories
   * @private
   */
  private calculateAverageViews(
    searchRelatedVideo: IFindVideoIDAndChannelIdRes[],
    channelHistories: IChannelExpViewsRes[],
  ): IExpectedData[] {
    let startTime = Date.now();
    let dateViewRatios: { [date: string]: { total: number; count: number } } =
      {};

    for (let video of searchRelatedVideo) {
      let channelId = video.channel_id;
      let closestChannel: IChannelExpViewsRes | null = null;

      for (let channelHistory of channelHistories) {
        if (channelHistory.channel_id === channelId) {
          closestChannel = channelHistory;
          break;
        }
      }

      if (closestChannel !== null) {
        for (let videoHistory of video.video_history) {
          let videoViews = videoHistory.video_views;
          let channelAvgViews = closestChannel.channel_average_views;

          if (channelAvgViews !== 0) {
            let viewsRatio = videoViews / channelAvgViews;
            let videoDate = new Date(videoHistory.crawled_date);
            let dateString = `${videoDate.getFullYear()}-${
              videoDate.getMonth() + 1
            }-${videoDate.getDate()}`;

            if (!dateViewRatios[dateString]) {
              dateViewRatios[dateString] = { total: 0, count: 0 };
            }
            dateViewRatios[dateString].total += viewsRatio;
            dateViewRatios[dateString].count += 1;
          }
        }
      }
    }

    let result: IExpectedData[] = [];
    for (let date in dateViewRatios) {
      let averageViewsRatio =
        dateViewRatios[date].total / dateViewRatios[date].count;
      result.push({ date: date, expected_views: averageViewsRatio });
    }
    let endTime = Date.now() - startTime;
    console.log('end', endTime);
    return result;
  }
}
