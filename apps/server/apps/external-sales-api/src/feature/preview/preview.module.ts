import { PreviewVideoHttpController } from '@ExternalApps/feature/preview/interface/http/preview-video.http.controller';
import { PreviewVideoService } from '@ExternalApps/feature/preview/application/service/preview-video.service';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

const controllers = [PreviewVideoHttpController];
@Module({
  imports: [CqrsModule],
  controllers,
  providers: [PreviewVideoService],
})
export class PreviewModule {}
