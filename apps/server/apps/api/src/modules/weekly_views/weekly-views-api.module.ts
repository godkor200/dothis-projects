import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { WeeklyViewsV1Module } from '@Apps/modules/weekly_views/queries/weekly_views.v1.module';

@Module({
  imports: [
    WeeklyViewsV1Module,
    RouterModule.register([{ path: 'v1', module: WeeklyViewsV1Module }]),
  ],
})
export class WeeklyViewsApiModule {}
