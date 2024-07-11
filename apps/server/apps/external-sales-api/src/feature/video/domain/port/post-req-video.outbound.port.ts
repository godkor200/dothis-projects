import { RepositoryPort } from '@Libs/commons/src';
import { RequestVideoEntity } from '@ExternalApps/feature/video/domain/entities/request-video.entity';

export interface ReqVideoOutboundPort
  extends RepositoryPort<RequestVideoEntity> {}
