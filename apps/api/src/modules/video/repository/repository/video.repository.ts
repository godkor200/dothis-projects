import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { VideoEntity } from '../db/videos.entity';
import { VideoModel, zVideoModel } from '@dothis/dto';
import { DataSource, Repository } from 'typeorm';
import { ZodObject } from 'zod';
import { VideoRepositoryPort } from './video.repository.port';
import { InjectRepository } from '@nestjs/typeorm';

export class VideoRepository
  extends SqlRepositoryBase<VideoEntity, VideoModel>
  implements VideoRepositoryPort
{
  @InjectRepository(VideoEntity)
  protected repository: Repository<VideoEntity>;

  protected tableName: string = 'video';

  protected schema: ZodObject<any> = zVideoModel;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async findManyVideo(tag: string) {
    return await this.repository
      .createQueryBuilder(this.tableName)
      .select('video_id')
      .where('video_tag LIKE :name', { name: `%${tag}%` })
      .orWhere('video_title LIKE :name', { name: `%${tag}%` })
      .getRawMany();
  }
}
