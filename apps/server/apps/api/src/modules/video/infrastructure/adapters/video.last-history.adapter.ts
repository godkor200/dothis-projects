import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { IGetRelatedLastVideoHistory } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { GetRelatedLastVideoAndVideoHistory } from '@Apps/modules/video/infrastructure/daos/video.dao';

export class VideoLastHistoryAdapter
  extends VideoBaseAdapter
  implements IGetRelatedLastVideoHistory
{
  async getRelatedLastVideoAndVideoHistory(
    dao: GetRelatedLastVideoAndVideoHistory,
  ) {
    console.log(dao, '!!!!!호잇');
  }
}
