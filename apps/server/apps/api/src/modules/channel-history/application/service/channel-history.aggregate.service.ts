import {
  ISection,
  SECTION_NUMBER,
} from '@Apps/modules/video/application/dtos/find-accumulate-videos.interface';

import { TExpectedViewsArr, TRankingArrayOmitWord } from '@dothis/dto';
import { IGetVideoChannelHistoryRes } from '@Apps/modules/video/infrastructure/daos/video.res';
import { IGetRelatedVideoRes } from '@Apps/modules/channel-history/infrastructure/daos/channel-history.dao';
import { IChannelHistoryByChannelIdRes } from '@Apps/modules/channel-history/domain/ports/channel-history.outbound.port';

interface IDailyPerformance {
  [date: string]: {
    performanceTotal: number;
    videoViewsTotal: number;
    videoCount: number;
    maxPerformance: number;
    minPerformance: number;
  };
}
export class ChannelHistoryAggregateService {
  /**
   * 기획상 구독자 범위
   * @private
   */
  private readonly ranges = [
    //구독자 1000명 이하는 분석을 안해 구간을 사용하지 않음, 그러나 나중을 대비
    { gte: 0, lte: 99, max: 100, section: SECTION_NUMBER.RANGE_0_100 },
    { gte: 100, lte: 999, max: 1000, section: SECTION_NUMBER.RANGE_100_1000 },
    {
      gte: 1000,
      lte: 9999,
      max: 10000,
      section: SECTION_NUMBER.RANGE_1000_10000,
    },
    {
      gte: 10000,
      lte: 49999,
      max: 50000,
      section: SECTION_NUMBER.RANGE_10000_50000,
    },
    {
      gte: 50000,
      lte: 99999,
      max: 100000,
      section: SECTION_NUMBER.RANGE_50000_100000,
    },
    {
      gte: 100000,
      lte: 499999,
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
  countSubscribersByRange(
    historyData: IGetRelatedVideoRes[],
    subscribersData: IChannelHistoryByChannelIdRes[],
  ): ISection[] {
    const rangesWithCount = this.ranges.map((range) => ({
      ...range,
      number: 0,
    }));

    for (let item of historyData) {
      const channelData = subscribersData.find(
        (data) => data.channelId === item.channelId,
      );

      // 구독자 수를 가져옵니다. channelData가 유효한지 체크 후 구독자 수를 할당합니다.
      const subscribers = channelData ? channelData.channelSubscribers : 0;

      for (let range of rangesWithCount) {
        // 구독자 1000명 이하인 경우, 분석하지 않으므로 다음 구간으로 넘어갑니다.
        if (subscribers <= 1000) continue;

        // 구독자 수가 현재 구간에 해당하는지 체크합니다.
        if (
          subscribers >= range.gte &&
          (range.lte === undefined || subscribers < range.lte)
        ) {
          // 해당 구간의 number를 업데이트합니다.
          range.number += 1;
          break; // 현재 구간에 맞는 경우, 다음 아이템으로 넘어갑니다.
        }
      }
    }
    return rangesWithCount;
  }

  /**
   * 날짜별 성과 리턴
   *   1. 채널, 비디오 히스토리에서 각각 채널아이디, 날짜를 비교해서 맞으면 비디오 히스토리의 조회수/채널의 평균조회수(성과) 계산
   *   2. 날짜 별로 계산된 것을 모두 더하고 평균을 내어 리턴
   *
   *   성과 :  이 주제로 인해 영상 조회수가 채널의 평소 조회수보다 얼마나 많이 나왔는가를 뜻하는 수치
   *   계산식 :
   *    영상의 조회수 / 채널의 최근 평균 조회수
   *
   * @param channelHistories
   * @private
   */
  calculateDailyPerformance(
    channelHistories: IGetVideoChannelHistoryRes[],
  ): IDailyPerformance {
    let dateViewRatios: IDailyPerformance = {};
    for (let channel of channelHistories) {
      let channelAvgViews = channel.channelAverageViews;
      let videoViews = channel.videoViews;
      if (channelAvgViews !== 0 && videoViews !== 0) {
        // 성과
        let performance = videoViews / channelAvgViews;
        let videoDate = new Date(
          `${channel.year}-${channel.month}-${channel.day}`,
        );
        let dateString = `${videoDate.getFullYear()}-${(
          videoDate.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}-${videoDate
          .getDate()
          .toString()
          .padStart(2, '0')}`;

        if (!dateViewRatios[dateString]) {
          dateViewRatios[dateString] = {
            performanceTotal: 0,
            videoViewsTotal: 0,
            videoCount: 0,
            maxPerformance: performance,
            minPerformance: performance,
          };
        }

        dateViewRatios[dateString].performanceTotal += performance;
        dateViewRatios[dateString].videoViewsTotal += videoViews;
        dateViewRatios[dateString].videoCount += 1;
        // 최대 성과와 최소 성과 업데이트
        if (performance > dateViewRatios[dateString].maxPerformance) {
          dateViewRatios[dateString].maxPerformance = performance;
        }
        if (performance < dateViewRatios[dateString].minPerformance) {
          dateViewRatios[dateString].minPerformance = performance;
        }
      }
    }

    return dateViewRatios;
  }
  /**
   * 키워드 성과 계산
   */
  calculateKeywordPerformance(
    dateViewRatios: IDailyPerformance,
  ): TExpectedViewsArr {
    let result: TExpectedViewsArr = [];
    for (let date in dateViewRatios) {
      let keywordPerformance =
        dateViewRatios[date].performanceTotal / dateViewRatios[date].videoCount;
      dateViewRatios[date].maxPerformance;
      result.push({
        date: date,
        expectedHits: keywordPerformance,
        maxPerformance: dateViewRatios[date].maxPerformance,
        minPerformance: dateViewRatios[date].minPerformance,
      });
    }
    return result;
  }

  calculateKeywordSortFigure(dateViewRatios: IDailyPerformance) {
    let result: TRankingArrayOmitWord[] = [];

    for (let date in dateViewRatios) {
      let figure =
        (dateViewRatios[date].performanceTotal *
          dateViewRatios[date].videoViewsTotal) /
        dateViewRatios[date].videoCount;
      let keywordPerformance =
        dateViewRatios[date].performanceTotal / dateViewRatios[date].videoCount;
      result.push({
        expectedViews: keywordPerformance,
        sortFigure: figure,
      });
    }
    return result;
  }
}
