import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ExpectedViewsQueryHandler } from '@Apps/modules/channel_history/queries/v1/exprected-views/expected-views.query-handler';
import { ExpectedViewsHttpController } from '@Apps/modules/channel_history/queries/v1/exprected-views/expected-views.http.controller';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoQueryHandler } from '@Apps/modules/video/database/video.query-handler';

const controllers = [ExpectedViewsHttpController];
const repositories: Provider[] = [
  {
    provide: VIDEO_OS_DI_TOKEN,
    useClass: VideoQueryHandler,
  },
];
@Module({
  imports: [CqrsModule],
  controllers,
  providers: [...repositories, ExpectedViewsQueryHandler],
})
export class ChannelHistoryV1Module {}
