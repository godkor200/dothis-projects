import { Result } from 'oxide.ts';
import { FindInfluentialListDto } from '@Apps/modules/channel/application/dtos/find-influential-list.dto';
import { TInfluentialChannelRes } from '@dothis/dto/dist/lib/channel/channel.zod';
import { NotFoundException } from '@nestjs/common';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';

export type TChannelProfileRes = Result<
  TInfluentialChannelRes[],
  NotFoundException | TableNotFoundException
>;

export class ChannelProfileDao extends FindInfluentialListDto {
  public readonly relatedCluster: string[];

  constructor(props: FindInfluentialListDto) {
    super(props);
    this.relatedCluster = props.clusterNumber;
    this.order = props.order;
  }
}
