import { CompleteVideosController } from '@ExternalApps/feature/crawler/interface/complete-videos/complete-videos.http.controller';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VideoShortsCompleteService } from '@ExternalApps/feature/crawler/application/service/video-shorts.complete.service';
import { HttpModule } from '@nestjs/axios';
import { CRAWLED_VIDEO_REPOSITORY_DI_TOKEN } from '@ExternalApps/feature/video/video-data.di-token.constants';
import { CrawledVideoRepository } from '@ExternalApps/feature/video/domain/repositories/crawled-video.repository';
import { REQUEST_VIDEO_REPOSITORY_DI_TOKEN } from '@ExternalApps/feature/crawl-queue/video/video.di-token.constants';
import { RequestVideoRepository } from '@ExternalApps/feature/crawl-queue/video/domain/repositories/request-video.repository';
import { RequestVideoEntityModule } from '@ExternalApps/feature/crawl-queue/video/domain/entities/request-video.entity.module';

@Module({
  imports: [CqrsModule, HttpModule, RequestVideoEntityModule],
  controllers: [CompleteVideosController],
  providers: [
    VideoShortsCompleteService,
    {
      provide: CRAWLED_VIDEO_REPOSITORY_DI_TOKEN,
      useClass: CrawledVideoRepository,
    },
    {
      provide: REQUEST_VIDEO_REPOSITORY_DI_TOKEN,
      useClass: RequestVideoRepository,
    },
  ],
})
export class CrawlerModule {}
