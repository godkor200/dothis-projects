import { Result } from 'oxide.ts';
import { FindInfluentialListDto } from '@Apps/modules/channel/application/dtos/find-influential-list.dto';
import { TInfluentialChannelRes } from '@dothis/dto';
import { NotFoundException } from '@nestjs/common';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { ChannelIdDto } from '@Apps/modules/channel/application/dtos/analyze-channel.interface';

export type TChannelProfileRes = Result<
  TInfluentialChannelRes[],
  NotFoundException | TableNotFoundException
>;
export type TFindExtendChannelHistoryListRes = Result<any, any>;
export class ChannelProfileDao extends FindInfluentialListDto {
  public readonly relatedCluster: string[];

  constructor(props: FindInfluentialListDto) {
    super(props);
    this.relatedCluster = props.clusterNumber;
    this.order = props.order;
  }
}
export class AnalyzeChannelDao extends ChannelIdDto {
  constructor(props: AnalyzeChannelDao) {
    super(props);
  }
}
export class FindChannelInfoDao extends ChannelIdDto {
  constructor(props: FindChannelInfoDao) {
    super(props);
  }
}
