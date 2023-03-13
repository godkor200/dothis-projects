import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from '@Apps/config/database/domain/entities/channel/channel.entity';
import { DailyViews } from '@Apps/config/database/domain/entities/daily_views/daily-views.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channel, DailyViews])],
  exports: [TypeOrmModule],
})
export class VideosEntityModule {}
