import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyViews } from './DailyViews.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DailyViews])],
  exports: [TypeOrmModule],
})
export class DailyViewsModule {}
