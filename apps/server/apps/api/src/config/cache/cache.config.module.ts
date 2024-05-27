import { Module } from '@nestjs/common';
import { RedisModule, RedisModuleAsyncOptions } from '@liaoliaots/nestjs-redis';
import { RedisConfigService } from 'apps/api/src/config/cache/config/cache.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FindDicTermImplement } from '@Apps/modules/related-word/infrastructure/adapters/find-dic-term.implement';

@Module({
  imports: [RedisModule],
  providers: [FindDicTermImplement],
  exports: [FindDicTermImplement],
})
export class CacheModule {}

export const cacheConfigAsync: RedisModuleAsyncOptions = {
  imports: [ConfigModule],
  useClass: RedisConfigService,
  inject: [ConfigService, 'DB_CONNECTION'],
  extraProviders: [
    {
      provide: 'DB_CONNECTION',
      useValue: 2,
    },
  ],
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

export const cacheConfigOnPromiseAsync: RedisModuleAsyncOptions = {
  imports: [ConfigModule],
  useClass: RedisConfigService,
  inject: [ConfigService, 'DB_ON_PROMISE_CONNECTION'],
  extraProviders: [
    {
      provide: 'DB_ON_PROMISE_CONNECTION',
      useValue: 0,
    },
  ],
  useFactory: (configService: ConfigService) => ({
    config: {
      host: configService.get<string>('REDIS_HOSTNAME'),
      port: configService.get<number>('REDIS_PORT'),
      password: configService.get<string>('REDIS_PASSWORD'),
      db: 0, // 온프로미스 레디스 db
    },
  }),
};
@Module({
  imports: [RedisModule.forRootAsync(cacheConfigOnPromiseAsync)],
})
export class CacheConfigOnPromiseModule {}
