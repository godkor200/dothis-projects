import { DelReqVideoDto } from '@ExternalApps/feature/crawl-queue/video/application/dto/delete-req-video.dto';

export class DeleteReqVideoDao extends DelReqVideoDto {
  constructor(props: DelReqVideoDto) {
    super(props);
    Object.assign(this, props);
  }
}
