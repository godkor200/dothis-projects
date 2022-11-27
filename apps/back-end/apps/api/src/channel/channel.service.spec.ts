import { Test, TestingModule } from '@nestjs/testing';
import { ChannelApiService } from './ChannelApi.service';

describe('ChannelService', () => {
  let service: ChannelApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelApiService],
    }).compile();

    service = module.get<ChannelApiService>(ChannelApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
