import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  FindAccumulateVideosDtos,
  FindAccumulateVideosV2Dtos,
} from '@Apps/modules/video/dtos/find-accumulate-videos.dtos';
import { Inject } from '@nestjs/common';
import { CHANNEL_HISTORY_OS_DI_TOKEN } from '@Apps/modules/channel_history/constants/channel-history.di-token.constants';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/database/channel-history.outbound.port';
import {
  IFindAccumulateVideoRes,
  ISection,
  SECTION_NUMBER,
  VideoHistory,
} from '@Apps/modules/video/interface/find-accumulate-videos.interface';
import { VideoServicePort } from '@Apps/modules/video/database/video.service.port';
import { IFindVideoIDAndChannelIdRes } from '@Apps/modules/video/interface/find-video.os.res';
import { Err, Ok, Result } from 'oxide.ts';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/event/channel.errors';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel_history/domain/event/channel_history.error';
import { FindAccumulateVideosRes } from '@Apps/modules/video/dtos/find-accumulate-videos.res';

@QueryHandler(FindAccumulateVideosV2Dtos)
export class FindAccumulateVideosV2QueryHandler
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
    arg: FindAccumulateVideosV2Dtos,
  ): Promise<
    Result<
      IFindAccumulateVideoRes<ISection[]>,
      ChannelNotFoundError | VideoNotFoundError | ChannelHistoryNotFoundError
    >
  > {
    const channelHistoryRes =
      await this.channelHistory.findChannelHistoryByKeywordAndRelWordFullScan<VideoHistory>(
        arg,
      );
    console.log(channelHistoryRes);
    if (!channelHistoryRes) return Err(new ChannelHistoryNotFoundError());

    return Ok({
      videoTotal: 0,
      userSection: SECTION_NUMBER.RANGE_500000_AND_ABOVE,
      section: [],
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
    const { gte, lte, section } = this.ranges[this.ranges.length - 1];
    return { gte, lte, sec: section };
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
