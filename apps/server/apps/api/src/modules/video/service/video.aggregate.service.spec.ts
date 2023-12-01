import { VideoAggregateService } from '@Apps/modules/video/service/video.aggregate.service';
import { data } from '@Apps/modules/video/service/__dummy__';

let handler: VideoAggregateService;
beforeEach(() => {
  handler = new VideoAggregateService();
});
describe('calculateIncrease 함수', () => {
  it('should ', async () => {
    const res = handler.calculateIncrease(data);
  });
});
