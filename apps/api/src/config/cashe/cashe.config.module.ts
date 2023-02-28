import { Module } from '@nestjs/common';
import { RedisModule, RedisModuleAsyncOptions } from '@liaoliaots/nestjs-redis';
import { RedisConfigService } from '@Apps/config/cashe/config/cashe.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheService } from '@Apps/modules/cache/cache.service';

@Module({
  imports: [RedisModule],
  providers: [CacheService],
  exports: [CacheService],
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
