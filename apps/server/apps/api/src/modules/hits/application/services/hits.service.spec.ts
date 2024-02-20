import { HitsService } from '@Apps/modules/hits/application/services/hits.service';
import { VideoOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { mock } from 'jest-mock-extended';
import { createDummyData } from '@Apps/modules/video/application/service/__dummy__';
import { Ok } from 'oxide.ts';
import { VideoAggregateService } from '@Apps/modules/video/application/service/video.aggregate.service';

const mockVideoOutboundPort = mock<VideoOutboundPort>();

let service: HitsService;

beforeEach(() => {
  service = new HitsService(mockVideoOutboundPort, new VideoAggregateService());
});
describe('계산', () => {
  it('데일리뷰', async () => {
    const dto = {};
    mockVideoOutboundPort.getRelatedVideoAndVideoHistory.mockReturnValue(
      Promise.resolve(Ok(createDummyData(100, 10))),
    );

    mockVideoOutboundPort.getRelatedVideosCountByDay.mockReturnValue(
      Promise.resolve(
        Ok(
          [31, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((e) => ({
            day: e,
            uniqueVideoCount: e,
          })),
        ),
      ),
    );
    await service.calculateDailyHitsMetrics(dto);
  });
});
