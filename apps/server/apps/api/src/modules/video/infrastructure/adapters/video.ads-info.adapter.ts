import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import { IGetVideoAdsInfoAdapterOutboundPort } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { GetAdsInfoResDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { TFindAdsInfoRes } from '@Apps/modules/video/application/queries/v1/find-ads-info.query-handler';
import { DateFormatter } from '@Libs/commons/src/utils/videos.date-formatter';
import { Err, Ok } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';

import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';
import { IgniteResultToObjectMapper } from '@Apps/common/ignite/mapper';

export class VideoAdsInfoAdapter
  extends VideoBaseAdapter
  implements IGetVideoAdsInfoAdapterOutboundPort
{
  /**
   *
   * 광고가 포함된 비디오 정보를 검색하기 위한 쿼리 문자열을 생성합니다.
   * 이 메소드는 특정 클러스터 번호들, 검색어, 관련 검색어, 날짜 범위를 기반으로 정보를 검색합니다.
   * 날짜 범위가 같은 달 내에 있을 때와 다른 달에 걸쳐 있을 때의 로직을 다르게 처리합니다.
   *
   * @param clusterNumbers 클러스터 번호 또는 번호 배열. 특정 클러스터 또는 클러스터 그룹에서 비디오 데이터를 조회합니다.
   * @param search 탐색어. 비디오 제목이나 태그 중에서 검색하고자 하는 단어 또는 문구입니다.
   * @param related 연관어. 비디오 제목이나 태그에 포함되어야 하는 추가적인 검색어입니다.
   * @param from 조회를 시작할 날짜. 'YYYY-MM-DD' 형식을 따릅니다.
   * @param to 조회를 종료할 날짜. 'YYYY-MM-DD' 형식을 따릅니다.
   * @private
   *
   * @returns 쿼리 문자열. 주어진 매개변수에 따라 조건을 만족하는 비디오 데이터를 조회하기 위한 SQL 쿼리 문자열입니다.
   */
  private queryString(
    clusterNumbers: string[],
    search: string,
    from: string,
    to: string,
    related?: string,
  ): string {
    const fromDate = DateFormatter.getFormattedDate(from);
    const toDate = DateFormatter.getFormattedDate(to);
    let relatedCondition = '';
    if (related) {
      relatedCondition = `AND (
        vd.video_title LIKE '%${related}%'
        OR vd.video_tags LIKE '%${related}%'
      )`;
    }
    const queryParts = clusterNumbers.map((cluster) => {
      if (fromDate.month === toDate.month && fromDate.year === toDate.year) {
        return `(
SELECT
  COUNT(DISTINCT vd.VIDEO_ID) AS numberOfAdVideos,
  AVG(vh.video_views) AS averageViewCount,
  COUNT(vd.VIDEO_ID) AS totalVideos
FROM
  ${CacheNameMapper.getVideoDataCacheName(cluster)} vd
  JOIN ${CacheNameMapper.getVideoHistoryCacheName(
    cluster,
    fromDate.year,
    fromDate.month,
  )} vh ON vd.VIDEO_ID = vh.VIDEO_ID
WHERE
  vd.VIDEO_TITLE LIKE '%${search}%'
  OR vd.VIDEO_TAGS LIKE '%${search}%'
  ${relatedCondition}
  AND vh.DAY BETWEEN ${from} AND ${to}
  AND vd.VIDEO_WITH_ADS = TRUE
)`;
      }
      return `(
SELECT
  COUNT(DISTINCT vd.VIDEO_ID) AS numberOfAdVideos,
  AVG(vh.video_views) AS averageViewCount,
  COUNT(vd.VIDEO_ID) AS totalVideos
FROM
  ${CacheNameMapper.getVideoDataCacheName(cluster)} vd
  JOIN ${CacheNameMapper.getVideoHistoryCacheName(
    cluster,
    fromDate.year,
    fromDate.month,
  )} vh1 ON vd.VIDEO_ID = vh.VIDEO_ID
  JOIN ${CacheNameMapper.getVideoHistoryCacheName(
    cluster,
    toDate.year,
    toDate.month,
  )} vh2 ON vd.VIDEO_ID = vh.VIDEO_ID
WHERE
  vd.VIDEO_TITLE LIKE '%${search}%'
  OR vd.VIDEO_TAGS LIKE '%${search}%'
  ${relatedCondition}
  AND vh2.DAY <= ${toDate.day} AND vh1.DAY >= ${fromDate.day}
  AND vd.VIDEO_WITH_ADS = TRUE
)`;
    });
    return queryParts.length > 1 ? queryParts.join(' UNION ') : queryParts[0];
  }

  /**
   *
   * 비디오 광고 정보를 조회하는 비즈니스 로직을 실행합니다.
   * GetAdsInfoResDao에서 제공된 파라미터를 사용하여 광고 정보를 조회하고,
   * 조회 결과를 바탕으로 적절한 처리를 수행한 후, 결과를 반환합니다.
   * 데이터 조회에 실패하거나 테이블을 찾을 수 없는 경우에는 에러를 반환합니다.
   * @param dao
   */
  async execute(dao: GetAdsInfoResDao): Promise<TFindAdsInfoRes> {
    const { search, related, from, to, relatedCluster } = dao;
    const queryString = this.queryString(
      relatedCluster,
      search,
      from,
      to,
      related,
    );

    const tableName = CacheNameMapper.getVideoDataCacheName(relatedCluster[0]);
    try {
      const cache = await this.client.getCache(tableName);
      const query = this.createDistributedJoinQuery(queryString);
      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new VideoHistoryNotFoundError());
      return Ok(
        IgniteResultToObjectMapper.mapResultToObjects(
          resArr,
          queryString,
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
