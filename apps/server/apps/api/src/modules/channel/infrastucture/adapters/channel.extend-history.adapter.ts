import { ChannelAndExtendHistoryOutboundPort } from '@Apps/modules/channel/domain/ports/channel-profile.outbound.port';
import {
  AnalyzeChannelDao,
  TFindExtendChannelHistoryListRes,
} from '@Apps/modules/channel/infrastucture/daos/channel.dao';

import { Err, Ok } from 'oxide.ts';

import { TableNotFoundException } from '@Libs/commons';

import { Injectable } from '@nestjs/common';

/**
 * 채널과 채널히스토리의 제일 최근 데이터만 가져오는 어뎁터
 * 채널 아이디로 데이터를 가져온다
 */
@Injectable()
export class ChannelAndHistoryJoinAdapter
  implements ChannelAndExtendHistoryOutboundPort
{
  async execute(
    dao: AnalyzeChannelDao,
  ): Promise<TFindExtendChannelHistoryListRes> {
    try {
      return Ok([]);
    } catch (e) {
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      return Err(e);
    }
  }
}
