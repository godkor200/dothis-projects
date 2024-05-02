/**
 * ignite 캐시 테이블 이름 맵퍼입니다.
 * 캐시 테이블 이름을 규칙에 따라 생성하거나 매핑하는 기능을 제공합니다.
 */
export class CacheNameMapper {
  static readonly BASE_VIDEO_HISTORY_TABLE = 'dothis.video_history';
  static readonly BASE_VIDEO_DATA_TABLE = 'dothis.video_data';
  static readonly BASE_CHANNEL_HISTORY_TABLE = 'dothis.channel_history';
  static readonly BASE_CHANNEL_DATA = 'dothis.channel_data';
  /**
   * 입력된 값을 숫자로 변환할 수 있는지 확인하는 메소드
   * @param value 검사할 값
   */
  private static canConvertToNumber(value: string | number): boolean {
    const number = Number(value);
    return !isNaN(number);
  }

  /**
   * 클러스터가 1부터 100 사이의 숫자인지 확인하는 메서드
   */
  private static isValidCluster(cluster: string | number): boolean {
    if (!this.canConvertToNumber(cluster)) return false;
    const clusterNumber = Number(cluster);
    return !isNaN(clusterNumber) && clusterNumber >= 0 && clusterNumber <= 100;
  }

  /**
   * 연도가 4자리 숫자인지 확인하는 메서드
   */
  private static isValidYear(year: string | number): boolean {
    if (!this.canConvertToNumber(year)) return false;
    const yearStr = year.toString().trim();
    return /^\d{4}$/.test(yearStr);
  }

  /**
   * 월이 1부터 12 사이의 숫자인지 확인하는 메서드
   */
  private static isValidMonth(month: string | number): boolean {
    if (!this.canConvertToNumber(month)) return false;
    const monthNumber = Number(month);
    return !isNaN(monthNumber) && monthNumber >= 1 && monthNumber <= 12;
  }

  // formatNumber 메소드는 이전과 동일합니다.

  static getVideoHistoryCacheName(
    cluster: string | number,
    year: string | number,
    month: string | number,
  ): string {
    // 클러스터, 연도, 월의 유효성 검사
    if (!this.isValidCluster(cluster)) {
      throw new Error('유효하지 않은 클러스터입니다.');
    }
    if (!this.isValidYear(year)) {
      throw new Error('유효하지 않은 연도입니다.');
    }
    if (!this.isValidMonth(month)) {
      throw new Error('유효하지 않은 월입니다.');
    }
    return `${this.BASE_VIDEO_HISTORY_TABLE}_${this.formatNumber(
      cluster,
    )}_${year.toString().trim()}${this.formatNumber(month)}`;
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
