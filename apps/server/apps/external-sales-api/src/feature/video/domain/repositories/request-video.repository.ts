import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { TRequestVideoModel, zRequestVideoSchema } from '@dothis/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ZodObject } from 'zod';
import { RequestVideoEntity } from '@ExternalApps/feature/video/domain/entities/request-video.entity';
import { ReqVideoOutboundPort } from '@ExternalApps/feature/video/domain/port/post-req-video.outbound.port';

export class RequestVideoRepository
  extends SqlRepositoryBase<RequestVideoEntity, TRequestVideoModel>
  implements ReqVideoOutboundPort
{
  @InjectRepository(RequestVideoEntity)
  protected repository: Repository<RequestVideoEntity>;

  protected tableName: string = 'request_video';

  protected schema: ZodObject<any> = zRequestVideoSchema;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }
}
