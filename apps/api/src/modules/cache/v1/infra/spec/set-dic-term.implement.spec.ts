import { SetDicTermImplement } from '../set-dic-term.implement';
import { Test } from '@nestjs/testing';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisConfigService } from '@Apps/config/cache/config/cache.config';
import { dicTermDummy } from '@Apps/modules/cache/v1/infra/spec/__mock__/dic-term.dummy';

describe('SetDicTermImplement', () => {
  let setDicTermImplement: SetDicTermImplement;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        RedisModule.forRootAsync({
          imports: [ConfigModule],
          useClass: RedisConfigService,
          inject: [ConfigService],
        }),
      ],
      providers: [SetDicTermImplement],
    }).compile();
    setDicTermImplement =
      moduleRef.get<SetDicTermImplement>(SetDicTermImplement);
  });
  describe('set', () => {
    it('should be defined', () => {
      expect(setDicTermImplement.setDicTerm(dicTermDummy)).toBeDefined();
    });
    it('should return Ok', async () => {
      const result = await setDicTermImplement.setDicTerm(dicTermDummy);
      expect(result).toBe('OK');
    });
  });
});
