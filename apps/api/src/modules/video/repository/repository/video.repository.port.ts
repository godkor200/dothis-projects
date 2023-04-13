import { RepositoryPort } from '@Libs/commons/src/ddd/repository.port';
import { VideoEntity } from '../db/videos.entity';

export interface VideoRepositoryPort extends RepositoryPort<VideoEntity> {
  findManyVideo(tag: string): Promise<string[]>;
}
