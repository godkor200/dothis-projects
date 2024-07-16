import { DelReqVideoDto } from '@ExternalApps/feature/crawl-queue/video/application/dto/delete-req-video.dto';
import { Result } from 'oxide.ts';
import { VideoNotFoundException } from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/video.error';

export type TDelRequestVideoRes = Result<boolean, VideoNotFoundException>;

export interface DelReqVideoInboundPort {
  execute(command: DelReqVideoDto): Promise<TDelRequestVideoRes>;
}
