import { Test, TestingModule } from '@nestjs/testing';
import { UserChannelDataService } from './user-channel-data.service';

describe('UserChannelDataService', () => {
  let service: UserChannelDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserChannelDataService],
    }).compile();

    service = module.get<UserChannelDataService>(UserChannelDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
