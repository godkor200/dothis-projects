import { PostReqVideoBody } from '@ExternalApps/feature/video/application/dto/post-req-video.dto';
import { TPostRequestVideoRes } from '@ExternalApps/feature/video/application/commands/post-req-video.command';

export interface PostReqVideoInboundPort {
  execute(command: PostReqVideoBody): Promise<TPostRequestVideoRes>;
}
