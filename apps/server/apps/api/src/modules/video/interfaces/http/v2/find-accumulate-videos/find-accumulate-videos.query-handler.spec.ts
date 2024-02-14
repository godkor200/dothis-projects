import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/repository/database/channel-history.outbound.port';
import { mock } from 'jest-mock-extended';
import { FindAccumulateVideosV2Dtos } from '@Apps/modules/video/application/dtos/find-accumulate-videos.dtos';
import { RequestContextService } from '@Libs/commons/src/application/context/AppRequestContext';
import { nanoid } from 'nanoid';

import { ChannelHistoryAggregateService } from '@Apps/modules/channel_history/service/channel-history.aggregate.service';
import { FindAccumulateVideosV2QueryHandler } from '@Apps/modules/video/interfaces/http/v2/find-accumulate-videos/find-accumulate-videos.query-handler';
import { channelHistory } from '@Apps/modules/video/interfaces/http/v2/find-accumulate-videos/__dummy__/video.dummy';

const mockChannelHistoryOutboundPort = mock<ChannelHistoryOutboundPort>();
const mockChannelHistoryAggregateService =
  mock<ChannelHistoryAggregateService>();
let handler: FindAccumulateVideosV2QueryHandler;

beforeEach(() => {
  handler = new FindAccumulateVideosV2QueryHandler(
    mockChannelHistoryOutboundPort,
    mockChannelHistoryAggregateService,
  );
  jest.spyOn(RequestContextService, 'getContext').mockReturnValue({
    requestId: nanoid(6),
    req: undefined,
    res: undefined,
  });
});
describe('함수 처리', () => {
  it('비디오 채널 히스토리 조인', async () => {
    mockChannelHistoryOutboundPort.findChannelHistoryByKeywordAndRelWordFullScan.mockReturnValue(
      Promise.resolve(channelHistory.map((e) => e._source)),
    );

    const arg: FindAccumulateVideosV2Dtos = {
      keyword: '이태원',
      relationKeyword: undefined,
      from: new Date('2023-10-12'),
      to: new Date('2023-10-14'),
    };

    const res = await handler.execute(arg);
    /**
     * 채널히스토리에 없는 비디오들이 있음 1691 - 1636 = 55
     */
    console.log(res.unwrap());

    // expect(res.unwrap().section[2].number).toBe(videoDummy)
  });
});
