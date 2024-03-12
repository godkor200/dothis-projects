import { IGetChannelHistoryLatestTuple } from '@Apps/modules/channel-history/infrastructure/repositories/database/channel-history.outbound.port';
import { ChannelHistoryBaseAdapter } from '@Apps/modules/channel-history/infrastructure/adapters/channel-history.base.adapter';
import { FindIndividualVideoInfoV1Dao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { TChannelHistoryTuplesRes } from '@Apps/modules/channel-history/infrastructure/daos/channel-history.dao';

export class FindLatestChannelHistoryByVideoAdapter
  extends ChannelHistoryBaseAdapter
  implements IGetChannelHistoryLatestTuple
{
  async execute(
    dao: FindIndividualVideoInfoV1Dao,
  ): Promise<TChannelHistoryTuplesRes> {
    const { clusterNumber, videoId } = dao;
    const tableName = `dothis.CHANNEL_HISTORY`;
    const joinTableName = `dothis.video_data_cluster_${clusterNumber}`;
    const queryString = `SELECT ch.${this.keys.join(
      ', ch.',
    )}, vd.video_tags, vd.video_published FROM ${tableName} ch JOIN ${joinTableName} vd ON ch.channel_id = vd.channel_id WHERE vd.video_id = '${videoId}' ORDER BY ch.day DESC LIMIT 1`;
    return await this.history(tableName, queryString);
  }
}
