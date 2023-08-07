import { Module, Provider } from '@nestjs/common';
import { VIDEO_HISTORY_DI_TOKEN } from '@Apps/modules/video_history/video_history.di-token';
import { VideoHistoryQueryHandler } from '@Apps/modules/video_history/database/video_history.query-handler';
import { AwsModule } from '@Apps/common/aws/aws.module';

const queryHandlers: Provider[] = [
  {
    provide: VIDEO_HISTORY_DI_TOKEN.FIND_HISTORY,
    useClass: VideoHistoryQueryHandler,
  },
];
@Module({
  imports: [AwsModule],
  providers: [...queryHandlers],
})
export class VideoHistoryApiModule {}
