import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { DailyViewQueryV1Module } from '@Apps/modules/hits/interfaces/http/controllers/v1/daily-view-query-v1.module';

@Module({
  imports: [
    DailyViewQueryV1Module,
    RouterModule.register([{ path: 'v1', module: DailyViewQueryV1Module }]),
    /**
     * 레거시
     */
    // DailyViewsQueryV3Module,
    // RouterModule.register([{ path: 'v3', module: DailyViewsQueryV3Module }]),
  ],
})
export class HitsApiModule {}
