import { FindAccumulateVideosV2QueryHandler } from '@Apps/modules/video/queries/v2/find-accumulate-videos/find-accumulate-videos.query-handler';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/database/channel-history.outbound.port';
import { mock } from 'jest-mock-extended';
import { VideoServicePort } from '@Apps/modules/video/database/video.service.port';
import {
  channelHistoryDummy,
  sampleChannelHistoryDummy,
} from '@Apps/modules/video/queries/v1/find-accumulate-videos/__dummy__/channel_history.dummy';
import {
  sampleVideoDummy,
  videoDummy,
} from '@Apps/modules/video/queries/v1/find-accumulate-videos/__dummy__/video.dummy';
import {
  FindAccumulateVideosDtos,
  FindAccumulateVideosV2Dtos,
} from '@Apps/modules/video/dtos/find-accumulate-videos.dtos';
import { RequestContextService } from '@Libs/commons/src/application/context/AppRequestContext';
import { nanoid } from 'nanoid';
import { IChannelHistoryRes } from '@Apps/modules/channel_history/dtos/expected-views.res';
import { videoHistory } from '@Apps/modules/video/queries/v2/find-accumulate-videos/__dummy__/video.dummy';

const mockChannelHistoryOutboundPort = mock<ChannelHistoryOutboundPort>();
let handler: FindAccumulateVideosV2QueryHandler;

beforeEach(() => {
  handler = new FindAccumulateVideosV2QueryHandler(
    mockChannelHistoryOutboundPort,
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
      Promise.resolve(videoHistory),
    );

    const arg: FindAccumulateVideosV2Dtos = {
      clusterNumber: '0',
      keyword: '이태원',
      relationKeyword: undefined,
      from: new Date('2023-10-12'),
      to: new Date('2023-10-14'),
    };

    const res = await handler.execute(arg);
    /**
     * 채널히스토리에 없는 비디오들이 있음 1691 - 1636 = 55
     */
    expect(
      res
        .unwrap()
        .section.map((e) => e.number)
        .reduce((a, b) => a + b, 0),
    ).toBe(videoDummy.length - 55);
    // expect(res.unwrap().section[2].number).toBe(videoDummy)
  });
});
