import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { DailyViewsApiV1Module } from './v1/daily-views-api-v1.module';

@Module({
  imports: [
    DailyViewsApiV1Module,
    RouterModule.register([{ path: 'v1', module: DailyViewsApiV1Module }]),
  ],
})
export class DailyViewsApiModule {}
