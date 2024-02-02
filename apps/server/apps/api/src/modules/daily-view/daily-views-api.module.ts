import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { DailyViewsQueryV3Module } from '@Apps/modules/daily-view/http/controller/queries/v3/daily-views-query-v3.module';
import { DailyViewQueryV1Module } from '@Apps/modules/daily-view/http/controller/queries/v1/daily-view-query-v1.module';

@Module({
  imports: [
    DailyViewQueryV1Module,
    DailyViewsQueryV3Module,
    RouterModule.register([{ path: 'v1', module: DailyViewQueryV1Module }]),
    RouterModule.register([{ path: 'v3', module: DailyViewsQueryV3Module }]),
  ],
})
export class DailyViewsApiModule {}
