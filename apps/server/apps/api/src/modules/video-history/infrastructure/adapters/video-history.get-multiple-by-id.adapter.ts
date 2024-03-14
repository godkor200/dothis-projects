import { VideoHistoryBaseAdapter } from '@Apps/modules/video-history/infrastructure/adapters/video-history.base.adapter';
import {
  IGetVideoHistoryGetMultipleByIdOutboundPort,
  TGetVideoHistoryRes,
} from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { IGetVideoHistoryGetMultipleByIdDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { Err, Ok } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import { VideosResultTransformer } from '@Apps/modules/video/infrastructure/utils';

export class VideoHistoryGetMultipleByIdAdapter
  extends VideoHistoryBaseAdapter
  implements IGetVideoHistoryGetMultipleByIdOutboundPort
{
  async execute(
    dao: IGetVideoHistoryGetMultipleByIdDao,
  ): Promise<TGetVideoHistoryRes> {
    const { videoIds, clusterNumber } = dao;
    /**
     * 데이터 최신화가 되면 쓰여질것
     */

    const current = this.currentDate();

    const tableName = `DOTHIS.VIDEO_HISTORY_CLUSTER_${clusterNumber[0]}_2024_1`;
    const cluster = Array.isArray(clusterNumber)
      ? clusterNumber
      : [clusterNumber];
    const queryUnion = cluster.map((cluster) => {
      const tableName = `DOTHIS.VIDEO_HISTORY_CLUSTER_${cluster}_2024_1`;

      return `SELECT vh.video_id, vh.video_views, vh.DAY FROM ${tableName} vh WHERE vh.video_id in (${
        "'" + videoIds.join(`', '`) + "'"
      })`;
    });
    let queryString: string;
    if (clusterNumber.length > 1) {
      queryString = queryUnion.join(' UNION ');
    } else {
      queryString = queryUnion[0];
    }
    try {
      const cache = await this.client.getCache(tableName);
      const query = this.createDistributedJoinQuery(queryString);
      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new VideoHistoryNotFoundError());

      return Ok(
        VideosResultTransformer.mapResultToObjects(resArr, queryString),
      );
    } catch (e) {
      console.error('VideoHistoryGetMultipleByIdAdapter execute error:', e);
      return Err(e); // 호출자에게 에러 정보 반환
    }
  }
}
