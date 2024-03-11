import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/infrastructure/repositories/database/channel-history.outbound.port';
import { mock } from 'jest-mock-extended';

import { ChannelHistoryAggregateService } from '@Apps/modules/channel_history/application/service/channel-history.aggregate.service';

const mockChannelHistoryOutboundPort = mock<ChannelHistoryOutboundPort>();
const mockChannelHistoryAggregateService =
  mock<ChannelHistoryAggregateService>();
// let handler: FindAccumulateVideosV2QueryHandler;

beforeEach(() => {
  // handler = new FindAccumulateVideosV2QueryHandler(
  //   mockChannelHistoryOutboundPort,
  //   mockChannelHistoryAggregateService,
  // );
  // jest.spyOn(RequestContextService, 'getContext').mockReturnValue({
  //   requestId: nanoid(6),
  //   req: undefined,
  //   res: undefined,
  // });
});
describe('함수 처리', () => {
  it.todo('비디오 채널 히스토리 조인');

  //   , async () => {
  //   mockChannelHistoryOutboundPort.findChannelHistoryByKeywordAndRelWordFullScan.mockReturnValue(
  //     Promise.resolve(channelHistory.map((e) => e._source)),
  //   );
  //
  //   const arg: FindAccumulateVideosV2Dtos = {
  //     keyword: '이태원',
  //     relationKeyword: undefined,
  //     from: new Date('2023-10-12'),
  //     to: new Date('2023-10-14'),
  //   };
  //
  //   const res = await handler.execute(arg);
  //   /**
  //    * 채널히스토리에 없는 비디오들이 있음 1691 - 1636 = 55
  //    */
  //   console.log(res.unwrap());
  //
  //   // expect(res.unwrap().section[2].number).toBe(videoDummy)
  // });
});
