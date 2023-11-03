import { Module } from '@nestjs/common';
import { RedisModule, RedisModuleAsyncOptions } from '@liaoliaots/nestjs-redis';
import { RedisConfigService } from 'apps/api/src/config/cache/config/cache.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FindDicTermImplement } from 'apps/api/src/modules/cache/infra/find-dic-term.implement';

@Module({
  imports: [RedisModule],
  providers: [FindDicTermImplement],
  exports: [FindDicTermImplement],
})
export class CacheModule {}
export const cacheConfigAsync: RedisModuleAsyncOptions = {
  imports: [ConfigModule],
  useClass: RedisConfigService,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    config: {
      host: configService.get<string>('REDIS_HOSTNAME'),
      port: configService.get<number>('REDIS_PORT'),
      password: configService.get<string>('REDIS_PASSWORD'),
      db: 2, // 연관어 레디스 db
    },
  }),
};

@Module({
  imports: [RedisModule.forRootAsync(cacheConfigAsync), CacheModule],
})
export class CacheConfigModule {}
