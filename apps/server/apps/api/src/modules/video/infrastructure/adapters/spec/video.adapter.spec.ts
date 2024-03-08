import { mock } from 'jest-mock-extended';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { ConfigService } from '@nestjs/config';
const mockConfigService = mock<ConfigService>();
const mockIgniteService = mock<IgniteService>();
let handler: VideoBaseAdapter;
beforeEach(async () => {
  handler = new VideoBaseAdapter(mockConfigService);
});
describe('에러 테스트', () => {
  it.todo('비디오 어뎁터 에러가 제대로 발생하는지 테스트');
});
