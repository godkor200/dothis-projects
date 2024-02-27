import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { RelWordsApiV1Modules } from '@Apps/modules/related-word/queries/v1/rel-words-v1.module';
import { RelWordsApiV2Modules } from '@Apps/modules/related-word/queries/v2/rel-words-v2.module';
import { CacheConfigModule } from '@Apps/config/cache/cache.config.module';

@Module({
  imports: [
    RelWordsApiV1Modules,
    RelWordsApiV2Modules,
    RouterModule.register([{ path: 'v1', module: RelWordsApiV1Modules }]),
    RouterModule.register([{ path: 'v2', module: RelWordsApiV2Modules }]),
  ],
})
export class RelWordsApiModules {}
