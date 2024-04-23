import { VideoBaseAdapter } from '@Apps/modules/video/infrastructure/adapters/video.base.adapter';
import {
  IGetVideoAdsTopHitsAdapterOutboundPort,
  TFindAdsTopHitsRepoRes,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { GetVideoAdsTopHitsDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { DateFormatter } from '@Libs/commons/src/utils/videos.date-formatter';
import { Err, Ok } from 'oxide.ts';

import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { VideosResultTransformer } from '@Apps/modules/video/infrastructure/utils';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';

export class VideoAdsTopHitsAdapter
  extends VideoBaseAdapter
  implements IGetVideoAdsTopHitsAdapterOutboundPort
{
  /**
   * 이 함수는 특정 비디오 데이터를 검색하기 위한 SQL 쿼리 문자열을 생성합니다. 주어진 클러스터 번호들(clusterNumbers), 검색어(search), 관련어(related), 날짜 범위(from, to),
   * 한도(limit)를 기반으로 비디오 데이터에 대한 정보를 검색하는 데 사용되는 조건들을 포함한 쿼리를 만듭니다.
   * 이 쿼리는 비디오 제목, 게시 날짜, 채널 이름, 최대 조회수를 포함한 데이터를 반환하며, 비디오 제목 또는 태그가 검색어와 관련어와 일치하는 경우에 한해,
   * 광고가 포함된 비디오들 중에서 지정된 날짜 범위와 일치하는 비디오의 조회수를 기준으로 내림차순으로 정렬하여 상위 N개의 결과를 제한하여 반환합니다.
   * 검색 기간이 같은 달에 속할 경우, 단일 캐시 테이블을 사용해 조회수 데이터를 검색합니다.
   * 검색 기간이 다른 달에 걸쳐 있을 경우, 시작 및 종료 달에 해당하는 두 개의 캐시 테이블을 조인하여 이전 기간의 조회수(`PREVIOUS_VIDEO_VIEWS`)와 현재 기간의 조회수를 비교합니다.
   *
   * - `VIDEO_DATA_${clusterNumber}`와 `CHANNEL_DATA`, `VIDEO_HISTORY_CLUSTER_${clusterNumber}YYYYMM` 테이블을 조인하여 비디오 데이터와 채널 데이터, 비디오의 조회수 이력 데이터를 결합합니다.
   * - 비디오 제목 또는 태그가 사용자의 검색어(`search`) 및 관련어(`related`)와 일치하는 데이터를 필터링합니다.
   * - 조회수 이력(`vh1`, `vh2`) 테이블에서 지정된 날짜 범위(`from`, `to`) 안에 있는 데이터에 대해서만 검색합니다.
   * - 광고가 포함된(`VIDEO_WITH_ADS = TRUE`) 비디오만을 대상으로 합니다.
   * - 그룹화(`GROUP BY`)를 통해 각 비디오 ID마다 최대 조회수(`MAX(vh.VIDEO_VIEWS)`)를 계산합니다.
   * - 조회수를 기준으로 내림차순 정렬하여 비디오들을 정렬합니다.
   * - 사용자가 지정한 한도(`limit`)에 따라 상위 N개의 결과만을 반환합니다.
   *
   * @param clusterNumbers 클러스터 번호 배열. 비디오 데이터가 저장되어 있는 클러스터들을 식별합니다.
   * @param search 검색어. 비디오 제목이나 태그에서 찾고자 하는 키워드입니다.
   * @param related 관련어. 검색어와 함께 비디오 제목이나 태그에서 찾고자 하는 추가 키워드입니다.
   * @param from 검색 시작 날짜. `YYYY-MM-DD` 형식을 따릅니다.
   * @param to 검색 종료 날짜. `YYYY-MM-DD` 형식을 따릅니다.
   * @param limit 결과의 최대 개수를 지정합니다. 상위 N개의 결과를 반환합니다.
   * @return 쿼리 문자열. 주어진 매개변수에 따라 조건을 만족하는 비디오 데이터를 조회하기 위한 SQL 쿼리 문자열입니다.
   */

  private queryString(
    clusterNumbers: string[],
    search: string,
    related: string,
    from: string,
    to: string,
    limit: string,
  ) {
    const fromDate = DateFormatter.getFormattedDate(from);
    const toDate = DateFormatter.getFormattedDate(to);
    // 각 클러스터 번호에 대한 쿼리를 생성 및 결합
    const queries = clusterNumbers.map((clusterNumber) => {
      const tableName = CacheNameMapper.getVideoDataCacheName(clusterNumber);
      const joinTableName = CacheNameMapper.getChannelDataCacheName();
      const joinSecCacheName = CacheNameMapper.getVideoHistoryCacheName(
        clusterNumber,
        fromDate.year.toString(),
        fromDate.month.toString(),
      );
      if (fromDate.month === toDate.month && fromDate.year === toDate.year) {
        return `(SELECT VD.VIDEO_TITLE, VD.VIDEO_PUBLISHED, CD.CHANNEL_NAME, MAX(VH.VIDEO_VIEWS) AS VIDEO_VIEWS
    FROM ${tableName} VD 
    JOIN ${joinTableName} CD ON VD.CHANNEL_ID = CD.CHANNEL_ID 
    JOIN ${joinSecCacheName} VH ON VD.VIDEO_ID = VH.VIDEO_ID 
    WHERE (VD.VIDEO_TITLE LIKE '%${search}%' or VD.VIDEO_TAGS LIKE '%${search}%') 
    AND (VD.VIDEO_TITLE LIKE '%${related}%' or VD.VIDEO_TAGS LIKE '%${related}%') 
    AND (VH.DAY BETWEEN ${fromDate.day} AND ${toDate.day}) 
    AND VD.VIDEO_WITH_ADS = TRUE 
    GROUP BY VD.VIDEO_ID 
    ORDER BY VIDEO_VIEWS DESC)`;
      }
      const joinThirdCacheName = CacheNameMapper.getVideoHistoryCacheName(
        clusterNumber,
        toDate.year.toString(),
        toDate.month.toString(),
      );
      const startMonthQuery = `
      SELECT
        VD.VIDEO_TITLE, VD.VIDEO_PUBLISHED, CD.CHANNEL_NAME, MAX(VH.VIDEO_VIEWS) AS VIDEO_VIEWS
      FROM
        ${tableName} VD 
        JOIN ${joinTableName} CD ON VD.CHANNEL_ID = CD.CHANNEL_ID
        JOIN ${joinSecCacheName} vh ON VD.VIDEO_ID = VH.VIDEO_ID
      WHERE
        (vd.VIDEO_TITLE LIKE '%${search}%' OR vd.VIDEO_TAGS LIKE '%${search}%')
        AND (vd.VIDEO_TITLE LIKE '%${related}%' OR vd.VIDEO_TAGS LIKE '%${related}%')
        AND vh.DAY >= '${fromDate.day}'
        AND vd.VIDEO_WITH_ADS = TRUE
      GROUP BY VD.VIDEO_ID 
      ORDER BY VIDEO_VIEWS DESC 
    `;

      const endMonthQuery = `
      SELECT
        VD.VIDEO_TITLE, VD.VIDEO_PUBLISHED, CD.CHANNEL_NAME, MAX(VH.VIDEO_VIEWS) AS VIDEO_VIEWS
      FROM
        ${tableName} VD 
        JOIN ${joinTableName} CD ON VD.CHANNEL_ID = CD.CHANNEL_ID
        JOIN ${joinThirdCacheName} VH ON VD.VIDEO_ID = VH.VIDEO_ID
      WHERE
        (vd.VIDEO_TITLE LIKE '%${search}%' OR vd.VIDEO_TAGS LIKE '%${search}%')
        AND (vd.VIDEO_TITLE LIKE '%${related}%' OR vd.VIDEO_TAGS LIKE '%${related}%')
        AND vh.DAY <= '${toDate.day}'
        AND vd.VIDEO_WITH_ADS = TRUE
      GROUP BY VD.VIDEO_ID 
      ORDER BY VIDEO_VIEWS DESC
    `;
      return `(${startMonthQuery}) UNION (${endMonthQuery})`;
    });

    // 모든 클러스터 번호에 대한 쿼리를 결합한 결과 반환
    return `(${
      queries.length > 1 ? queries.join(' UNION ') : queries[0]
    }) LIMIT ${limit}`;
  }

  async execute(dao: GetVideoAdsTopHitsDao): Promise<TFindAdsTopHitsRepoRes> {
    const { search, related, from, to, relatedCluster, limit } = dao;

    const queryString = this.queryString(
      relatedCluster,
      search,
      related,
      from,
      to,
      limit,
    );

    const tableName = CacheNameMapper.getVideoDataCacheName(relatedCluster[0]);
    try {
      const cache = await this.client.getCache(tableName);
      const query = this.createDistributedJoinQuery(queryString);
      const result = await cache.query(query);
      const resArr = await result.getAll();
      if (!resArr.length) return Err(new VideoNotFoundError());
      return Ok(
        VideosResultTransformer.mapResultToObjects(resArr, queryString),
      );
    } catch (e) {
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      return Err(e);
    }
  }
}
