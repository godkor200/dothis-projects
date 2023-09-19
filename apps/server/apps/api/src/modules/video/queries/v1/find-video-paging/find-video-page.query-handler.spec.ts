import { mock } from 'jest-mock-extended';
import { VideoServicePort } from '@Apps/modules/video/database/video.service.port';
import { FindVideoPageQueryHandler } from '@Apps/modules/video/queries/v1/find-video-paging/find-video-page.query-handler';
import { IPagingRes } from '@Apps/modules/video/interface/find-many-video.interface';
import { FindVideoPageQuery } from '@Apps/modules/video/queries/v1/find-video-paging/find-video-paging.req.dto';

const mockVideoServicePort = mock<VideoServicePort>();

let handler: FindVideoPageQueryHandler;
beforeEach(async () => {
  handler = new FindVideoPageQueryHandler(mockVideoServicePort);
});

describe('예외 처리', () => {
  it('해당 키워드에 비디오가 없을 경우 Not Found를 띄웁니다.', async () => {
    const arg: FindVideoPageQuery = {
      clusterNumber: 6,
      limit: 5,
      search: '고기',
    };
    mockVideoServicePort.findVideoPaging.mockReturnValue(
      Promise.resolve({
        total: {
          value: 0,
          relation: 'eq',
        },
        data: [],
      } as IPagingRes),
    );
    try {
      await handler.execute(arg);
    } catch (err) {
      console.log(err);
      expect(err.message).toBe('Not Found');
    }
  });
});
