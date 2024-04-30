import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { ConfigService } from '@nestjs/config';
import { CacheNameMapper } from '@Apps/common/ignite/mapper/cache-name.mapper';
import { DateFormatter } from '@Libs/commons/src/utils/videos.date-formatter';
/**
 * VideoBaseAdapter 클래스는 비디오 데이터에 대한 접근 및 쿼리를 관리합니다.
 * 이 클래스는 IgniteService를 상속받아 Ignite 캐시에 저장된 비디오 관련 데이터를
 * 조회하고, 필요한 정보를 추출하기 위한 쿼리 문자열을 생성하는 역할을 수행합니다.
 *
 * 주요 기능:
 * - 주어진 조건에 맞는 비디오 데이터를 조회하기 위한 쿼리 문자열 생성
 * - 필요한 비디오 컬럼 정보를 정의하고 관리
 * - 특정 클러스터 번호 또는 번호 배열을 기반으로 한 데이터 쿼리 지원
 * - 시간 범위 및 관련 검색어를 포함한 복잡한 쿼리 조건 처리
 *
 * 이 클래스는 비디오 데이터를 다루는 다양한 어뎁터에서 기반 클래스로 사용될 수 있으며,
 * 비디오 데이터에 대한 조회 및 처리를 위한 공통 기능을 제공합니다.
 */

export class VideoBaseAdapter extends IgniteService {
  readonly videoColumns: string[] = [
    'VIDEO_ID',
    'CHANNEL_ID',
    'VIDEO_TITLE',
    'VIDEO_DESCRIPTION',
    'VIDEO_TAGS',
    'VIDEO_DURATION',
    'VIDEO_CATEGORY',
    'VIDEO_INFO_CARD',
    'VIDEO_WITH_ADS',
    'VIDEO_END_SCREEN',
    'VIDEO_CLUSTER',
    'YEAR',
    'MONTH',
    'DAY',
  ];

  constructor(configService: ConfigService) {
    super(configService);
  }

  /**
   * 특정 비디오 데이터에 대한 쿼리 문자열을 생성합니다.
   *
   * 이 메소드는 비디오 데이터를 조회하기 위한 SQL 쿼리 문자열을 생성합니다.
   * 사용자가 제공한 매개변수(컬럼 목록, 탐색어, 연관어, 기간, 클러스터 번호)를 기반으로 하여,
   * Ignite 캐시에서 비디오 데이터를 검색하기 위한 조건을 포함한 쿼리를 반환합니다.
   *
   * @param columns 리턴받을 컬럼 목록. 조회하고자 하는 비디오 데이터의 속성을 지정합니다.
   * @param search 탐색어. 비디오 제목이나 태그 중에서 검색하고자 하는 단어 또는 문구입니다.
   * @param related 연관어. 비디오 제목이나 태그에 포함되어야 하는 추가적인 검색어입니다.
   * @param from 조회를 시작할 날짜. 'YYYY-MM-DD' 형식을 따릅니다.
   * @param to 조회를 종료할 날짜. 'YYYY-MM-DD' 형식을 따릅니다.
   * @param clusterNumber 클러스터 번호 또는 번호 배열. 특정 클러스터 또는 클러스터 그룹에서 비디오 데이터를 조회합니다.
   *
   * @returns 쿼리 문자열. 주어진 매개변수에 따라 조건을 만족하는 비디오 데이터를 조회하기 위한 SQL 쿼리 문자열입니다.
   */

  public getClusterQueryString(
    columns: string[],
    search: string,
    related: string,
    from: string,
    to: string,
    clusterNumber: string | string[],
  ): string {
    const fromDate = DateFormatter.getFormattedDate(from);
    const toDate = DateFormatter.getFormattedDate(to);
    /**
     * clusterNumber가 배열이 아니라면 하나의 요소를 가진 배열로 변환
     * FIXME: dao 클래스안에서 배열로 변환 시킬 방법 찾기
     */
    const clusterNumbers = Array.isArray(clusterNumber)
      ? clusterNumber
      : [clusterNumber];

    const queryParts = clusterNumbers.map((cluster) => {
      const tableName = CacheNameMapper.getVideoDataCacheName(cluster);
      const joinTableName = CacheNameMapper.getVideoHistoryCacheName(
        cluster,
        fromDate.year.toString(),
        fromDate.month.toString(),
      );
      // 한 달 이내인 경우의 쿼리
      if (fromDate.month === toDate.month && fromDate.year === toDate.year) {
        return `SELECT DISTINCT ${columns.join(', ')} FROM ${tableName} vd 
              JOIN ${joinTableName} vh 
              ON vd.video_id = vh.video_id 
              WHERE (vd.video_title LIKE '%${search}%' OR vd.video_tags LIKE '%${search}%') 
              AND (vd.video_title LIKE '%${related}%' OR vd.video_tags LIKE '%${related}%') 
              AND (vh.DAY BETWEEN ${fromDate.day} AND ${toDate.day})`;
      }

      // 기간이 한 달을 넘어가는 경우 두 달 모두를 포함해야 하므로, 두 번째 캐시 테이블을 조인합니다.
      const joinSecCacheName = CacheNameMapper.getVideoHistoryCacheName(
        cluster,
        toDate.year.toString(),
        toDate.month.toString(),
      );
      return `(
        SELECT DISTINCT ${columns.join(', ')}
        FROM ${tableName} vd
        JOIN ${joinTableName} vh ON vd.video_id = vh.video_id
        WHERE (vd.video_title LIKE '%${search}%' OR vd.video_tags LIKE '%${search}%')
        AND (vd.video_title LIKE '%${related}%' OR vd.video_tags LIKE '%${related}%')
        AND vh.DAY >= ${fromDate.day}
      ) UNION (
        SELECT DISTINCT ${columns.join(', ')}
        FROM ${tableName} vd
        JOIN ${joinSecCacheName} vh ON vd.video_id = vh.video_id
        WHERE (vd.video_title LIKE '%${search}%' OR vd.video_tags LIKE '%${search}%')
        AND (vd.video_title LIKE '%${related}%' OR vd.video_tags LIKE '%${related}%')
        AND vh.DAY <= ${toDate.day}
      )`;
    });

    return queryParts.length > 1 ? queryParts.join(' UNION ') : queryParts[0];
  }
}
