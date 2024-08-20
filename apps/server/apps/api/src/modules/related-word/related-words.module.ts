import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { RelatedWordsV1Module } from '@Apps/modules/related-word/interfaces/http/queries/v1/related-words-v1.module';
import { RelatedWordsV2Module } from '@Apps/modules/related-word/interfaces/http/queries/v2/related-words-v2.module';

@Module({
  imports: [
    RelatedWordsV1Module,
    RelatedWordsV2Module,
    RouterModule.register([{ path: 'v1', module: RelatedWordsV1Module }]),
    RouterModule.register([{ path: 'v2', module: RelatedWordsV2Module }]),
  ],
})
export class RelatedWordsApiModule {}
