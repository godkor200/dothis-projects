import { ChannelHistoryAggregateService } from '@Apps/modules/channel-history/application/service/channel-history.aggregate.service';
import {
  calculateDailyPerformanceDummy,
  generateDummyData,
} from '@Apps/modules/channel-history/application/service/__dummy__/channel-history.dummy';

let service: ChannelHistoryAggregateService;
beforeEach(async () => {
  service = new ChannelHistoryAggregateService();
});

describe('비디오 히스토리 집계 함수 테스트', () => {
  it('비디오 히스토리 에서 재대로 계산이 되는가?', () => {
    const res = service.calculateDailyPerformance(generateDummyData(100));
    console.log(res);
  });
});
