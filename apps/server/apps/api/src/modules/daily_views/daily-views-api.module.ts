import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { DailyViewsApiV2Module } from '@Apps/modules/daily_views/queries/v2/daily-views-api-v2.module';

@Module({
  imports: [
    DailyViewsApiV2Module,
    RouterModule.register([{ path: 'v2', module: DailyViewsApiV2Module }]),
  ],
})
export class DailyViewsApiModule {}
