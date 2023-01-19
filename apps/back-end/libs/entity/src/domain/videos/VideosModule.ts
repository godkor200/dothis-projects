import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from '@Libs/entity/src/domain/channel/Channel.entity';
import { DailyViews } from '@Libs/entity/src/domain/daily_views/DailyViews.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channel, DailyViews])],
  exports: [TypeOrmModule],
})
export class VideosModule {}
