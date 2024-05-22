import { Injectable, Inject } from '@nestjs/common';
import {
  RedisOptionsFactory,
  RedisModuleOptions,
} from '@liaoliaots/nestjs-redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisConfigOnPromiseService implements RedisOptionsFactory {
  constructor(private configService: ConfigService) {}

  async createRedisOptions(): Promise<RedisModuleOptions> {
    return {
      config: {
        host: this.configService.get<string>('redis.onPromise.hostname'),
        port: this.configService.get<number>('redis.onPromise.port'),
        password: this.configService.get<string>('redis.onPromise.password'),
        db: this.configService.get<number>('redis.onPromise.node'),
      },
    };
  }
}
