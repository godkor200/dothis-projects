export type DateFormatterRes = {
  year: number;
  month: number;
  day: number;
  date?: Date;
};

export class DateFormatter {
  static getFormattedDate(dateString: string): DateFormatterRes {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return { year, month, day };
  }
}
