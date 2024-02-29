import { mock } from 'jest-mock-extended';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { ConfigService } from '@nestjs/config';
import { RelatedVideoAndVideoHistoryDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
const mockConfigService = mock<ConfigService>();
const mockIgniteService = mock<IgniteService>();
let handler: VideoBaseAdapter;
beforeEach(async () => {
  handler = new VideoBaseAdapter(mockConfigService);
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
