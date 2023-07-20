import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityCrawling as CommunityCrawlingEntity } from '@Apps/modules/community-crawling/domain/community-crawling.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommunityCrawlingEntity])],
  exports: [TypeOrmModule],
})
export class CommunityCrawlingEntityModule {}
