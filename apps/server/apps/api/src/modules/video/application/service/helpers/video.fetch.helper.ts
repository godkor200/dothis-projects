import { DateUtil } from '@Libs/commons/src/utils/date.util';
import { VideoCacheRecord } from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
import dayjs from 'dayjs';

export class VideoFetchHelper {
  static filterByDateRangeAndCluster(
    items: string[],
    from: string,
    to: string,
    relatedClusters: string[],
  ): string[] {
    return items.filter((item) => {
      const [publishDate, , , clusterNumber] = item.split(':');
      // 변환된 날짜 형식을 사용
      const formattedPublishDate = `${publishDate.slice(
        0,
        4,
      )}-${publishDate.slice(4, 6)}-${publishDate.slice(6, 8)}`;
      return (
        DateUtil.isWithinOneYear(formattedPublishDate, from, to) &&
        this.whetherRelatedCluster(relatedClusters, clusterNumber)
      );
    });
  }

  private static whetherRelatedCluster(
    relatedClusters: string[],
    comparedCluster: string,
  ): boolean {
    return relatedClusters.includes(comparedCluster);
  }

  /**
   * 주어진 날짜가 주어진 범위 내에 있는지 확인하는 헬퍼 함수
   * @param date
   * @param from
   * @param to
   */
  public static isDateWithinRange(items: string[], from: string, to: string) {
    return items.filter((item) => {
      const [publishDate] = item.split(':');

      return DateUtil.isWithinRange(publishDate, from, to);
    });
  }

  public static filterByDateRange(
    data: VideoCacheRecord,
    from: string,
    to: string,
  ): VideoCacheRecord {
    // 필터링할 날짜 범위
    const fromDate = dayjs(from, 'YYYYMMDD').toDate(); // 시작 날짜
    const toDate = dayjs(to, 'YYYYMMDD').toDate(); // 끝 날짜

    const filteredData = Object.keys(data).reduce((acc, cluster) => {
      acc[cluster] = data[cluster].filter((item) => {
        const itemDate = dayjs(item.publishedDate, 'YYYYMMDD').toDate();

        // 필터링 조건 반환
        return itemDate >= fromDate && itemDate <= toDate;
      });
      return acc;
    }, {});

    return filteredData;
  }
}
