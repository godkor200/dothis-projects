import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from '@Apps/config/database/domain/channel/Channel.entity';
import { DailyViews } from '@Apps/config/database/domain/daily_views/DailyViews.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channel, DailyViews])],
  exports: [TypeOrmModule],
})
export class VideosModule {}
