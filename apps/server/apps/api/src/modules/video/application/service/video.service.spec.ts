import { VideoService } from '@Apps/modules/video/application/service/video.service';
import { VideoOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { mock } from 'jest-mock-extended';
import { createDummyData } from '@Apps/modules/video/application/service/__dummy__';
import { Ok } from 'oxide.ts';
import { VideoAggregateService } from '@Apps/modules/video/application/service/video.aggregate.service';

const mockVideoOutboundPort = mock<VideoOutboundPort>();

let service: VideoService;

beforeEach(() => {
  service = new VideoService(
    mockVideoOutboundPort,
    new VideoAggregateService(),
  );
});
describe('계산', () => {
  it('데일리뷰', async () => {
    const dto = {};
    mockVideoOutboundPort.getRelatedVideoAndVideoHistory.mockReturnValue(
      Promise.resolve(Ok(createDummyData(100, 10))),
    );
    await service.calculateDailyHitsMetrics(dto);
  });
});
