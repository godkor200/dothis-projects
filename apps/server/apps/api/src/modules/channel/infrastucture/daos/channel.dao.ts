import { Result } from 'oxide.ts';
import { FindInfluentialListDto } from '@Apps/modules/channel/application/dtos/find-influential-list.dto';
import {
  TAnalyzeMyChannelChannelRes,
  TInfluentialChannelRes,
} from '@dothis/dto';
import { NotFoundException } from '@nestjs/common';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { GetAnalyzeMyChannel } from '@Apps/modules/channel/application/dtos/analyze-channel.interface';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';

export type TChannelProfileRes = Result<
  TInfluentialChannelRes[],
  NotFoundException | TableNotFoundException
>;
export type TFindExtendChannelHistoryListRes = Result<
  TAnalyzeMyChannelChannelRes[],
  TableNotFoundException | VideoHistoryNotFoundError
>;
export class ChannelProfileDao extends FindInfluentialListDto {
  public readonly relatedCluster: string[];

  constructor(props: FindInfluentialListDto) {
    super(props);
    this.relatedCluster = props.clusterNumber;
    this.order = props.order;
  }
}
export class AnalyzeChannelDao extends GetAnalyzeMyChannel {
  constructor(props: AnalyzeChannelDao) {
    super(props);
  }
}
export class FindChannelInfoDao extends GetAnalyzeMyChannel {
  constructor(props: FindChannelInfoDao) {
    super(props);
  }
}
