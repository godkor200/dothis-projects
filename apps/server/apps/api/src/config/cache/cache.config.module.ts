import { Module } from '@nestjs/common';
import { RedisModule, RedisModuleAsyncOptions } from '@liaoliaots/nestjs-redis';
import { RedisConfigService } from 'apps/api/src/config/cache/config/cache.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const cacheConfigAsync: RedisModuleAsyncOptions = {
  imports: [ConfigModule],
  useClass: RedisConfigService,
  inject: [ConfigService],
};

@Module({
  imports: [RedisModule.forRootAsync(cacheConfigAsync)],
  exports: [RedisModule],
})
export class CacheConfigModule {}
