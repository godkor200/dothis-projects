import { RepositoryPort } from '@Libs/commons';
import { RequestVideoEntity } from '@ExternalApps/feature/crawl-queue/video/domain/entities/request-video.entity';

import { DeleteReqVideoDao } from '@ExternalApps/feature/crawl-queue/video/infrastructure/dao/delete-req-video.dao';

export interface ReqVideoOutboundPort
  extends RepositoryPort<RequestVideoEntity> {
  deleteByVodIdEtc(dao: DeleteReqVideoDao): Promise<boolean>;

  findOneByWebHookUrlAndMatchToken(
    url: string,
    token: string,
  ): Promise<boolean>;
}
