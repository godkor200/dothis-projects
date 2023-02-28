import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyViews } from './DailyViews.entity';
import { Video } from '@Apps/config/database/domain/videos/Videos.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Video, DailyViews])],
  exports: [TypeOrmModule],
})
export class DailyViewsModule {}
