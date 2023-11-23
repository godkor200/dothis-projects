import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { CommunityCrawlingApiV1Module } from '@Apps/modules/community-crawling/queries/v1/community-crawling-api-v1.module';

@Module({
  imports: [
    CommunityCrawlingApiV1Module,
    RouterModule.register([
      { path: 'v1', module: CommunityCrawlingApiV1Module },
    ]),
  ],
})
export class CommunityCrawlingApiModule {}
