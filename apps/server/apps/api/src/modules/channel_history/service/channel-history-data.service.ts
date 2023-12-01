export class ChannelHistoryDataService {
  private readonly ONE_DAY_IN_MS = 24 * 60 * 60 * 1000; // 24hr = 86400000ms
  generateDatesBetween(fromDate: Date, toDate: Date): string[] {
    const dates: string[] = [];
    let currentDate = fromDate;
    while (currentDate <= toDate) {
      // YYYY-MM-DD 형식의 문자열로 변환
      const dateStr = currentDate.toISOString().slice(0, 10);
      dates.push(dateStr);
      // 다음 날짜로 이동
      currentDate = new Date(currentDate.getTime() + this.ONE_DAY_IN_MS); // 86400000ms = 24hr
    }

    return dates;
  }
}
