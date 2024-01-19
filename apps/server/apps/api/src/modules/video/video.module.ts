import { Module } from '@nestjs/common';
import { VideoApiV1Module } from '@Apps/modules/video/queries/v1/video-api-v1.module';
import { RouterModule } from '@nestjs/core';
import { VideoApiV2Module } from '@Apps/modules/video/queries/v2/video-api-v2.module';

@Module({
  imports: [
    VideoApiV1Module,
    VideoApiV2Module,
    RouterModule.register([{ path: 'v1', module: VideoApiV1Module }]),
    RouterModule.register([{ path: 'v2', module: VideoApiV2Module }]),
  ],
})
export class VideoApiModule {}
