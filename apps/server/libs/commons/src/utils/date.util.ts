export class DateUtil {
  static formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더해줍니다.
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  static getDaysAgo(days: number = 0): string {
    const date = new Date();
    date.setDate(date.getDate() - days); // 현재 날짜에서 days만큼 빼줍니다.

    return this.formatDate(date);
  }
}
