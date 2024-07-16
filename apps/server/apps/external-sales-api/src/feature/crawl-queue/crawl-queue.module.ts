import { Module } from '@nestjs/common';
import { VideoModule } from '@ExternalApps/feature/crawl-queue/video/video.module';
import { ChannelModule } from '@ExternalApps/feature/crawl-queue/channel/channel.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ChannelModule,
    VideoModule,
    RouterModule.register([{ path: 'crawl-queue', module: VideoModule }]),
    RouterModule.register([{ path: 'crawl-queue', module: ChannelModule }]),
  ],
})
export class CrawlQueueModule {}
