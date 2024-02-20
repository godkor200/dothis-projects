export class VideosDateFormatter {
  static getFormattedDate(dateString: string): {
    year: number;
    month: number;
    day: number;
  } {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return { year, month, day };
  }
}
