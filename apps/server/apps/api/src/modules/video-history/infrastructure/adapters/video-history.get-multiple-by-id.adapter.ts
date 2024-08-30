import {
  IGetVideoHistoryGetMultipleByIdOutboundPort,
  TGetVideoHistoryRes,
} from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { IGetVideoHistoryGetMultipleByIdDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { Err, Ok } from 'oxide.ts';
import { Injectable } from '@nestjs/common';
@Injectable()
export class VideoHistoryGetMultipleByIdAdapter
  implements IGetVideoHistoryGetMultipleByIdOutboundPort
{
  /**
   * 비디오 아이디를 여러개 받아서 여러 비디오의 히스토리를 리턴
   * @param dao
   */
  async execute(
    dao: IGetVideoHistoryGetMultipleByIdDao,
  ): Promise<TGetVideoHistoryRes> {
    try {
      return Ok([]);
    } catch (e) {
      return Err(e); // 호출자에게 에러 정보 반환
    }
  }
}
