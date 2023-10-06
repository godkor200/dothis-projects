import { Injectable, Inject } from '@nestjs/common';
import {
  RedisOptionsFactory,
  RedisModuleOptions,
} from '@liaoliaots/nestjs-redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisConfigService implements RedisOptionsFactory {
  constructor(
    private configService: ConfigService,
    @Inject('DB_CONNECTION') private dbConnection: number, // 파라미터 추가
  ) {}

  async createRedisOptions(): Promise<RedisModuleOptions> {
    return {
      config: {
        host: this.configService.get<string>('REDIS_HOSTNAME'),
        port: this.configService.get<number>('REDIS_PORT'),
        password: this.configService.get<string>('REDIS_PASSWORD'),
        db: this.dbConnection,
      },
    };
  }
}
