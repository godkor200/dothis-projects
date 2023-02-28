import { Module } from '@nestjs/common';
import { CacheV1Module } from '@Apps/modules/cashe/v1/cacheV1.module';

@Module({
  imports: [CacheV1Module],
})
export class CacheModule {}
