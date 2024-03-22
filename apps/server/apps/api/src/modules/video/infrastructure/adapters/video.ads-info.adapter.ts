import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { IGetVideoAdsInfoAdapterOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { GetAdsInfoResDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { TFindAdsInfoRes } from '@Apps/modules/video/application/queries/v1/find-ads-info.query-handler';
import { DateFormatter } from '@Libs/commons/src/utils/videos.date-formatter';
import { Err, Ok } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import { VideosResultTransformer } from '@Apps/modules/video/infrastructure/utils';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';

export class VideoAdsInfoAdapter
  extends VideoBaseAdapter
  implements IGetVideoAdsInfoAdapterOutboundPort
{
  private queryString(
    clusterNumber: string,
    search: string,
    related: string,
    from: string,
    to: string,
  ) {
    return `(SELECT
  COUNT(DISTINCT vd.VIDEO_ID) AS numberOfAdVideos,
  AVG(vh.video_views) AS averageViewCount,
  COUNT(vd.VIDEO_ID) AS totalVideos
    FROM DOTHIS.VIDEO_DATA_CLUSTER_${clusterNumber} vd 
    JOIN DOTHIS.VIDEO_HISTORY_CLUSTER_${clusterNumber}_2024_1 vh 
    ON vd.VIDEO_ID = vh.VIDEO_ID
    WHERE vd.VIDEO_TITLE LIKE '%${search}%' OR vd.VIDEO_TAGS LIKE '%${search}%'
  AND vd.VIDEO_TITLE LIKE '%${related}%' OR vd.VIDEO_TAGS LIKE '%${related}%'
  AND vh.DAY BETWEEN ${from} AND ${to}
  AND vd.VIDEO_WITH_ADS = true)
`;
  }
  async execute(dao: GetAdsInfoResDao): Promise<TFindAdsInfoRes> {
    const { search, related, from, to, relatedCluster } = dao;
    const fromDate = DateFormatter.getFormattedDate(from);
    const toDate = DateFormatter.getFormattedDate(to);
    const queryString: string[] = relatedCluster.map((cluster) =>
      this.queryString(
        cluster,
        search,
        related,
        fromDate.day.toString(),
        toDate.day.toString(),
      ),
    );
    const combinedQueryString: string =
      relatedCluster.length === 1
        ? // 하나의 클러스터만 있는 경우, 배열에서 첫 번째 쿼리 문자열을 사용합니다.
          queryString[0]
        : // 여러 클러스터가 있는 경우, 모든 쿼리 문자열을 'UNION'로 결합합니다.
          queryString.join(' UNION ');

    const tableName = `DOTHIS.VIDEO_DATA_CLUSTER_${relatedCluster[0]}`;
    try {
      const cache = await this.client.getCache(tableName);
      const query = this.createDistributedJoinQuery(combinedQueryString);
      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new VideoHistoryNotFoundError());
      return Ok(
        VideosResultTransformer.mapResultToObjects(
          resArr,
          combinedQueryString,
        ).reduce(
          (accumulator, current) => {
            accumulator.numberOfAdVideos += current.numberofadvideos;
            accumulator.averageViewCount += current.averageviewcount;
            accumulator.totalVideos += current.totalvideos;
            return accumulator;
          },
          {
            numberOfAdVideos: 0,
            averageViewCount: 0,
            totalVideos: 0,
          },
        ),
      );
    } catch (e) {
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      return Err(e);
    }
  }
}
