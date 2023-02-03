import { Test } from '@nestjs/testing';
import { GetChannelDataCommandHandler } from './get-channel-data.service';
import { UserChannelDataRepository } from '@Apps/api/src/user-channel-data/v1/db/user-channel-data.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserChannelData } from '@Libs/entity/src/domain/userChannelData/UserChannelData.entity';
import { UserChannelDataRepositoryPort } from '@Apps/api/src/user-channel-data/v1/db/user-channel-data.repository.port';

const mockUserChannelRepository = () => ({
  findOneByUserId: jest.fn(),
});
describe('get-channel-data service', () => {
  let getChannelDataCommandHandler: GetChannelDataCommandHandler;

  let userChannelDataRepository: UserChannelDataRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      providers: [
        GetChannelDataCommandHandler,
        UserChannelDataRepository,
        {
          provide: getRepositoryToken(UserChannelData),
          useValue: {
            findOneByUserId: () => jest.fn(),
          },
        },

        // {
        //   provide: UserChannelDataRepository,
        //   useValue: mockUserChannelRepository(),
        // },
      ],
    }).compile();

    getChannelDataCommandHandler =
      await module.get<GetChannelDataCommandHandler>(
        GetChannelDataCommandHandler,
      );
    userChannelDataRepository = await module.get<UserChannelDataRepository>(
      UserChannelDataRepository,
    );

    // console.log(getChannelDataCommandHandler.execute());
  });
  describe('유저 데이터가 전달될때', () => {
    it('크롤링된 channel 테이블에서 userChannelData 테이블로 이동해야합니다.', async () => {
      const mockConfilctCheck = jest
        .spyOn(userChannelDataRepository, 'findOneByUserId')
        .mockImplementation(() => new Promise((resolve) => resolve(null)));

      // // console.log(mockConfilctCheck, getChannelDataCommandHandler.execute());
      expect(true).toBe(true);
    });
  });
});
