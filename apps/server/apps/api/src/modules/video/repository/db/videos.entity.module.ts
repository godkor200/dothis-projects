import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyViewsEntity } from 'apps/api/src/modules/daily_views/repository/entity/daily-views.entity';
import { ChannelEntity } from 'apps/api/src/modules/channel/repository/entity/channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelEntity, DailyViewsEntity])],
  exports: [TypeOrmModule],
})
export class VideosEntityModule {}
