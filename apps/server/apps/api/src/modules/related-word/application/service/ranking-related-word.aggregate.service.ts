import { ChannelHistoryAggregateService } from '@Apps/modules/channel_history/application/service/channel-history.aggregate.service';
import { IRankingRelWords } from '@Apps/modules/related-word/domain/ports/ranking-related-word.res';
import { TRankResData } from '@dothis/dto';
import { Injectable } from '@nestjs/common';
import { IGetRelatedVideoAndVideoHistoryRes } from '@Apps/modules/video_history/domain/ports/video-history.outbound.port';

@Injectable()
export class RankingRelatedWordAggregateService {
  constructor(
    private readonly channelHistoryAggregateService: ChannelHistoryAggregateService,
  ) {}
  calculateWordStats(
    words: string[],
    data: IGetRelatedVideoAndVideoHistoryRes[],
  ): { word: string; count: number; views: number; avg: number }[] {
    const wordStats = [];

    words.forEach((word) => {
      let count = 0;
      let totalViews = 0;

      data.forEach((d) => {
        const title = d.videoTitle;
        const tags = d.videoTags;

        if (title?.includes(word) || tags?.includes(word)) {
          count++;
          totalViews += d.videoViews;
        }
      });

      // 평균 views를 계산합니다. count가 0이면 views도 0입니다.
      const avgViews = count > 0 ? totalViews / count : 0;

      wordStats.push({
        word: word,
        count: count,
        views: totalViews,
        avg: avgViews,
      });
    });

    return wordStats;
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
914000 + 74181 + 83140 - 5490 - 37000 - 100000;
