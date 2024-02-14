import { Module } from '@nestjs/common';
import { VideoApiV1Module } from '@Apps/modules/video/http/v1/video-api-v1.module';
import { RouterModule } from '@nestjs/core';
import { VideoApiV2Module } from '@Apps/modules/video/http/v2/video-api-v2.module';
import { VideoApiV4Module } from '@Apps/modules/video/http/v4/video-api-v4.module';
import { VideoApiTestModule } from '@Apps/modules/video/http/test/video-api-test.module';

@Module({
  imports: [
    VideoApiV1Module,
    VideoApiV2Module,
    VideoApiV4Module,
    VideoApiTestModule,
    RouterModule.register([{ path: 'v1', module: VideoApiV1Module }]),
    RouterModule.register([{ path: 'v2', module: VideoApiV2Module }]),
    RouterModule.register([{ path: 'v4', module: VideoApiV4Module }]),
    RouterModule.register([{ path: 'test', module: VideoApiTestModule }]),
  ],
})
export class VideoApiModule {}
