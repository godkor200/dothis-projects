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
import { VideoServicePort } from '@Apps/modules/video/database/video.service.port';

const mockVideoHistoryQueryHandlerPort = mock<VideoHistoryQueryHandlerPort>();
const mockFindVideoOsAdapter = mock<VideoServicePort>();
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
    mockFindVideoOsAdapter.findVideoIdFullScanAndVideos.mockReturnValue(
      Promise.resolve(videoData),
    );
    mockChannelHistoryHandler.findChannelHistoryFullScan.mockReturnValue(
      Promise.resolve(channelHistoryDummy),
    );
    mockVideoHistoryQueryHandlerPort.findVideoHistoryFullScan.mockReturnValue(
      Promise.resolve(video_historyDummy),
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
