import { Test, TestingModule } from '@nestjs/testing';
import { HeathApiController } from './health.controller';
import { HealthService } from '@Apps/api/src/health/health.service';

describe('ApiController', () => {
  let apiController: HeathApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HeathApiController],
      providers: [HealthService],
    }).compile();

    apiController = app.get<HeathApiController>(HeathApiController);
  });

  describe('헬스 체크', () => {
    it('"Hello dothis World!"를 리턴해야합니다.', () => {
      expect(apiController.getHello()).toBe('Hello dothis World!');
    });
  });
});
