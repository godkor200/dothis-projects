import { DateFormatterRes } from '@Libs/commons/src/utils/videos.date-formatter';

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
      const tableName = `${tableNameInput}_${clusterNumber}_${year}_${month}`;
      if (queryString.length > 0) {
        queryString += ' UNION ';
      }
      const startDay =
        year === fromDate.year && month === fromDate.month ? fromDate.day : 1;
      const endDay =
        year === toDate.year && month === toDate.month ? toDate.day : 31;
      queryString += `SELECT ${keys.join(
        ', ',
      )} FROM ${tableName} vh WHERE vh.video_id = '${videoId}' AND vh.DAY BETWEEN ${startDay} AND ${endDay}`;

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
