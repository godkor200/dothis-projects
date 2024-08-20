import { Injectable } from '@nestjs/common';
import { IGetVideoVideoNoKeywordPaginatedOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { VideoNoKeywordPaginatedDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { Err, Ok } from 'oxide.ts';
import { TableNotFoundException } from '@Libs/commons';

import { TVideoRes } from '@Apps/modules/video/application/dtos/video.res';

/**
 * 대량의 비디오를 video_id만으로 페이지네이션 방식으로 리턴합니다.
 */
@Injectable()
export class VideoNoKeywordPaginatedAdapter
  implements IGetVideoVideoNoKeywordPaginatedOutboundPort
{
  async execute(dao: VideoNoKeywordPaginatedDao): Promise<TVideoRes> {
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
