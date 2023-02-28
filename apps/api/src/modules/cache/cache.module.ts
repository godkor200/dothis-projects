import { Module } from '@nestjs/common';
import { CacheV1Module } from '@Apps/modules/cache/v1/cacheV1.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    CacheV1Module,
    RouterModule.register([{ path: 'v1', module: CacheV1Module }]),
  ],
})
export class CacheApiModule {}
