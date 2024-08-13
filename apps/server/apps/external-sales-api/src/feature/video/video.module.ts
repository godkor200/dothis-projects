import { Module, Provider } from '@nestjs/common';

import { VideoCommentsHttpController } from '@ExternalApps/feature/video/interface/http/video-comments.http.controller';

import { CqrsModule } from '@nestjs/cqrs';
import { VideoCommentsService } from '@ExternalApps/feature/video/application/service/video-comments.service';
import { HttpModule } from '@nestjs/axios';

const controllers = [VideoCommentsHttpController];
const services: Provider[] = [VideoCommentsService];
const repositories: Provider[] = [];
@Module({
  imports: [CqrsModule, HttpModule],
  controllers,
  providers: [...services, ...repositories],
})
export class VideoModule {}
