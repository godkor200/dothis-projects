import { ChannelHistoryAggregateService } from '@Apps/modules/channel_history/service/channel-history.aggregate.service';
import { IRankingRelWords } from '@Apps/modules/rel-words/interface/rank-rel.interface';
import { TRankRes } from '@dothis/dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RankRelAggregateService {
  constructor(
    private readonly channelHistoryAggregateService: ChannelHistoryAggregateService,
  ) {}

  calculationExpectationNumberRelatedWord(
    channelVideoData: IRankingRelWords[],
  ): TRankRes[] {
    let result: TRankRes[] = [];

    for (let i = 0; i < channelVideoData.length; i++) {
      let videos = channelVideoData[i].data;
      let relWord = channelVideoData[i].relWord;

      const expectedViewsData =
        this.channelHistoryAggregateService.calculateAverageViews(videos);

      let totalExpectedViews = 0;
      for (let data of expectedViewsData) {
        totalExpectedViews += data.expected_views;
      }

      let averageExpectedViews = totalExpectedViews / expectedViewsData.length;

      result.push({ expectedViews: averageExpectedViews, word: relWord });
    }

    return result;
  }
}
