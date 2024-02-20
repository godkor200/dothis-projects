import { mock } from 'jest-mock-extended';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { VideoAdapter } from '@Apps/modules/video/infrastructure/adapters/video.adapter';
import { ConfigService } from '@nestjs/config';
import { RelatedVideoAndVideoHistoryDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
const mockConfigService = mock<ConfigService>();
const mockIgniteService = mock<IgniteService>();
let handler: VideoAdapter;
beforeEach(async () => {
  handler = new VideoAdapter(mockConfigService);
});
describe('에러 테스트', () => {
  it('', async () => {
    const testDao: RelatedVideoAndVideoHistoryDao = {
      search: '먹방',
      clusterNumber: '2',
      related: '떡뽁이',
    };
    await handler.getRelatedVideoAndVideoHistory(testDao);
  });
});
