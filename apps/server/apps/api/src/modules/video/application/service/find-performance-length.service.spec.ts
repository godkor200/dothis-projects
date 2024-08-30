import { FindPerformanceLengthService } from '@Apps/modules/video/application/service/find-performance-length.service';
import { mock } from 'jest-mock-extended';
import { IGetVideoViewsMatchingSearchOnSpecificDateOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { FindPerformanceLengthDto } from '@Apps/modules/video/application/dtos/find-performance-length.dto';
import { GetVideoViewsPerformanceMatchingSearchOnSpecificDate } from '@Apps/modules/video/application/dtos/video.res';
import { performanceLengthTestData } from '@Apps/modules/video/application/service/__dummy__';

const mockIGetVideoViewsMatchingSearchOnSpecificDateOutboundPort =
  mock<IGetVideoViewsMatchingSearchOnSpecificDateOutboundPort>();
let handler: FindPerformanceLengthService;
beforeEach(() => {
  handler = new FindPerformanceLengthService(
    mockIGetVideoViewsMatchingSearchOnSpecificDateOutboundPort,
  );
});
describe('execute 함수', () => {
  it('should ', async () => {
    mockIGetVideoViewsMatchingSearchOnSpecificDateOutboundPort.execute.mockReturnValue(
      Promise.resolve(performanceLengthTestData),
    );
    const dto: FindPerformanceLengthDto = {
      clusterNumber: ['0', '1'],
      search: '이태원',
      related: '몰라',
      from: '2023-10-12',
      to: '2023-10-14',
    };
    const res = await handler.execute(dto);
    console.log(res.unwrap().data);
  });
});
