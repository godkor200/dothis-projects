import { Module, Provider } from '@nestjs/common';
import { PostReqVideoHttpController } from '@ExternalApps/feature/crawl-queue/video/interface/http/post-req-video.http.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { PostReqVideoCommandHandler } from '@ExternalApps/feature/crawl-queue/video/application/commands/post-req-video.command';
import {
  POST_REQUEST_VIDEO_SERVICE_TOKEN,
  REQUEST_VIDEO_REPOSITORY_DI_TOKEN,
} from '@ExternalApps/feature/crawl-queue/video/video.di-token.constants';
import { PostReqVideoService } from '@ExternalApps/feature/crawl-queue/video/application/service/post-req-video.service';
import { RequestVideoRepository } from '@ExternalApps/feature/crawl-queue/video/domain/repositories/request-video.repository';
import { RequestVideoEntityModule } from '@ExternalApps/feature/crawl-queue/video/domain/entities/request-video.entity.module';
import { AtStrategy } from '@Libs/commons/src';
import { PassportModule } from '@nestjs/passport';
import { DeleteReqVideoHttpController } from '@ExternalApps/feature/crawl-queue/video/interface/http/delete-req-video.http.controller';
import { DeleteReqVideoService } from '@ExternalApps/feature/crawl-queue/video/application/service/delete-req-video.service';
import { FetchReqVideoHttpController } from '@ExternalApps/feature/crawl-queue/video/interface/http/fetch-req-video.http.controller';
import { FetchReqVideoService } from '@ExternalApps/feature/crawl-queue/video/application/service/fetch-req-video.service';
import {
  CHANNEL_DATA_REPOSITORY_DI_TOKEN,
  CHANNEL_HISTORY_REPOSITORY_DI_TOKEN,
} from '@ExternalApps/feature/channel/channel-data.di-token.constants';
import { ChannelDataRepository } from '@ExternalApps/feature/channel/infrastructure/repositories/channel-data.repository';
import {
  VIDEO_DATA_REPOSITORY_DI_TOKEN,
  VIDEO_HISTORY_REPOSITORY_DI_TOKEN,
} from '@ExternalApps/feature/video/video-data.di-token.constants';
import { VideoDataRepository } from '@ExternalApps/feature/video/infrastructure/repositories/video-data.repository';
import { ChannelHistoryRepository } from '@ExternalApps/feature/channel/infrastructure/repositories/channel-history.repository';
import { VideoHistoryRepository } from '@ExternalApps/feature/video/infrastructure/repositories/video-history.repository';
import { HttpModule } from '@nestjs/axios';
import { VideoDataEntityModule } from '@ExternalApps/feature/video/domain/entities/video-data-shorts.module';
import { ChannelDataEntityModule } from '@ExternalApps/feature/video/domain/entities';


const controllers = [
  PostReqVideoHttpController,
  DeleteReqVideoHttpController,
  FetchReqVideoHttpController,
];
const command: Provider[] = [PostReqVideoCommandHandler];
const service: Provider[] = [
  {
    provide: POST_REQUEST_VIDEO_SERVICE_TOKEN,
    useClass: PostReqVideoService,
  },
  DeleteReqVideoService,
  FetchReqVideoService,
];

const repositories: Provider[] = [
  {
    provide: REQUEST_VIDEO_REPOSITORY_DI_TOKEN,
    useClass: RequestVideoRepository,
  },
  {
    provide: CHANNEL_DATA_REPOSITORY_DI_TOKEN,
    useClass: ChannelDataRepository,
  },
  {
    provide: VIDEO_DATA_REPOSITORY_DI_TOKEN,
    useClass: VideoDataRepository,
  },
  {
    provide: CHANNEL_HISTORY_REPOSITORY_DI_TOKEN,
    useClass: ChannelHistoryRepository,
  },
  {
    provide: VIDEO_HISTORY_REPOSITORY_DI_TOKEN,
    useClass: VideoHistoryRepository,
  },
];
const strategies: Provider[] = [AtStrategy];

@Module({
  imports: [
    CqrsModule,
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    VideoDataEntityModule,
    ChannelDataEntityModule,
    RequestVideoEntityModule,
  ],
  controllers,
  providers: [...command, ...repositories, ...service, ...strategies],
})
export class VideoModule {}
