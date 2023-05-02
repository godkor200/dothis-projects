import { Module } from '@nestjs/common';
import { CommunityCrawlingEntityModule } from 'apps/api/src/config/database/domain';

@Module({
  imports: [CommunityCrawlingEntityModule],
})
export class CommunityCrawlingApiV1Module {}
