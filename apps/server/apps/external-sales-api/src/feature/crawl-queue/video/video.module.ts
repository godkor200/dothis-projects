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
const repository: Provider[] = [
  {
    provide: REQUEST_VIDEO_REPOSITORY_DI_TOKEN,
    useClass: RequestVideoRepository,
  },
];
const strategies: Provider[] = [AtStrategy];

@Module({
  imports: [
    CqrsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    RequestVideoEntityModule,
  ],
  controllers,
  providers: [...command, ...repository, ...service, ...strategies],
})
export class VideoModule {}
