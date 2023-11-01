import {
  FindVideoOsAdapter,
  IFindVideoIDAndChannelIdRes,
} from '@Apps/modules/video/interface/find-video.os.adapter';
import { mock } from 'jest-mock-extended';
import { ExpectedViewsQueryHandler } from '@Apps/modules/channel_history/queries/v1/exprected-views/expected-views.query-handler';
import { VideoHistoryQueryHandlerPort } from '@Apps/modules/video_history/database/video_history.query-handler.port';
import { RequestContextService } from '@Libs/commons/src/application/context/AppRequestContext';
import { nanoid } from 'nanoid';
import { ExpectedViewsQuery } from '@Apps/modules/channel_history/dtos/expected-views.dtos';
import { videoData } from '@Apps/modules/channel_history/queries/v1/exprected-views/__dummy__/video.dummy';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/database/channel-history.outbound.port';
import { channelHistoryDummy } from '@Apps/modules/channel_history/queries/v1/exprected-views/__dummy__/channel_history.dummy';
import { video_historyDummy } from '@Apps/modules/channel_history/queries/v1/exprected-views/__dummy__/video_history.dummy';

const mockVideoHistoryQueryHandlerPort = mock<VideoHistoryQueryHandlerPort>();
const mockFindVideoOsAdapter = mock<FindVideoOsAdapter>();
const mockChannelHistoryHandler = mock<ChannelHistoryOutboundPort>();
let handler: ExpectedViewsQueryHandler;
beforeEach(async () => {
  handler = new ExpectedViewsQueryHandler(
    mockFindVideoOsAdapter,
    mockVideoHistoryQueryHandlerPort,
    mockChannelHistoryHandler,
  );

  jest.spyOn(RequestContextService, 'getContext').mockReturnValue({
    requestId: nanoid(6),
    req: undefined,
    res: undefined,
  });
});

describe('기대 조회수 평균 구하기', () => {
  it('비디오', async () => {
    const arg: ExpectedViewsQuery = {
      clusterNumber: '6',
      keyword: '고기',
      relationKeyword: '돼지고기',
      from: new Date('2023-10-13'),
      to: new Date('2023-10-20'),
    };
    mockFindVideoOsAdapter.findVideoIdAndChannelId.mockReturnValue(
      Promise.resolve(videoData),
    );
    mockChannelHistoryHandler.findChannelHistory.mockReturnValue(
      Promise.resolve(channelHistoryDummy),
    );
    mockVideoHistoryQueryHandlerPort.findVideoHistory.mockReturnValue(
      Promise.resolve(video_historyDummy),
    );
    const res = await handler.execute(arg);
  });
});
