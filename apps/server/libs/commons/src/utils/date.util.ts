export class DateUtil {
  /**
   * 현재 날짜 정보를 반환합니다.
   */
  public static currentDate(): {
    date: Date;
    year: string;
    month: string;
    day: string;
  } {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 한 자리 수일 경우 앞에 '0'을 더함
    const day = date.getDate().toString().padStart(2, '0'); // 한 자리 수일 경우 앞에 '0'을 더함
    return { date, year, month, day };
  }
}
