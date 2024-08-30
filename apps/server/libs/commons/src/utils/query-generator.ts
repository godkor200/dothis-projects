import { DateFormatterRes } from '@Libs/commons/utils/videos.date-formatter';

export class QueryGenerator {
  static generateUnionQuery(
    keys: string[],
    clusterNumber: string,
    tableNameInput: string,
    videoId: string,
    fromDate: DateFormatterRes,
    toDate: DateFormatterRes,
  ) {
    let queryString = '';
    let year = fromDate.year;
    let month = fromDate.month;

    while (true) {
      const tableName = `${tableNameInput}`;
      const startDay =
        year === fromDate.year && month === fromDate.month ? fromDate.day : 1;
      const endDay =
        year === toDate.year && month === toDate.month ? toDate.day : 31;
      queryString += `SELECT ${
        'vh.' + keys.join(', vh.')
      } FROM ${tableName} vh WHERE vh.VIDEO_ID = '${videoId}' AND vh.DAY BETWEEN ${startDay} AND ${endDay};`;

      if (year === toDate.year && month === toDate.month) {
        break;
      }

      month++;
      if (month > 12) {
        month = 1;
        year++;
      }
    }

    return queryString;
  }
}
