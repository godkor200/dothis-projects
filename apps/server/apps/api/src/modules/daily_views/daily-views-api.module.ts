import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { DailyViewsApiV2Module } from '@Apps/modules/daily_views/queries/v2/daily-views-api-v2.module';
import { DailyViewsApiV3Module } from '@Apps/modules/daily_views/queries/v3/daily-views-api-v3.module';

@Module({
  imports: [
    DailyViewsApiV2Module,
    DailyViewsApiV3Module,

    RouterModule.register([{ path: 'v2', module: DailyViewsApiV2Module }]),
    RouterModule.register([{ path: 'v3', module: DailyViewsApiV3Module }]),
  ],
})
export class DailyViewsApiModule {}
