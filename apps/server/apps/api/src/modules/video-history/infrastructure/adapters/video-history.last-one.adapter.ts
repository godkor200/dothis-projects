import {
  IGetLastVideoHistoryOutboundPort,
  TGetVideoHistoryRes,
} from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { IGetLastVideoHistoryDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { Err, Ok } from 'oxide.ts';
import { TableNotFoundException } from '@Libs/commons';
import { Injectable } from '@nestjs/common';

/**
 * 마지막 하나 히스토를 가져오는 함수
 */
@Injectable()
export class VideoHistoryLastOneAdapter
  implements IGetLastVideoHistoryOutboundPort
{
  async execute(dao: IGetLastVideoHistoryDao): Promise<TGetVideoHistoryRes> {
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
