import { PreviewVideoHttpController } from '@ExternalApps/feature/preview/interface/http/preview-video.http.controller';
import { PreviewVideoService } from '@ExternalApps/feature/preview/application/service/preview-video.service';
import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';

import { ChannelDataEntityModule } from '@ExternalApps/feature/video/domain/entities';
import { VideoDataEntityModule } from '@ExternalApps/feature/video/domain/entities/video-data-shorts.module';


const controllers = [PreviewVideoHttpController];
const repositories: Provider[] = [];
@Module({
  imports: [
    CqrsModule,
    HttpModule,
    ChannelDataEntityModule,
    VideoDataEntityModule,
  ],
  controllers,
  providers: [PreviewVideoService, ...repositories],
})
export class PreviewModule {}
