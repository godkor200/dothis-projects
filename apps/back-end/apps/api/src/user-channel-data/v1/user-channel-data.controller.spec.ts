import { Test, TestingModule } from '@nestjs/testing';
import { UserChannelDataController } from './user-channel-data.controller';
import { UserChannelDataService } from '../user-channel-data.service';

describe('UserChannelDataController', () => {
  let controller: UserChannelDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserChannelDataController],
      providers: [UserChannelDataService],
    }).compile();

    controller = module.get<UserChannelDataController>(
      UserChannelDataController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
