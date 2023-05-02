import { Module } from '@nestjs/common';
import { RelWordsApiV1Modules } from './v1/rel-words-v1.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    RelWordsApiV1Modules,
    RouterModule.register([{ path: 'v1', module: RelWordsApiV1Modules }]),
  ],
})
export class RelWordsApiModules {}
