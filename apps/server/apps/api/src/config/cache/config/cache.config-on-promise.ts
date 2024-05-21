import { Injectable, Inject } from '@nestjs/common';
import {
  RedisOptionsFactory,
  RedisModuleOptions,
} from '@liaoliaots/nestjs-redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisConfigOnPromiseService implements RedisOptionsFactory {
  constructor(
    private configService: ConfigService,
    @Inject('DB_ON_PROMISE_CONNECTION') private dbConnection: number, // 파라미터 추가
  ) {}

  async createRedisOptions(): Promise<RedisModuleOptions> {
    return {
      config: {
        host: this.configService.get<string>('REDIS_ON_PROMISE_PORT'),
        port: this.configService.get<number>('REDIS_ON_PROMISE_HOSTNAME'),
        password: this.configService.get<string>('REDIS_ON_PROMISE_PASSWORD'),
        db: this.dbConnection,
      },
    };
  }
}
