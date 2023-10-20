import { FindDailyViewsQueryOsHandler } from '@Apps/modules/daily_views/queries/v2/find-daily-views/find-daily-views.query-handler';

import { mock } from 'jest-mock-extended';
import { FindVideoHistoryOsAdapter } from '@Apps/modules/video_history/interface/find-video-history.os.adapter';
import { FindVideoOsAdapter } from '@Apps/modules/video/interface/find-video.os.adapter';
import {
  data,
  example,
} from '@Apps/modules/daily_views/queries/v2/find-daily-views/__dummy__/daily-view-dummy-data';
import { FindDailyViewsQuery } from '@Apps/modules/daily_views/dtos/find-daily-views.dtos';

const mockFindVideoHistoryOsAdapter = mock<FindVideoHistoryOsAdapter>();
const mockFindVideoOsAdapter = mock<FindVideoOsAdapter>();
let handler: FindDailyViewsQueryOsHandler;

beforeEach(() => {
  handler = new FindDailyViewsQueryOsHandler(
    mockFindVideoHistoryOsAdapter,
    mockFindVideoOsAdapter,
  );
});
describe('calculateIncrease', () => {
  it('should ', async () => {
    mockFindVideoHistoryOsAdapter.findVideoHistory.mockReturnValue(
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
    expect(res).toStrictEqual([
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
