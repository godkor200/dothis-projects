import { FindRelCachePort } from '@Apps/modules/rel-words/repository/cache/find-rel.cache.port';
import { RedisClientService } from '@Apps/modules/cache/infra/redis.client.service';
import { NotFoundException } from '@nestjs/common';

export class FindRelCache
  extends RedisClientService
  implements FindRelCachePort
{
  async findOneRelWord(keyword: string): Promise<string> {
    const result: string = await this.redisClient.get(keyword);
    if (!result) {
      throw new NotFoundException('not found');
    }
    return result;
  }
  async setAutoCompleteWord(words: string[]): Promise<boolean> {
    for await (const [index, word] of words.entries()) {
      const trimmedWord = word.trim();

      for (let l = 0; l <= trimmedWord.length; l++) {
        const prefix = trimmedWord.slice(0, l);
        await this.redisClient.zadd('autocomplete', '0', prefix);
      }

      const completedWord = `${trimmedWord}*`;
      console.log(completedWord, index);
      await this.redisClient.zadd('autocomplete', '0', completedWord);
    }
    return true;
  }

  async findAutoCompleteWords(words: string): Promise<any> {
    // "메" 이후에 오는 가장 작은 문자열 (즉, "메")와
    // "메" 이후에 오는 가장 큰 문자열 (즉, "멕")을 계산합니다.
    const min = `[${words}`;
    const max = `[${String.fromCharCode(words.charCodeAt(0) + 1)}`;
    return this.redisClient.zrangebylex('autocomplete', min, max);
  }
}
