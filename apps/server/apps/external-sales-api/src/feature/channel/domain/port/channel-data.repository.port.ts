import { RepositoryPort } from '@Libs/commons/src';
import { ChannelDataEntity } from '@ExternalApps/feature/video/domain/entities';

export interface ChannelDataRepositoryPort
  extends RepositoryPort<ChannelDataEntity> {}
