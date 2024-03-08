import { Result } from 'oxide.ts';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel_history/domain/event/channel_history.error';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { FindChannelInfoDto } from '@Apps/modules/channel_history/application/dtos/find-channel-info.dto';
import { createZodDto } from '@anatine/zod-nestjs';
import { zSearchKeyword } from '@dothis/dto';
import { extendApi } from '@anatine/zod-openapi';
import { CHANNEL_DATA_KEY } from '@Apps/modules/hits/application/dtos/expected-hits.dtos';

/**
 * dao
 */
export class ScanLatestChannelHistoryDao extends createZodDto(
  extendApi(zSearchKeyword),
) {
  public data: [CHANNEL_DATA_KEY];
  public relatedCluster: string[];
  constructor(props: ScanLatestChannelHistoryDao) {
    super();
    Object.assign(this, props);
  }
}

export class FindChannelInfoDao extends FindChannelInfoDto {
  constructor(props: FindChannelInfoDao) {
    super(props);
    Object.assign(this, props);
  }
}

/**
 * res
 */
export interface ChannelHistoryLatestDayTupleRes {
  channelId: string;
  channelAverageViews: number;
  channelSubscribers: number;
  channelTotalViews: number;
  channelTotalVideos: number;
  videoPublished: string;
  videoTags: string;
  year: number;
  month: number;
  day: number;
}

export type TChannelHistoryLatestDayTupleRes = Result<
  ChannelHistoryLatestDayTupleRes,
  ChannelHistoryNotFoundError | TableNotFoundException
>;
export type TChannelHistoryTuplesRes = Result<
  ChannelHistoryLatestDayTupleRes[],
  ChannelHistoryNotFoundError | TableNotFoundException
>;
