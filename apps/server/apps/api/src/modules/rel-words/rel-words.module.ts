import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { RelWordsApiV1Modules } from '@Apps/modules/rel-words/queries/v1/rel-words-v1.module';
import { RelWordsApiV2Modules } from '@Apps/modules/rel-words/queries/v2/rel-words-v2.module';

@Module({
  imports: [
    RelWordsApiV1Modules,
    RouterModule.register([{ path: 'v1', module: RelWordsApiV1Modules }]),
    RouterModule.register([{ path: 'v2', module: RelWordsApiV2Modules }]),
  ],
})
export class RelWordsApiModules {}
