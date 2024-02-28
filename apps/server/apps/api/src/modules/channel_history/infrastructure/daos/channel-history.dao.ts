import { Result } from 'oxide.ts';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel_history/domain/event/channel_history.error';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { FindChannelInfoDto } from '@Apps/modules/channel_history/application/dtos/find-channel-info.dto';

/**
 * dao
 */
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
