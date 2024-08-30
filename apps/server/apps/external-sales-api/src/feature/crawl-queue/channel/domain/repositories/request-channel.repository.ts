import { ReqChannelOutboundPort } from '@ExternalApps/feature/crawl-queue/channel/domain/port/post-req-channel.outbound.port';
import { RequestChannelsEntity } from '@ExternalApps/feature/crawl-queue/channel/domain/entities/request-channels.entity';
import { SqlRepositoryBase } from '@Libs/commons/db/sql-repository.base';
import { TRequestChannelModel } from '@dothis/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { zRequestChannelSchema } from '@dothis/dto';
import { ZodObject } from 'zod';

export class RequestChannelRepository
  extends SqlRepositoryBase<RequestChannelsEntity, TRequestChannelModel>
  implements ReqChannelOutboundPort
{
  @InjectRepository(RequestChannelsEntity)
  protected repository: Repository<RequestChannelsEntity>;

  protected tableName: string = 'request_channel';

  protected schema: ZodObject<any> = zRequestChannelSchema;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }
}
