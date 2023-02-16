import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from '@Apps/api/src/config/database/domain/channel/Channel.entity';
import { DailyViews } from '@Apps/api/src/config/database/domain/daily_views/DailyViews.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channel, DailyViews])],
  exports: [TypeOrmModule],
})
export class VideosModule {}
