import { IGetChannelHistoryLatestTupleByVideoAdapter } from '@Apps/modules/channel-history/infrastructure/repositories/database/channel-history.outbound.port';
import { ChannelHistoryBaseAdapter } from '@Apps/modules/channel-history/infrastructure/adapters/channel-history.base.adapter';
import { FindIndividualVideoInfoV1Dao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import {
  ChannelHistoryLatestDayTupleRes,
  TChannelHistoryTuplesRes,
} from '@Apps/modules/channel-history/infrastructure/daos/channel-history.dao';
import { DateUtil } from '@Libs/commons/src/utils/date.util';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';

export class FindLatestChannelHistoryByVideoAdapter
  extends ChannelHistoryBaseAdapter
  implements IGetChannelHistoryLatestTupleByVideoAdapter
{
  /**
   * 비디오의 채널히스토리 정보 구독자수, 비디오 평균조회수등을 최신데이터로 받아오는 어뎁터
   * @param dao
   */
  async execute(
    dao: FindIndividualVideoInfoV1Dao,
  ): Promise<TChannelHistoryTuplesRes> {
    const { clusterNumber, videoId } = dao;
    const { year, month, day } = DateUtil.currentDate();
    const tableName = CacheNameMapper.getChannelHistoryCacheName(year, month);
    const joinTableName = CacheNameMapper.getVideoDataCacheName(
      clusterNumber[0],
    );
    const queryString = `SELECT ch.${this.keys.join(
      ', ch.',
    )}, vd.video_tags, to_char(vd.video_published, 'YYYY-MM-DD') AS video_published
        FROM ${tableName} ch 
        JOIN ${joinTableName} vd ON ch.channel_id = vd.channel_id 
        WHERE vd.video_id = '${videoId}' 
        AND ch.day = (SELECT MAX(DAY) FROM ${tableName})`;
    return await this.get<ChannelHistoryLatestDayTupleRes>(
      tableName,
      queryString,
    );
  }
}
