import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { DailyViewsApiV1Module } from './v1/daily-views-api-v1.module';
import { DailyViewsApiV2Module } from './v2/daily-views-api-v2.module';

@Module({
  imports: [
    DailyViewsApiV1Module,
    DailyViewsApiV2Module,
    RouterModule.register([{ path: 'v1', module: DailyViewsApiV1Module }]),
    RouterModule.register([{ path: 'v2', module: DailyViewsApiV2Module }]),
  ],
})
export class DailyViewsApiModule {}
