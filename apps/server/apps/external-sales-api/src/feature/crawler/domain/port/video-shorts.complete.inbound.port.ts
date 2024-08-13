import { CompleteVideoShortsDto } from '@ExternalApps/feature/crawler/application/dto/complete.dto';
import { Result } from 'oxide.ts';
import { VideoNotFoundException } from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/video.error';
import { InternalServerErrorException } from '@nestjs/common';

export type CompleteVideoShortsResponse = Result<
  boolean,
  VideoNotFoundException | InternalServerErrorException
>;

export interface VideoShortsInboundPort {
  execute(
    command: CompleteVideoShortsDto,
  ): Promise<CompleteVideoShortsResponse>;
}
