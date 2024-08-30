import { RepositoryPort } from '@Libs/commons';
import { ChannelDataEntity } from '@ExternalApps/feature/video/domain/entities';

export interface ChannelDataRepositoryPort
  extends RepositoryPort<ChannelDataEntity> {}
