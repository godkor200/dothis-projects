import { Module } from '@nestjs/common';
import { VideoApiV1Module } from '@Apps/modules/video/interfaces/http/v1/video-api-v1.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    VideoApiV1Module,
    RouterModule.register([{ path: 'v1', module: VideoApiV1Module }]),
  ],
})
export class VideoApiModule {}
