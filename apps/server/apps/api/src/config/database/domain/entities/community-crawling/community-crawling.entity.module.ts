import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityCrawling as CommunityCrawlingEntity } from 'apps/api/src/config/database/domain/entities/community-crawling/community-crawling.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommunityCrawlingEntity])],
  exports: [TypeOrmModule],
})
export class CommunityCrawlingEntityModule {}
