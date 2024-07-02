export class IgniteResultToObjectMapper {
  private static parseColumnsFromQuery(query: string): string[] {
    const columnString = query.split('SELECT')[1].split('FROM')[0];

    const columns = columnString.split(',').map((column) => {
      let columnName = column.trim();

      // 'TO_CHAR' 함수 및 'AS' 구문을 사용한 별칭 처리
      if (columnName.toUpperCase().includes('TO_CHAR')) {
        const aliasIndex = columnName.toUpperCase().lastIndexOf(' AS ');
        if (aliasIndex !== -1) {
          columnName = columnName.substring(aliasIndex + 4).trim(); // 별칭 부분만 가져옴
        } else {
          // 별칭이 없는 경우 기본 이름 지정, 기본 함수 호출 부분 제거
          columnName = columnName.substring(
            columnName.toUpperCase().indexOf('TO_CHAR') + 7,
          );
          columnName = columnName.split(')')[1]?.trim() || 'video_published';
        }
      } else if (columnName.toUpperCase().includes(' AS ')) {
        columnName = columnName.split(/AS/i)[1].trim();
      } else if (columnName.includes('.')) {
        columnName = columnName.substring(columnName.lastIndexOf('.') + 1);
      }

      // 특수문자 제거
      columnName = columnName.replace(/['"\(\)]/g, '');

      return this.toCamelCase(columnName.toLowerCase());
    });

    // 중복 제거하여 최종 칼럼 이름 리스트를 반환합니다.
    return [...new Set(columns)];
  }

  private static toCamelCase(str: string): string {
    return str.replace(/([-_][a-z])/gi, (group) =>
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

  static mapResultToObject<T = any>(result: string[][], columns: string): T {
    const res = this.mapResultToObjects(result, columns);
    return res[0]; // 첫 번째 객체만 반환합니다.
  }
}
