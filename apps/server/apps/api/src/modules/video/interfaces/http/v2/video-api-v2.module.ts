import { Module, Provider } from '@nestjs/common';
import { FindVideosCountHttpController } from '@Apps/modules/video/interfaces/http/v2/find-video-count/find-video-count.http.controller';
import {
  VIDEO_CACHE_ADAPTER_DI_TOKEN,
  VIDEO_COUNT_GET_SERVICE_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import { FindVideoCountService } from '@Apps/modules/video/application/service/find-video-count.service';
import { FindVideoCountQueryHandler } from '@Apps/modules/video/application/queries/v1/find-video-count.query-handler';
import { VideoCacheAdapter } from '@Apps/modules/video/infrastructure/adapters';
import { CqrsModule, QueryBus } from '@nestjs/cqrs';

const controllers = [FindVideosCountHttpController];
const queryHandlers: Provider[] = [FindVideoCountQueryHandler];
const service: Provider[] = [
  {
    provide: VIDEO_COUNT_GET_SERVICE_DI_TOKEN,
    useClass: FindVideoCountService,
  },
];
const adapters: Provider[] = [
  { provide: VIDEO_CACHE_ADAPTER_DI_TOKEN, useClass: VideoCacheAdapter },
];
@Module({
  imports: [CqrsModule],
  controllers,
  providers: [...service, ...queryHandlers, ...adapters],
})
export class VideoApiV2Module {}
