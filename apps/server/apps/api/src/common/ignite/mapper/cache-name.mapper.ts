export class CacheNameMapper {
  static readonly BASE_VIDEO_HISTORY_TABLE = 'dothis.video_history';
  static readonly BASE_VIDEO_DATA_TABLE = 'dothis.video_data';
  static readonly BASE_CHANNEL_HISTORY_TABLE = 'dothis.channel_history';
  static readonly BASE_CHANNEL_DATA = 'dothis.channel_data';

  /**
   * 클러스터가 1부터 100 사이의 숫자인지 확인하는 메서드
   */
  private static isValidCluster(cluster: string): boolean {
    const clusterNumber = parseInt(cluster, 10);
    return !isNaN(clusterNumber) && clusterNumber >= 0 && clusterNumber <= 100;
  }
  /**
   * 연도가 4자리 숫자인지 확인하는 메서드
   */
  private static isValidYear(year: string): boolean {
    return /^\d{4}$/.test(year);
  }
  /**
   * 월이 1부터 12 사이의 숫자인지 확인하는 메서드
   */
  private static isValidMonth(month: string): boolean {
    const monthNumber = parseInt(month, 10);
    return !isNaN(monthNumber) && monthNumber >= 1 && monthNumber <= 12;
  }

  /**
   * 공백을 제거하고 숫자를 문자열로 변환하고, 필요한 경우 앞에 '0'을 추가하는 메소드
   */
  private static formatNumber(number: string | number): string {
    // 입력된 숫자를 문자열로 변환
    let numberStr = number.toString();

    // 문자열에서 공백 제거
    numberStr = numberStr.trim();

    // 필요한 경우 앞에 '0' 추가
    return numberStr.padStart(2, '0');
  }

  static getVideoHistoryCacheName(
    cluster: string,
    year: string,
    month: string,
  ): string {
    // 클러스터의 유효성 검사
    if (!this.isValidCluster(cluster)) {
      throw new Error('유효하지 않은 클러스터입니다.');
    }
    // 연도와 월의 유효성 검사
    if (!this.isValidYear(year)) {
      throw new Error('유효하지 않은 연도입니다.');
    }
    if (!this.isValidMonth(month)) {
      throw new Error('유효하지 않은 월입니다.');
    }
    return `${this.BASE_VIDEO_HISTORY_TABLE}_${this.formatNumber(
      cluster,
    )}_${year}${this.formatNumber(month)}`;
  }

  static getVideoDataCacheName(cluster: string): string {
    // 클러스터의 유효성 검사
    if (!this.isValidCluster(cluster)) {
      throw new Error('유효하지 않은 클러스터입니다.');
    }
    return `${this.BASE_VIDEO_DATA_TABLE}_${this.formatNumber(cluster)}`;
  }

  static getChannelHistoryCacheName(year: string, month: string): string {
    // 연도와 월의 유효성 검사
    if (!this.isValidYear(year)) {
      throw new Error('유효하지 않은 연도입니다.');
    }
    if (!this.isValidMonth(month)) {
      throw new Error('유효하지 않은 월입니다.');
    }
    return `${this.BASE_CHANNEL_HISTORY_TABLE}_${year}${this.formatNumber(
      month,
    )}`;
  }

  static getChannelDataCacheName(): string {
    return `${this.BASE_CHANNEL_DATA}`;
  }
}
