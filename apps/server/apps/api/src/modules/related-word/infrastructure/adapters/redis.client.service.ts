import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class RedisClientService {
  protected readonly redisClient: Redis;

  constructor(protected readonly redisService: RedisService) {
    this.redisClient = this.redisService.getClient();
  }
  async findAllKeys(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.redisClient.keys('*', (err, keys) => {
        if (err) {
          reject(err);
        } else {
          resolve(keys);
        }
      });
    });
  }
}
