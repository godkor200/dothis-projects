import { mock } from 'jest-mock-extended';
import { FindDailyViewsQuery } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { RequestContextService } from '@Libs/commons/src/application/context/AppRequestContext';
import { nanoid } from 'nanoid';
import { VideoQueryHandlerOutboundPort } from '@Apps/modules/video/domain/ports/video.query-handler.outbound.port';

import { videoHistoryDummy } from './__dummy__/daily-view-dummy-data';
import { VideoAggregateService } from '@Apps/modules/video/application/service/helpers/video.aggregate.service';
import { VideoDataService } from '@Apps/modules/video/application/service/video-data.service';
import { GetDailyHitsV1QueryHandler } from '@Apps/modules/hits/application/queries/get-daily-hits.v1.query-handler';

const mockFindVideoOsAdapter = mock<VideoQueryHandlerOutboundPort>();
const mockVideoAggregateService = mock<VideoAggregateService>();
const mockVideoDataService = mock<VideoDataService>();

let handler: GetDailyHitsV1QueryHandler;

beforeEach(() => {
  // handler = new GetDailyHitsV1QueryHandler(mockFindVideoOsAdapter);
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
    //
    // const res = await handler.execute({
    //   clusterNumber: arg.clusterNumber,
    //   ...arg,
    // });
    // expect(res.unwrap()).toStrictEqual([
    //   {
    //     date: '2023-10-13',
    //     increase_views: 2708,
    //     increase_likes: 525,
    //     increase_comments: 20,
    //   },
    //   {
    //     date: '2023-10-14',
    //     increase_views: 127,
    //     increase_likes: 13,
    //     increase_comments: 0,
    //   },
    // ]);
  });
});

describe('예외 처리', () => {
  jest.spyOn(RequestContextService, 'getContext').mockReturnValue({
    requestId: nanoid(6),
    req: undefined,
    res: undefined,
  });
  // it.todo('비디오 값이 널인 경우', async () => {
  //   mockFindVideoOsAdapter.findVideoIdFullScanAndVideos.mockReturnValue(
  //     Promise.resolve(null),
  //   );
  //   const arg: FindDailyViewsQuery = {
  //     clusterNumber: '0',
  //     keyword: '이태원',
  //     relationKeyword: undefined,
  //     from: '2023-10-12',
  //     to: '2023-10-14',
  //   };
  //
  //   const res = await handler.execute(arg);
  //   expect(res.isErr()).toBe(true);
  //   expect(res.expectErr('The video could not be found.').message).toBe(
  //     'The video could not be found.',
  //   );
  // });
});
