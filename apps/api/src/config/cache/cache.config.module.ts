import { Module } from '@nestjs/common';
import { RedisModule, RedisModuleAsyncOptions } from '@liaoliaots/nestjs-redis';
import { RedisConfigService } from '@Apps/config/cache/config/cache.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FindDicTermImplement } from '@Apps/modules/cache/infra/find-dic-term.implement';

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
};

@Module({
  imports: [RedisModule.forRootAsync(cacheConfigAsync), CacheModule],
})
export class CacheConfigModule {}
