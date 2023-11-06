import { FindAccumulateVideosQueryHandler } from '@Apps/modules/video/queries/v1/find-accumulate-videos/find-accumulate-videos.query-handler';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/database/channel-history.outbound.port';
import { mock } from 'jest-mock-extended';
import { VideoServicePort } from '@Apps/modules/video/database/video.service.port';
import {
  channelHistoryDummy,
  sampleChannelHistoryDummy,
} from '@Apps/modules/video/queries/v1/find-accumulate-videos/__dummy__/channel_history.dummy';
import { FindDailyViewsQuery } from '@Apps/modules/daily_views/dtos/find-daily-views.dtos';
import {
  sampleVideoDummy,
  videoDummy,
} from '@Apps/modules/video/queries/v1/find-accumulate-videos/__dummy__/video.dummy';
import { FindAccumulateVideosDtos } from '@Apps/modules/video/dtos/find-accumulate-videos.dtos';
import { RequestContextService } from '@Libs/commons/src/application/context/AppRequestContext';
import { nanoid } from 'nanoid';
import { IChannelHistoryRes } from '@Apps/modules/channel_history/dtos/expected-views.res';

const mockChannelHistoryOutboundPort = mock<ChannelHistoryOutboundPort>();
const mockVideoServicePort = mock<VideoServicePort>();
let handler: FindAccumulateVideosQueryHandler;

beforeEach(() => {
  handler = new FindAccumulateVideosQueryHandler(
    mockChannelHistoryOutboundPort,
    mockVideoServicePort,
  );
  jest.spyOn(RequestContextService, 'getContext').mockReturnValue({
    requestId: nanoid(6),
    req: undefined,
    res: undefined,
  });
});
describe('함수 처리', () => {
  it('비디오 채널 히스토리 조인', async () => {
    const userChannel: IChannelHistoryRes[] = [
      {
        channel_id: 'dothis_user',
        channel_subscribers: 10000,
        channel_total_views: 1000,
        channel_total_videos: 1000,
        channel_average_views: 1000,
        crawled_date: '1111111',
      },
    ];

    mockChannelHistoryOutboundPort.findChannelHistoryByLimit.mockReturnValue(
      Promise.resolve(userChannel),
    );
    mockChannelHistoryOutboundPort.findChannelHistoryFullscan.mockReturnValue(
      Promise.resolve(channelHistoryDummy),
    );
    mockVideoServicePort.findvideoIdfullScanAndVideos.mockReturnValue(
      Promise.resolve(videoDummy),
    );

    const arg: FindAccumulateVideosDtos = {
      clusterNumber: '0',
      keyword: '이태원',
      relationKeyword: undefined,
      from: new Date('2023-10-12'),
      to: new Date('2023-10-14'),
      user: {
        channelId: '1',
        userEmail: '11',
        id: '1',
        tokenRefresh: '111',
        googleRefreshToken: '1',
        googleAccessToken: '1',
      },
    };

    const res = await handler.execute(arg);
    console.log(
      res
        .unwrap()
        .section.map((e) => e.number)
        .reduce((a, b) => a + b, 0),
    );

    expect(
      res
        .unwrap()
        .section.map((e) => e.number)
        .reduce((a, b) => a + b, 0),
    ).toBe(videoDummy.length);
    // expect(res.unwrap().section[2].number).toBe(videoDummy)
  });
});
