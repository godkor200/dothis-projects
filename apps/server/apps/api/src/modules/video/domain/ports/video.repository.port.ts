import { RepositoryPort } from '@Libs/commons/src/ddd/repository.port';
import { VideoEntity } from '../entities/videos.entity';

export interface VideoRepositoryPort extends RepositoryPort<VideoEntity> {
  findManyVideo(tag: string): Promise<string[]>;
}
