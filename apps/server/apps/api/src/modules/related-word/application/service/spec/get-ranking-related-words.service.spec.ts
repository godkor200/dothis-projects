import { GetRankingRelatedWordsService } from '@Apps/modules/related-word/application/service/get-ranking-related-words.service';
import { FindRelatedWordOutboundPort } from '@Apps/modules/related-word/domain/ports/find-related-word.outbound.port';
import { mock } from 'jest-mock-extended';
import { IGetRelatedLastVideoHistory } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { RankingRelatedWordAggregateService } from '@Apps/modules/related-word/application/service/ranking-related-word.aggregate.service';
import { Ok } from 'oxide.ts';
import { history } from '@Apps/modules/related-word/application/service/spec/__dummy__/video_history.dummy';
import { ChannelHistoryAggregateService } from '@Apps/modules/channel-history/application/service/channel-history.aggregate.service';

const mockFindRelAdapter = mock<FindRelatedWordOutboundPort>();
const mockIGetRelatedLastVideoHistory = mock<IGetRelatedLastVideoHistory>();
const mockRankingRelatedWordAggregateService =
  mock<RankingRelatedWordAggregateService>();
let handler: GetRankingRelatedWordsService;

beforeEach(() => {
  handler = new GetRankingRelatedWordsService(
    mockFindRelAdapter,
    mockIGetRelatedLastVideoHistory,
    new RankingRelatedWordAggregateService(
      new ChannelHistoryAggregateService(),
    ),
  );
});
describe('함수', () => {
  it('should', async () => {
    mockFindRelAdapter.findOneByKeyword.mockReturnValue(
      Promise.resolve({
        keyword: '서울',
        relWords: 'ddd',
        cluster: '[1,2,3]',
      }),
    );
    mockIGetRelatedLastVideoHistory.execute.mockReturnValue(
      Promise.resolve(Ok(history)),
    );
    const query = {};
    await handler.execute(query);
  });
});
