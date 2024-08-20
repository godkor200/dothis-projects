import { RepositoryPort } from '@Libs/commons';
import { RequestChannelsEntity } from '@ExternalApps/feature/crawl-queue/channel/domain/entities/request-channels.entity';

export interface ReqChannelOutboundPort
  extends RepositoryPort<RequestChannelsEntity> {}
