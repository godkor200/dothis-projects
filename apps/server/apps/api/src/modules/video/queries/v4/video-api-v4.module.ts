import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { FindAccumulateVideosV4HttpController } from '@Apps/modules/video/queries/v4/find-accumulate-videos/find-accumulate-videos.http.controller';
import { FindAccumulateVideosV4QueryHandler } from '@Apps/modules/video/queries/v4/find-accumulate-videos/find-accumulate-videos.query-handler';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoQueryHandler } from '@Apps/modules/video/database/video.query-handler';

const controllers = [FindAccumulateVideosV4HttpController];
const queryHandlers: Provider[] = [
  {
    provide: VIDEO_OS_DI_TOKEN,
    useClass: VideoQueryHandler,
  },
  FindAccumulateVideosV4QueryHandler,
];

@Module({
  imports: [CqrsModule, AwsModule],
  controllers,
  providers: [...queryHandlers],
})
export class VideoApiV4Module {}
