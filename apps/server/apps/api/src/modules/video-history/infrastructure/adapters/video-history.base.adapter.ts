export class VideoHistoryBaseAdapter {
  readonly keys: string[] = [
    'VIDEO_ID',
    'VIDEO_VIEWS',
    'VIDEO_LIKES',
    'VIDEO_COMMENTS',
    'VIDEO_PERFORMANCE',
    // 'VIDEO_CLUSTER',
    'YEAR',
    'MONTH',
    'DAY',
  ];

  public modifyKeys(keys: string[], keyToCast: string): string[] {
    return keys.map((key) => {
      if (key === keyToCast) {
        return `CAST(${key} AS DOUBLE) AS ${key}`;
      }
      return key;
    });
  }
}
