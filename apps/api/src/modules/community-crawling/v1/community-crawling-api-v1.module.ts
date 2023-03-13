import { Module } from '@nestjs/common';
import { CommunityCrawlingEntityModule } from '@Apps/config/database/domain';

@Module({
  imports: [CommunityCrawlingEntityModule],
})
export class CommunityCrawlingApiV1Module {}
