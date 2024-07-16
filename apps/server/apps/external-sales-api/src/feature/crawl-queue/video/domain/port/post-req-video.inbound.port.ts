import { PostReqVideoBody } from '@ExternalApps/feature/crawl-queue/video/application/dto/post-req-video.dto';
import { TPostRequestVideoRes } from '@ExternalApps/feature/crawl-queue/video/application/commands/post-req-video.command';

export interface PostReqVideoInboundPort {
  execute(command: PostReqVideoBody): Promise<TPostRequestVideoRes>;
}
