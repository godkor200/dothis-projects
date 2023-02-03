import { Test, TestingModule } from '@nestjs/testing';
import { GetUserChannelDataHttpController } from '../commands/get-user-channel-data/get-user-channel-data.http.controller';

describe('UserChannelDataController', () => {
  let controller: GetUserChannelDataHttpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetUserChannelDataHttpController],
      providers: [],
    }).compile();

    controller = module.get<GetUserChannelDataHttpController>(
      GetUserChannelDataHttpController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
