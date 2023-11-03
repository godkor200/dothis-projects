import { Module, Provider } from '@nestjs/common';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoQueryHandler } from '@Apps/modules/video/database/video.query-handler';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { CqrsModule } from '@nestjs/cqrs';
import { FindVideoHandler } from '@Apps/modules/video/queries/v1/find-video/find-video.query-handler';
import { FindVideoPageHttpController } from '@Apps/modules/video/queries/v1/find-video-paging/find-video-page.http.controller';
import { FindVideoPageQueryHandler } from '@Apps/modules/video/queries/v1/find-video-paging/find-video-page.query-handler';

const commandHandlers: Provider[] = [];

const queryHandlers: Provider[] = [
  {
    provide: VIDEO_OS_DI_TOKEN,
    useClass: VideoQueryHandler,
  },
  FindVideoHandler,
  FindVideoPageQueryHandler,
];
@Module({
  imports: [CqrsModule, AwsModule],
  controllers: [FindVideoPageHttpController],
  providers: [...queryHandlers, ...commandHandlers],
})
export class VideoApiV1Module {}
