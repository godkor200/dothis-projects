import { Injectable } from '@nestjs/common';
import {
  RedisOptionsFactory,
  RedisModuleOptions,
} from '@liaoliaots/nestjs-redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisConfigService implements RedisOptionsFactory {
  constructor(private configService: ConfigService) {}

  async createRedisOptions(): Promise<RedisModuleOptions> {
    return {
      config: [
        {
          host: this.configService.get<string>('redis.local.hostname'),
          port: this.configService.get<number>('redis.local.post'),
          password: this.configService.get<string>('redis.local.password'),
          db: this.configService.get<number>('redis.local.node'),
        },
        {
          namespace: 'onPromise',
          host: this.configService.get<string>('redis.onPromise.hostname'),
          port: this.configService.get<number>('redis.onPromise.port'),
          password: this.configService.get<string>('redis.onPromise.password'),
          db: this.configService.get<number>('redis.onPromise.node'),
        },
        {
          namespace: 'ranking',
          host: this.configService.get<string>('redis.local.hostname'),
          port: this.configService.get<number>('redis.local.post'),
          password: this.configService.get<string>('redis.local.password'),
          db: this.configService.get<number>('redis.ranking.node'),
        },
      ],
    };
  }
}
