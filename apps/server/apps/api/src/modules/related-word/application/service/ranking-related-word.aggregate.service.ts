import { ChannelHistoryAggregateService } from '@Apps/modules/channel-history/application/service/channel-history.aggregate.service';
import { IRankingRelWords } from '@Apps/modules/related-word/domain/ports/ranking-related-word.res';
import { Injectable } from '@nestjs/common';
import { IRelatedVideoAnalyticsData } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';

interface ICalculateWordStatsRes {
  // `word`: 분석 대상이 되는 연관 단어입니다.
  word: string;

  // `count`: 해당 단어가 포함된 동영상의 개수입니다. 즉, 동영상 제목이나 태그에 단어가 포함되어 있는 경우의 수를 나타냅니다.
  count: number;

  // `totalViews`: 해당 단어를 포함하는 동영상들의 조회수 총합입니다. 이는 단어의 인기 또는 관련 동영상들의 총 조회수를 나타냅니다.
  totalViews: number;

  // `avgViews`: 해당 단어를 포함하는 동영상들의 평균 조회수입니다. 총 조회수를 동영상 개수로 나눈 값으로, 단어의 평균적인 인기를 나타냅니다.
  expectedViews: number;

  // `relatedKeywordPerformance`: 연관 단어의 성능을 나타내는 지표입니다. 각 동영상의 조회수를 해당 채널의 평균 조회수로 나눈 값의 평균입니다.
  // 이 값은 단어가 얼마나 해당 채널 평균보다 높은 성과를 내는지를 보여줍니다.
  relatedKeywordPerformance: number;

  // `sortFigures`: 정렬에 사용될 수 있는 수치입니다. 이는 관련 키워드 성능과 평균 조회수를 결합한 값으로,
  // 높은 성능과 조회수를 가지는 단어를 상위에 배치하는 데 사용될 수 있습니다.
  sortFigures: number;
}

@Injectable()
export class RankingRelatedWordAggregateService {
  constructor(
    private readonly channelHistoryAggregateService: ChannelHistoryAggregateService,
  ) {}

  /**
   * 설명: 연관어 정렬의 필요한 계산식 계산 함수
   * 1.성과(videoPerformance):영상의 조회수 / 채널의 평균 조회수
   * 2.키워드 성과(relatedKeywordPerformance): 성과의 합 / 영상 수
   * 3.기대조회수: 내 채널의 평균 조회수 * 키워드 성과
   * 4.연관어 정렬(sortFigures): 키워드 성과 * 경쟁강도 = (성과의 평균 * 조회수 합계)/ 영상 수
   * @param words: 연관어 배열
   * @param data: 탐색어와 연관어와 관련된 동영상들에 관한 채널평균조회수, 비디오 조회수 데이터
   */
  calculateWordStats(
    words: string[],
    data: IRelatedVideoAnalyticsData[],
  ): ICalculateWordStatsRes[] {
    return words.map((word) => {
      let count = 0;
      let totalViews = 0;
      let totalPerformance = 0;
      data.forEach((d) => {
        if (d.videoTitle?.includes(word) || d.videoTags?.includes(word)) {
          let videoPerformance = d.videoViews / d.channelAverageViews;
          count++;
          totalViews += d.videoViews;
          totalPerformance += videoPerformance;
        }
      });
      /**
       * 기본 구독자수 notion_ref: https://www.notion.so/dothis-world/7f1b6590d3754d66a842b16b5c8ec8f5?v=c8229aaf707549f2b5c962f2369f01ce&pvs=4
       */
      const basicSubscribers = 1000;
      const videoPerformanceAvg = count > 0 ? totalPerformance / count : 0;
      const sortFigures = (videoPerformanceAvg * totalViews) / count;
      const expectedViews = (totalPerformance / count) * basicSubscribers;
      return {
        word,
        count,
        totalViews,
        relatedKeywordPerformance: totalPerformance / count,
        sortFigures: sortFigures > 0 ? sortFigures : 0,
        expectedViews:
          expectedViews > 0 ? (totalPerformance / count) * basicSubscribers : 0,
      };
    });
  }

  /**
   * 관련어의 기대조회수를 계산하는 집계 함수
   * */
  calculationExpectationNumberRelatedWord(
    channelVideoData: IRankingRelWords[],
  ): void {
    // let result: TRankResData = [];
    // for (let i = 0; i < channelVideoData.length; i++) {
    //   let videos = channelVideoData[i].data;
    //   let relWord = channelVideoData[i].relatedWord;
    //
    //   const dailyPerformance =
    //     this.channelHistoryAggregateService.calculateDailyPerformance(videos);
    //
    //   const expectedViewsData =
    //     this.channelHistoryAggregateService.calculateKeywordSortFigure(
    //       dailyPerformance,
    //     );
    //   let totalExpectedViews = 0;
    //   let totalVideoViews = 0;
    //   for (let data of expectedViewsData) {
    //     totalExpectedViews += data.expectedViews;
    //     totalVideoViews += data.sortFigure;
    //   }
    //
    //   let averageExpectedViews = totalExpectedViews / expectedViewsData.length;
    //   let sortFigure = totalVideoViews / expectedViewsData.length;
    //   result.push({
    //     expectedViews: averageExpectedViews,
    //     sortFigure,
    //     word: relWord,
    //   });
    // }
    //
    // return result;
  }
}
