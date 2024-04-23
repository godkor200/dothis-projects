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
  /**
   * 현재 날짜에서 지정된 일수만큼 빼서 날짜 정보를 반환합니다.
   * @param days 빼고자 하는 일수
   * @returns 날짜 정보 (yyyy-mm-dd 형식)
   */
  public static getDaysAgo(days: number = 0): string {
    const today = new Date();
    today.setDate(today.getDate() - days);

    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
