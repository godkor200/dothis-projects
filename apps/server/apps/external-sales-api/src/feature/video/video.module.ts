import { Module, Provider } from '@nestjs/common';
import { PostReqVideoHttpController } from '@ExternalApps/feature/video/interface/http/post-req-video.http.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { PostReqVideoCommandHandler } from '@ExternalApps/feature/video/application/commands/post-req-video.command';
import {
  POST_REQUEST_VIDEO_SERVICE_TOKEN,
  REQUEST_VIDEO_REPOSITORY_DI_TOKEN,
} from '@ExternalApps/feature/video/video.di-token.constants';
import { PostReqVideoService } from '@ExternalApps/feature/video/application/post-req-video.service';
import { RequestVideoRepository } from '@ExternalApps/feature/video/domain/repositories/request-video.repository';
import { RequestVideoEntityModule } from '@ExternalApps/feature/video/domain/entities/request-video.entity.module';
import { AtStrategy } from '@Libs/commons/src';
import { PassportModule } from '@nestjs/passport';

const controllers = [PostReqVideoHttpController];
const command: Provider[] = [PostReqVideoCommandHandler];
const service: Provider[] = [
  {
    provide: POST_REQUEST_VIDEO_SERVICE_TOKEN,
    useClass: PostReqVideoService,
  },
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
