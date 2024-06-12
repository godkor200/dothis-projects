import { Module, Provider } from '@nestjs/common';
import { FindVideosCountHttpController } from '@Apps/modules/video/interfaces/http/v2/find-video-count/find-video-count.http.controller';
import {
  VIDEO_CACHE_ADAPTER_DI_TOKEN,
  VIDEO_CACHE_MULTI_RELATE_WORDS_ADAPTER_DI_TOKEN,
  VIDEO_CACHE_PAGINAED_ADAPTER_DI_TOKEN,
  VIDEO_COUNT_GET_SERVICE_DI_TOKEN,
  VIDEO_GET_PAGENATION_SERVICE_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import { FindVideoCountService } from '@Apps/modules/video/application/service/find-video-count.service';
import { FindVideoCountQueryHandler } from '@Apps/modules/video/application/queries/v1/find-video-count.query-handler';
import {
  VideoCacheAdapter,
  VideoMultiRelatedWordsCacheAdapter,
} from '@Apps/modules/video/infrastructure/adapters';
import { CqrsModule } from '@nestjs/cqrs';
import { FindVideoPageHttpController } from '@Apps/modules/video/interfaces/http/v2/find-video-paging/find-video-page.http.controller';
import { FindVideoPageQueryHandler } from '@Apps/modules/video/application/queries/v2/find-video-page.query-handler';
import { GetVideoDataV2PaginatedService } from '@Apps/modules/video/application/service/get-video-data.v2.paginated.service';
import { VideoNoKeywordPaginatedAdapter } from '@Apps/modules/video/infrastructure/adapters/video-no-keyword.paginated.adapter';
import { IgniteModule } from '@Apps/common/ignite/ignite.module';

const controllers = [
  FindVideosCountHttpController,
  FindVideoPageHttpController,
];
const queryHandlers: Provider[] = [
  FindVideoCountQueryHandler,
  FindVideoPageQueryHandler,
];
const service: Provider[] = [
  {
    provide: VIDEO_COUNT_GET_SERVICE_DI_TOKEN,
    useClass: FindVideoCountService,
  },
  {
    provide: VIDEO_GET_PAGENATION_SERVICE_DI_TOKEN,
    useClass: GetVideoDataV2PaginatedService,
  },
  {
    provide: VIDEO_CACHE_MULTI_RELATE_WORDS_ADAPTER_DI_TOKEN,
    useClass: VideoMultiRelatedWordsCacheAdapter,
  },
  {
    provide: VIDEO_CACHE_PAGINAED_ADAPTER_DI_TOKEN,
    useClass: VideoNoKeywordPaginatedAdapter,
  },
];
const adapters: Provider[] = [
  { provide: VIDEO_CACHE_ADAPTER_DI_TOKEN, useClass: VideoCacheAdapter },
];
@Module({
  imports: [CqrsModule, IgniteModule],
  controllers,
  providers: [...service, ...queryHandlers, ...adapters],
})
export class VideoApiV2Module {}
