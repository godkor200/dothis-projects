import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { VideoDataRepositoryPort } from '@ExternalApps/feature/video/domain/port/video.outbound.port';
import { videoDetailSchema, zVideoDataShortsSchema } from '@dothis/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ZodObject } from 'zod';
import { VideoDataShortsEntity } from '@ExternalApps/feature/video/domain/entities';

export class VideoDataRepository
  extends SqlRepositoryBase<VideoDataShortsEntity, videoDetailSchema>
  implements VideoDataRepositoryPort
{
  protected tableName: string = 'video_data_shorts';

  protected schema: ZodObject<any> = zVideoDataShortsSchema;
  @InjectRepository(VideoDataShortsEntity, 'onPromisesMysql')
  protected readonly repository: Repository<VideoDataShortsEntity>;
  constructor(dataSource: DataSource) {
    super(dataSource);
  }
}
