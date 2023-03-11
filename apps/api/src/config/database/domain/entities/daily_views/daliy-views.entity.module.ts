import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyViews } from './daily-views.entity';
import { Video } from '@Apps/config/database/domain/entities/videos/videos.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Video, DailyViews])],
  exports: [TypeOrmModule],
})
export class DailyViewsModule {}
