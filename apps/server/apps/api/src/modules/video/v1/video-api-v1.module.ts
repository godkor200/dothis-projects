import { Module } from '@nestjs/common';
import { FindVideoHttpController } from '@Apps/modules/video/v1/find-video/find-video.http.controller';

@Module({
  controllers: [FindVideoHttpController],
})
export class VideoApiV1Module {}
