import { mock } from 'jest-mock-extended';
import { ExpectedViewsV2QueryHandler } from '@Apps/modules/channel_history/queries/v2/exprected-views/expected-views.v2.query-handler';
import { RequestContextService } from '@Libs/commons/src/application/context/AppRequestContext';
import { nanoid } from 'nanoid';
import { ExpectedViewsV2Query } from '@Apps/modules/channel_history/dtos/expected-views.dtos';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/repository/database/channel-history.outbound.port';
import { channelHistoryDummy } from '@Apps/modules/channel_history/queries/v2/exprected-views/__dummy__/channel_history.dummy';
import { ChannelHistoryAggregateService } from '@Apps/modules/channel_history/service/channel-history.aggregate.service';

const mockChannelHistoryHandler = mock<ChannelHistoryOutboundPort>();
const mockChannelHistoryAggregateService =
  mock<ChannelHistoryAggregateService>();
let handler: ExpectedViewsV2QueryHandler;
beforeEach(async () => {
  handler = new ExpectedViewsV2QueryHandler(
    mockChannelHistoryHandler,
    mockChannelHistoryAggregateService,
  );

  jest.spyOn(RequestContextService, 'getContext').mockReturnValue({
    requestId: nanoid(6),
    req: undefined,
    res: undefined,
  });
});
/**
 * FIXME: 수정 필요
 */
describe('기대 조회수 평균 구하기 v2', () => {
  it('비디오', async () => {
    const arg: ExpectedViewsV2Query = {
      keyword: '고기',
      relationKeyword: '돼지고기',
      from: new Date('2023-10-13'),
      to: new Date('2023-10-20'),
    };

    mockChannelHistoryHandler.findChannelHistoryByKeywordAndRelWordFullScan.mockReturnValue(
      Promise.resolve(channelHistoryDummy),
    );

    const res = await handler.execute(arg);
    expect(res.isOk()).toStrictEqual(true);
    expect(res.unwrap()).toStrictEqual([
      { date: '2023-10-13', expected_views: 0.1346485725454217 },
      { date: '2023-10-14', expected_views: 3.49411984272086 },
      { date: '2023-10-15', expected_views: 10.409704086444297 },
      { date: '2023-10-16', expected_views: 0.11113222549092636 },
      { date: '2023-10-17', expected_views: 0.16752499931094558 },
    ]);
  });
});
