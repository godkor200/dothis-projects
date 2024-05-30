import { Module } from '@nestjs/common';
import { RedisClientService } from '@Apps/common/redis/service/redis.client.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [RedisModule],
  providers: [RedisClientService],
  exports: [RedisClientService],
})
export class RedisConnectionModule {}
