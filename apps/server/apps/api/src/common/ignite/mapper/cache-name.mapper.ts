export class CacheNameMapper {
  static readonly BASE_VIDEO_HISTORY_TABLE = 'dothis.video_history';
  static readonly BASE_VIDEO_DATA_TABLE = 'dothis.video_data';
  static readonly BASE_CHANNEL_HISTORY_TABLE = 'dothis.channel_history';

  static getVideoHistoryTableName(
    cluster: string,
    year: string,
    month: string,
  ): string {
    return `${this.BASE_VIDEO_HISTORY_TABLE}_${cluster
      .toString()
      .padStart(2, '0')}_${year}${month}`;
  }

  static getVideoDataTableName(cluster: string): string {
    return `${this.BASE_VIDEO_DATA_TABLE}_${cluster
      .toString()
      .padStart(2, '0')}`;
  }

  static getChannelHistoryTableName(year: string, month: string): string {
    return `${this.BASE_CHANNEL_HISTORY_TABLE}_${year}${month}`;
  }
}
