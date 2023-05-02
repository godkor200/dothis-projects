import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyViewsEntity } from './daily-views.entity';
import { VideoEntity } from 'apps/api/src/modules/video/repository/db/videos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity, DailyViewsEntity])],
  exports: [TypeOrmModule],
})
export class DailyViewsEntityModule {}
