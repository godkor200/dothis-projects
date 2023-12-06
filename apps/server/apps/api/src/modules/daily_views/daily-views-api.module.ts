import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { DailyViewsApiV3Module } from '@Apps/modules/daily_views/queries/v3/daily-views-api-v3.module';

@Module({
  imports: [
    DailyViewsApiV3Module,
    RouterModule.register([{ path: 'v3', module: DailyViewsApiV3Module }]),
  ],
})
export class DailyViewsApiModule {}
