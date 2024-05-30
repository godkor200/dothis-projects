import { Module, Provider } from '@nestjs/common';
import {
  ANALYSIS_HITS_V2_SERVICE_DI_TOKEN,
  WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN,
  WEEKLY_VIEWS_SERVICE_V2_DI_TOKEN,
} from '@Apps/modules/hits/hits.di-token.contants';
import { WeeklyHitsV2Repository } from '@Apps/modules/hits/infrastructure/repositories/weekly-hits.v2.repository';
import { GetWeeklyHitsListV2HttpController } from '@Apps/modules/hits/interfaces/http/controllers/v2/get-weekly-hits-list/get-weekly-hits-list.v2.http.controller';
import { WeeklyHitsV2Service } from '@Apps/modules/hits/application/services/weekly-hits.v2.service';
import { GetWeeklyHitsV2QueryHandler } from '@Apps/modules/hits/application/queries/get-weekly-hits.v2.query-handler';
import { WeeklyHitsEntityModule } from '@Apps/modules/hits/domain/entities/weekly-hits.entity.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AnalysisHitsV2Service } from '@Apps/modules/hits/application/services/analysis-hits.v2.service';
import { AnalysisHitsV2Controller } from '@Apps/modules/hits/interfaces/http/controllers/v2/analysis-hits/analysis-hits.http.v2.controller';
import { VideoCacheAdapter } from '@Apps/modules/video/infrastructure/adapters/cache/video.cache.adapter';
import { VIDEO_CACHE_ADAPTER_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { AnalysisHitsV2QueryHandler } from '@Apps/modules/hits/application/queries/analysis-hits.v2.query-handler';
import { VIDEO_HISTORY_GET_LIST_ADAPTER_IGNITE_DI_TOKEN } from '@Apps/modules/video-history/video_history.di-token';
import { VideoHistoryGetMultipleByIdV2Adapter } from '@Apps/modules/video-history/infrastructure/adapters/new/video-history.get-multiple-by-id.adapter';
import { IgniteModule } from '@Apps/common/ignite/ignite.module';
import { CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN } from '@Apps/modules/channel-history/channel-history.di-token.constants';
import { ChannelHistoryByChannelIdAdapter } from '@Apps/modules/channel-history/infrastructure/adapters';

const controllers = [
  GetWeeklyHitsListV2HttpController,
  AnalysisHitsV2Controller,
];
const query: Provider[] = [
  GetWeeklyHitsV2QueryHandler,
  AnalysisHitsV2QueryHandler,
];
const service: Provider[] = [
  { provide: WEEKLY_VIEWS_SERVICE_V2_DI_TOKEN, useClass: WeeklyHitsV2Service },
  {
    provide: ANALYSIS_HITS_V2_SERVICE_DI_TOKEN,
    useClass: AnalysisHitsV2Service,
  },
];
const repository: Provider[] = [
  {
    provide: WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN,
    useClass: WeeklyHitsV2Repository,
  },
  { provide: VIDEO_CACHE_ADAPTER_DI_TOKEN, useClass: VideoCacheAdapter },
  {
    provide: VIDEO_HISTORY_GET_LIST_ADAPTER_IGNITE_DI_TOKEN,
    useClass: VideoHistoryGetMultipleByIdV2Adapter,
  },
  {
    provide: CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN,
    useClass: ChannelHistoryByChannelIdAdapter,
  },
];
@Module({
  imports: [CqrsModule, IgniteModule, WeeklyHitsEntityModule],
  controllers,
  providers: [...service, ...query, ...repository],
})
export class HitsV2Module {}
