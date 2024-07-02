import { DateUtil } from '@Libs/commons/src/utils/date.util';

export class VideoFetchHelper {
  static filterByDateRangeAndCluster(
    items: string[],
    from: string,
    to: string,
    relatedClusters: string[],
  ): string[] {
    return items.filter((item) => {
      const [publishDate, , , clusterNumber] = item.split(':');
      return (
        DateUtil.isWithinRange(publishDate, from, to) &&
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
}
