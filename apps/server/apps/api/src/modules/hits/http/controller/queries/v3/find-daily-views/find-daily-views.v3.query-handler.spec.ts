import { mock } from 'jest-mock-extended';
import { FindDailyViewsQuery } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { RequestContextService } from '@Libs/commons/src/application/context/AppRequestContext';
import { nanoid } from 'nanoid';
import { VideoQueryHandlerOutboundPort } from '@Apps/modules/video/database/video.query-handler.outbound.port';
import { FindDailyViewsQueryOsV3Handler } from '@Apps/modules/hits/http/controller/queries/v3/find-daily-views/find-daily-views.v3.query-handler';
import { videoHistoryDummy } from '@Apps/modules/hits/http/controller/queries/v3/find-daily-views/__dummy__/daily-view-dummy-data';
import { VideoAggregateService } from '@Apps/modules/video/service/video.aggregate.service';
import { VideoDataService } from '@Apps/modules/video/service/video-data.service';

const mockFindVideoOsAdapter = mock<VideoQueryHandlerOutboundPort>();
const mockVideoAggregateService = mock<VideoAggregateService>();
const mockVideoDataService = mock<VideoDataService>();

let handler: FindDailyViewsQueryOsV3Handler;

beforeEach(() => {
  handler = new FindDailyViewsQueryOsV3Handler(
    mockFindVideoOsAdapter,
    mockVideoAggregateService,
  );
});
describe('calculateIncrease 함수', () => {
  it('should ', async () => {
    mockFindVideoOsAdapter.findVideoIdFullScanAndVideos.mockReturnValue(
      Promise.resolve(videoHistoryDummy),
    );
    const arg: FindDailyViewsQuery = {
      clusterNumber: '0',
      keyword: '이태원',
      relationKeyword: undefined,
      from: '2023-10-12',
      to: '2023-10-14',
    };

    const res = await handler.execute({
      clusterNumber: arg.clusterNumber,
      ...arg,
    });
    expect(res.unwrap()).toStrictEqual([
      {
        date: '2023-10-13',
        increase_views: 2708,
        increase_likes: 525,
        increase_comments: 20,
      },
      {
        date: '2023-10-14',
        increase_views: 127,
        increase_likes: 13,
        increase_comments: 0,
      },
    ]);
  });
});

describe('예외 처리', () => {
  jest.spyOn(RequestContextService, 'getContext').mockReturnValue({
    requestId: nanoid(6),
    req: undefined,
    res: undefined,
  });
  it('비디오 값이 널인 경우', async () => {
    mockFindVideoOsAdapter.findVideoIdFullScanAndVideos.mockReturnValue(
      Promise.resolve(null),
    );
    const arg: FindDailyViewsQuery = {
      clusterNumber: '0',
      keyword: '이태원',
      relationKeyword: undefined,
      from: '2023-10-12',
      to: '2023-10-14',
    };

    const res = await handler.execute(arg);
    expect(res.isErr()).toBe(true);
    expect(res.expectErr('The video could not be found.').message).toBe(
      'The video could not be found.',
    );
  });
});
