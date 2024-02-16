export class VideosResultTransformer {
  private static parseColumnsFromQuery(query: string): string[] {
    const columnString = query.split('SELECT')[1].split('FROM')[0];
    const columns = columnString.split(',').map((column) => {
      let columnName = column.trim().split('.')[1];
      if (columnName.includes('AS')) {
        columnName = columnName.split('AS')[1];
      }

      // 언더스코어로 구분된 단어를 카멜케이스로 변환합니다.
      return this.toCamelCase(columnName.trim().toLowerCase());
    });

    return columns;
  }

  private static toCamelCase(str: string): string {
    return str.replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace('-', '').replace('_', ''),
    );
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
