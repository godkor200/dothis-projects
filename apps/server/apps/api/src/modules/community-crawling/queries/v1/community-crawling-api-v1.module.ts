import { Module } from '@nestjs/common';
import { CommunityCrawlingEntityModule } from '@Apps/modules/community-crawling/domain/community-crawling.entity.module';

@Module({
  imports: [CommunityCrawlingEntityModule],
})
export class CommunityCrawlingApiV1Module {}
