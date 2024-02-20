import { Module, Provider } from '@nestjs/common';
import { VIDEO_IGNITE_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoAdapter } from '@Apps/modules/video/infrastructure/adapters/video.adapter';

import { CqrsModule } from '@nestjs/cqrs';
import { FindVideoHttpController } from '@Apps/modules/video/interfaces/http/v1/find-video/find-video.http.controller';
import { FindVideoHandler } from '@Apps/modules/video/application/queries/v1/find-video.query-handler';

const controllers = [FindVideoHttpController];
const queryHandlers: Provider[] = [
  { provide: VIDEO_IGNITE_DI_TOKEN, useClass: VideoAdapter },
];
@Module({
  imports: [CqrsModule],
  controllers,
  providers: [...queryHandlers, FindVideoHandler],
})
export class VideoApiTestModule {}
