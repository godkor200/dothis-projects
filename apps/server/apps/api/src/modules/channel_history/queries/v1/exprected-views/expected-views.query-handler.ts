import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExpectedViewsQuery } from '@Apps/modules/channel_history/dtos/expected-views.dtos';
import { IExpectedData } from '@Apps/modules/channel_history/queries/v1/exprected-views/expected-views.http.controller';
import { Err, Ok, Result } from 'oxide.ts';
import { Inject, NotFoundException } from '@nestjs/common';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import {
  FindVideoOsAdapter,
  IFindVideoIDAndChannelIdRes,
} from '@Apps/modules/video/interface/find-video.os.adapter';
import { VIDEO_HISTORY_OS_DI_TOKEN } from '@Apps/modules/video_history/video_history.di-token';
import { VideoHistoryQueryHandlerPort } from '@Apps/modules/video_history/database/video_history.query-handler.port';
import { CHANNEL_HISTORY_OS_DI_TOKEN } from '@Apps/modules/channel_history/constants/channel-history.di-token.constants';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/database/channel-history.outbound.port';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { IChannelHistoryRes } from '@Apps/modules/channel_history/dtos/expected-views.res';
import { IFindVideoHistoryResposne } from '@Apps/modules/video_history/interface/find-video.history.resposne';
import { OsRes } from '@Apps/common/aws/interface/os.res.interface';

@QueryHandler(ExpectedViewsQuery)
export class ExpectedViewsQueryHandler
  implements
    IQueryHandler<
      ExpectedViewsQuery,
      Result<IExpectedData[], VideoNotFoundError>
    >
{
  constructor(
    @Inject(VIDEO_OS_DI_TOKEN)
    private readonly video: FindVideoOsAdapter,

    @Inject(VIDEO_HISTORY_OS_DI_TOKEN)
    private readonly videoHistory: VideoHistoryQueryHandlerPort,

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
    query: ExpectedViewsQuery,
  ): Promise<Result<IExpectedData[], VideoNotFoundError>> {
    //탐색어 + 관련어 비디오,
    const searchRelatedVideo = await this.video.findVideoIdAndChannelId(query);
    if (!searchRelatedVideo) return Err(new VideoNotFoundError());
    //채널 아이디들이랑, 비디오 아이디를 분리
    const { channelIds, videoIds } = searchRelatedVideo.reduce(
      (acc, e) => {
        acc.channelIds.push(e._source.channel_id);
        acc.videoIds.push(e._source.video_id);
        return acc;
      },
      { channelIds: [], videoIds: [] },
    );

    //해당날짜의 각 채널의 평균 조회수를 찾기 위해 히스토리를 가져옴
    const channelHistory = await this.channelHistory.findChannelHistory(
      channelIds,
    );
    //해당날짜의 각 비디오의 조회수를 알기 위해 비디오 히스토리를 가져옴
    const videoHistory = await this.videoHistory.findVideoHistory(
      videoIds,
      query.from.toString(),
      query.to.toString(),
      query.clusterNumber,
    );

    return Ok(
      this.calculateAverageViews(
        searchRelatedVideo,
        channelHistory,
        videoHistory,
      ),
    );
  }
  private calculateAverageViews(
    searchRelatedVideo: OsRes<IFindVideoIDAndChannelIdRes>[],
    channelHistories: OsRes<IChannelHistoryRes>[],
    videoHistories: OsRes<IFindVideoHistoryResposne>[],
  ): IExpectedData[] {
    let dateViewRatios: { [date: string]: { total: number; count: number } } =
      {};

    // 선별된 video_id로 video 히스토리를 찾음
    for (let videoHistory of videoHistories) {
      let videoId = videoHistory._source.video_id;
      let videoDate = new Date(videoHistory._source.crawled_date)
        .toISOString()
        .split('T')[0]; // Get the date part
      let closestChannel: any = null;
      let closestDateDifference: number = 0;

      // videoData에서 해당 channelId를 가진 비디오를 찾습니다.
      let matchedVideoData = searchRelatedVideo.find(
        (videoData) => videoData._source.video_id === videoId,
      );

      if (!matchedVideoData) continue; // 일치하는 비디오 데이터가 없다면 다음 비디오로 넘어갑니다.
      let matchedChannelId = matchedVideoData._source.channel_id;
      // 채널 히스토리에서 각각 채널아이디를 비교해서 맞으면 비디오 히스토리의 조회수/채널의 평균조회수 계산
      for (let channelHistory of channelHistories) {
        let channelId = channelHistory._source.channel_id;
        let channelDate = new Date(channelHistory._source.crawled_date);
        let dateDifference = Math.abs(
          new Date(videoDate).getTime() - channelDate.getTime(),
        );
        //채널 히스토리는 일주일 단위로 크롤링하기 때문에 데이터를 불러온 기간중에서 가장 가까운 크롤링 날짜로 평균조회수를 불러옴
        if (
          matchedChannelId === channelId &&
          (closestChannel === null || dateDifference < closestDateDifference)
        ) {
          closestChannel = channelHistory;
          closestDateDifference = dateDifference;
        }
      }

      if (closestChannel !== null) {
        let videoViews = videoHistory._source.video_views;
        let channelAvgViews = closestChannel._source.channel_average_views;

        if (channelAvgViews !== 0) {
          // 0으로 나누면 안됨..
          let viewsRatio = videoViews / channelAvgViews;

          // 날짜의 합계와 카운트를 추가합니다
          if (!dateViewRatios[videoDate]) {
            dateViewRatios[videoDate] = { total: 0, count: 0 };
          }
          dateViewRatios[videoDate].total += viewsRatio;
          dateViewRatios[videoDate].count += 1;
        }
      }
    }

    // 각 날짜의 평균으로 합계 및 카운트 변환
    let result: IExpectedData[] = [];
    for (let date in dateViewRatios) {
      let averageViewsRatio =
        dateViewRatios[date].total / dateViewRatios[date].count;
      result.push({ date: date, expected_views: averageViewsRatio });
    }

    return result;
  }
}
