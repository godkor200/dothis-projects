import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { VideoRepositoryPort } from '../../interface/video.repository.port';
import { VideoModel, zVideoModel } from '@dothis/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoEntity } from '../db/videos.entity';
import { DataSource, Repository } from 'typeorm';
import { ZodObject } from 'zod';

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

  async findManyVideo(tag: string): Promise<string[]> {
    return await this.repository
      .createQueryBuilder(this.tableName)
      .select('video_id', 'res')
      .where('video_tag LIKE :name', { name: `%${tag}%` })
      .orWhere('video_title LIKE :name', { name: `%${tag}%` })
      .getRawMany()
      .then((res) =>
        Object.values(JSON.parse(JSON.stringify(res))).map((e) => e['res']),
      );
  }
}
