import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { ConfigService } from '@nestjs/config';
import { DateFormatter } from '@Apps/modules/video/infrastructure/utils';

export class VideoBaseAdapter extends IgniteService {
  readonly videoColumns: string[] = [
    'VIDEO_ID',
    'CHANNEL_ID',
    'VIDEO_TITLE',
    'VIDEO_DESCRIPTION',
    'VIDEO_TAGS',
    'VIDEO_DURATION',
    'VIDEO_PUBLISHED',
    'VIDEO_CATEGORY',
    'VIDEO_INFO_CARD',
    'VIDEO_WITH_ADS',
    'VIDEO_END_SCREEN',
    'VIDEO_CLUSTER',
    'CRAWLED_DATE',
    'YEAR',
    'MONTH',
    'DAY',
  ];
  constructor(configService: ConfigService) {
    super(configService);
  }

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
    // clusterNumber가 배열이 아니라면 하나의 요소를 가진 배열로 변환
    const clusterNumbers = Array.isArray(clusterNumber)
      ? clusterNumber
      : [clusterNumber];
    return clusterNumbers
      .map((index) => {
        const tableName = `VIDEO_DATA_CLUSTER_${index}`;
        const joinTableName = `VIDEO_HISTORY_CLUSTER_${index}_${fromDate.year}_${fromDate.month}`;
        return `SELECT DISTINCT ${columns} FROM DOTHIS.${tableName} vd JOIN DOTHIS.${joinTableName} vh 
                ON vd.video_id = vh.video_id 
                WHERE (vd.video_title LIKE '%${search}%' or vd.video_tags LIKE '%${search}%') 
                AND (vd.video_title LIKE '%${related}%' or vd.video_tags LIKE '%${related}%') 
                AND (vh.DAY BETWEEN ${fromDate.day} AND ${toDate.day})`;
      })
      .join(' UNION ');
  }
}
