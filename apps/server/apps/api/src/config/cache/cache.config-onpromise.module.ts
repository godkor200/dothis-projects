import { RedisModule, RedisModuleAsyncOptions } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { RedisConfigOnPromiseService } from '@Apps/config/cache/config/cache.config-on-promise';

export const cacheConfigOnPromiseAsync: RedisModuleAsyncOptions = {
  imports: [ConfigModule],
  useClass: RedisConfigOnPromiseService,
  inject: [ConfigService],
};
@Module({
  imports: [RedisModule.forRootAsync(cacheConfigOnPromiseAsync)],
})
export class CacheConfigOnPromiseModule {}
