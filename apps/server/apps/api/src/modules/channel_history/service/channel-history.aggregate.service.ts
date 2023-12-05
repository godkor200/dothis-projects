import {
  IChannelHistory,
  ISection,
  SECTION_NUMBER,
} from '@Apps/modules/video/interface/find-accumulate-videos.interface';

export class ChannelHistoryAggregateService {
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
   * 비디오 데이터와 채널 데이터를 받아 비디오 데이터 루프를 돌면서 채널데이터안의 구독자수 확인
   * 비디오가 속한 채널을 확인해 구독자 구간에 카운팅
   * @param ChannelHistoryData 채널 히스토리 데이터
   */
  countSubscribersByRange(ChannelHistoryData: IChannelHistory[]): ISection[] {
    const rangesWithCount = this.ranges.map((range) => ({
      ...range,
      number: 0,
    }));
    for (let item of ChannelHistoryData) {
      const subscribers = item._source.channel_subscribers;
      for (let range of rangesWithCount) {
        if (subscribers >= range.gte && subscribers < range.lte) {
          range.number += item.inner_hits.video_list.hits.total.value;
        }
      }
    }
    return rangesWithCount;
  }
}
