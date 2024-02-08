export class VideosResultTransformer {
  private static parseColumnsFromQuery(query: string): string[] {
    // SELECT와 FROM 사이의 문자열을 추출합니다.
    const columnString = query.split('SELECT')[1].split('FROM')[0];

    // 컬럼 이름은 콤마로 구분되므로 콤마를 기준으로 문자열을 분리하고, 공백을 제거합니다.
    const columns = columnString.split(',').map((column) => {
      // alias를 제거합니다.
      const columnName = column.trim().split('.')[1];
      // 언더스코어가 있는지 확인합니다.
      if (columnName.includes('_')) {
        // 대문자를 소문자로 바꾸고, 언더스코어를 제거한 후 카멜케이스로 변환합니다.
        return columnName.toLowerCase().split('_')[1];
      }
      // 언더스코어가 없는 경우, 그대로 반환합니다.
      return columnName.toLowerCase();
    });

    return columns;
  }

  static mapResultToObjects<T = any>(result: string[][], columns: string): T[] {
    const parseColumns = this.parseColumnsFromQuery(columns);
    return result.map((row) => {
      let rowObject = {} as T;
      for (let i = 0; i < parseColumns.length; i++) {
        rowObject[parseColumns[i]] = row[i];
      }

      return rowObject;
    });
  }
}
