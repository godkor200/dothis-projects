import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { RelWordsApiV1Modules } from '@Apps/modules/related-word/interfaces/http/queries/v1/rel-words-v1.module';

@Module({
  imports: [
    RelWordsApiV1Modules,
    RouterModule.register([{ path: 'v1', module: RelWordsApiV1Modules }]),
  ],
})
export class RelatedWordsApiModule {}
