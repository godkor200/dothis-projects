import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAccumulateVideosDtos } from '@Apps/modules/video/dtos/find-accumulate-videos.dtos';
import { Inject } from '@nestjs/common';
import { CHANNEL_HISTORY_OS_DI_TOKEN } from '@Apps/modules/channel_history/constants/channel-history.di-token.constants';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/database/channel-history.outbound.port';
import {
  IFindAccumulateVideoRes,
  ISection,
  SECTION_NUMBER,
} from '@Apps/modules/video/interface/find-accumulate-videos.interface';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoServicePort } from '@Apps/modules/video/database/video.service.port';
import { IFindVideoIDAndChannelIdRes } from '@Apps/modules/video/interface/find-video.os.res';
import { Err, Ok, Result } from 'oxide.ts';
import { IChannelHistoryRes } from '@Apps/modules/channel_history/dtos/expected-views.res';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/event/channel.errors';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel_history/domain/event/channel_history.error';

import {
  FindVideoDateQuery,
  VIDEO_DATA_KEY,
} from '@Apps/modules/video/dtos/find-videos.dtos';
import { FindAccumulateVideosRes } from '@Apps/modules/video/dtos/find-accumulate-videos.res';
import { CHANNEL_DATA_KEY } from '@Apps/modules/channel_history/dtos/expected-views.dtos';

@QueryHandler(FindAccumulateVideosDtos)
export class FindAccumulateVideosQueryHandler
  implements
    IQueryHandler<
      FindAccumulateVideosDtos,
      Result<
        IFindAccumulateVideoRes<ISection[]>,
        ChannelNotFoundError | VideoNotFoundError | ChannelHistoryNotFoundError
      >
    >
{
  constructor(
    @Inject(CHANNEL_HISTORY_OS_DI_TOKEN)
    private readonly channelHistory: ChannelHistoryOutboundPort,

    @Inject(VIDEO_OS_DI_TOKEN)
    private readonly video: VideoServicePort,
  ) {}

  /**
   * 1. 토큰에서 채널_id 받아옴
   * 2. 받아와서 채널 히스토리에서 제일 최근의 내 구독자 수를 받아옴
   * 3. 기획상 구독자 범위에 따라서 내 구독자 범위를 도출
   * 4. 비디오  데이터와 채널 데이터를 받아 비디오 데이터 루프를 돌면서 채널데이터안의 구독자수 확인
   * 5. 비디오가 속한 채널을 확인해 구독자 구간에 카운팅
   * @param arg
   */
  async execute(
    arg: FindAccumulateVideosDtos,
  ): Promise<
    Result<
      IFindAccumulateVideoRes<ISection[]>,
      ChannelNotFoundError | VideoNotFoundError | ChannelHistoryNotFoundError
    >
  > {
    const userInfo = arg.user;
    const userChannelId = userInfo.channelId;
    const channel = await this.channelHistory.findChannelHistoryByLimit(
      [userChannelId],
      1,
      'desc',
    );
    if (!channel) return Err(new ChannelNotFoundError());
    const subscribers = channel[0].channel_subscribers;
    const userSection = this.getRangeValues(subscribers);

    const revisedArg = new FindVideoDateQuery({
      ...arg,
      data: [VIDEO_DATA_KEY.VIDEO_ID, VIDEO_DATA_KEY.CHANNEL_ID],
    });

    const searchRelatedVideo =
      await this.video.findvideoIdfullScanAndVideos<IFindVideoIDAndChannelIdRes>(
        revisedArg,
      );

    if (!searchRelatedVideo) return Err(new VideoNotFoundError());
    const {
      channelIds,
      videoIds,
    }: { channelIds: string[]; videoIds: string[] } = searchRelatedVideo.reduce(
      (acc, e) => {
        acc.channelIds.push(e.channel_id);
        acc.videoIds.push(e.video_id);
        return acc;
      },
      { channelIds: [], videoIds: [] },
    );
    //os에서 불러 올때 날짜를 오름차순으로 불러 와야함 추후 데이터 정상화후 asc로 불러와야됨
    const channelHistoryRes =
      await this.channelHistory.findChannelHistoryFullScan<FindAccumulateVideosRes>(
        channelIds,
        [CHANNEL_DATA_KEY.CHANNEL_ID, CHANNEL_DATA_KEY.CHANNEL_SEUBSCRIBERS],
      );

    if (!channelHistoryRes) return Err(new ChannelHistoryNotFoundError());

    return Ok({
      videoTotal: videoIds.length,
      userSection: userSection.sec,
      section: this.countSubscribersByRange(
        searchRelatedVideo,
        channelHistoryRes,
      ),
    });
  }

  /**
   * 기획상 구독자 범위
   * @private
   */
  private readonly ranges = [
    { gte: 0, lte: 100, max: 100, section: SECTION_NUMBER.RANGE_0_100 }, // 구독자 제로에서 100명까지에 구간이 없어 추가 없으면 에러가 남!
    { gte: 100, lte: 1000, max: 1000, section: SECTION_NUMBER.RANGE_100_1000 },
    {
      gte: 1000,
      lte: 10000,
      max: 10000,
      section: SECTION_NUMBER.RANGE_1000_10000,
    },
    {
      gte: 10000,
      lte: 50000,
      max: 50000,
      section: SECTION_NUMBER.RANGE_10000_50000,
    },
    {
      gte: 50000,
      lte: 100000,
      max: 100000,
      section: SECTION_NUMBER.RANGE_50000_100000,
    },
    {
      gte: 100000,
      lte: 500000,
      max: 500000,
      section: SECTION_NUMBER.RANGE_100000_500000,
    },
    {
      gte: 500000,
      max: Infinity,
      section: SECTION_NUMBER.RANGE_500000_AND_ABOVE,
    },
  ];

  /**
   * 본인 구독자 구간 계산
   * @param num 로그인 채널 구독자수
   * @private
   */
  private getRangeValues(num: number) {
    for (let range of this.ranges) {
      if (num >= range.gte && num < range.lte) {
        return { gte: range.gte, lte: range.lte, sec: range.section };
      }
    }
    throw new Error('The number of subscribers is not within the set range.');
  }

  /**
   * 비디오 데이터와 채널 데이터를 받아 비디오 데이터 루프를 돌면서 채널데이터안의 구독자수 확인
   * 비디오가 속한 채널을 확인해 구독자 구간에 카운팅
   * @param VideoData 비디오 데이터
   * @param ChannelData 채널 데이터
   * @private
   */
  private countSubscribersByRange(
    VideoData: IFindVideoIDAndChannelIdRes[],
    ChannelData: FindAccumulateVideosRes[],
  ): ISection[] {
    const rangesWithCount = this.ranges.map((range) => ({
      ...range,
      number: 0,
    }));
    for (let video of VideoData) {
      for (let item of ChannelData) {
        if (video.channel_id === item.channel_id) {
          const subscribers = item.channel_subscribers;
          for (let range of rangesWithCount) {
            if (subscribers >= range.gte && subscribers < range.lte) {
              range.number++;
              break;
            }
          }
          /**
           * os에서 불러 올때 날짜를 오름차순으로 불러 올떄만 가능한 로직
           */
          break;
        }
      }
    }
    return rangesWithCount;
  }
}
