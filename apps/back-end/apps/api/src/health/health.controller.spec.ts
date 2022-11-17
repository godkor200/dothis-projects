import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './health.controller';
import { HealthService } from '@Apps/api/src/health/health.service';

describe('ApiController', () => {
  let apiController: ApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [HealthService],
    }).compile();

    apiController = app.get<ApiController>(ApiController);
  });

  describe('헬스 체크', () => {
    it('"Hello dothis World!"를 리턴해야합니다.', () => {
      expect(apiController.getHello()).toBe('Hello dothis World!');
    });
  });
});
