import { FindDailyViewsQueryOsHandler } from '@Apps/modules/daily_views/queries/v2/find-daily-views/find-daily-views.query-handler';

import { mock } from 'jest-mock-extended';
import { FindVideoHistoryOsAdapter } from '@Apps/modules/video_history/interface/find-video-history.os.adapter';
import { example } from '@Apps/modules/daily_views/queries/v2/find-daily-views/__dummy__/daily-view-dummy-data';
import { FindDailyViewsQuery } from '@Apps/modules/daily_views/dtos/find-daily-views.dtos';
import { RequestContextService } from '@Libs/commons/src/application/context/AppRequestContext';
import { nanoid } from 'nanoid';
import { VideoServicePort } from '@Apps/modules/video/database/video.service.port';

const mockFindVideoHistoryOsAdapter = mock<FindVideoHistoryOsAdapter>();
const mockFindVideoOsAdapter = mock<VideoServicePort>();
let handler: FindDailyViewsQueryOsHandler;

beforeEach(() => {
  handler = new FindDailyViewsQueryOsHandler(
    mockFindVideoHistoryOsAdapter,
    mockFindVideoOsAdapter,
  );
});
describe('calculateIncrease 함수', () => {
  it('should ', async () => {
    mockFindVideoHistoryOsAdapter.findVideoHistoryFullScan.mockReturnValue(
      Promise.resolve(example),
    );
    const arg: FindDailyViewsQuery = {
      clusterNumber: '0',
      keyword: '이태원',
      relationKeyword: undefined,
      from: new Date('2023-10-12'),
      to: new Date('2023-10-14'),
    };

    const res = await handler.execute(arg);
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
    mockFindVideoOsAdapter.findvideoIdfullScanAndVideos.mockReturnValue(
      Promise.resolve(null),
    );
    const arg: FindDailyViewsQuery = {
      clusterNumber: '0',
      keyword: '이태원',
      relationKeyword: undefined,
      from: new Date('2023-10-12'),
      to: new Date('2023-10-14'),
    };

    const res = await handler.execute(arg);
    expect(res.isErr()).toBe(true);
    expect(res.expectErr('The video could not be found.').message).toBe(
      'The video could not be found.',
    );
  });

  it('히스토리가 없는 경우', async () => {
    mockFindVideoOsAdapter.findvideoIdfullScanAndVideos.mockReturnValue(
      Promise.resolve(['1', '2']),
    );
    mockFindVideoHistoryOsAdapter.findVideoHistoryFullScan.mockReturnValue(
      Promise.resolve(null),
    );
    const arg: FindDailyViewsQuery = {
      clusterNumber: '0',
      keyword: '이태원',
      relationKeyword: undefined,
      from: new Date('2023-10-12'),
      to: new Date('2023-10-14'),
    };

    const res = await handler.execute(arg);
    expect(res.isErr()).toBe(true);
    expect(res.expectErr('The video history could not be found.').message).toBe(
      'The video history could not be found.',
    );
  });
});
