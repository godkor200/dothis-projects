import { RepositoryPort } from '@Libs/commons/src';
import { VideoDataShortsEntity } from '@ExternalApps/feature/video/domain/entities';

export interface VideoDataRepositoryPort
  extends RepositoryPort<VideoDataShortsEntity> {}
