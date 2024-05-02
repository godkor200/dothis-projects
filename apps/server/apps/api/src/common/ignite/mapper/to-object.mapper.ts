/**
 * Ignite 데이터 쿼리 결과를 객체로 매핑하기 위한 맵퍼입니다.
 */
export class IgniteResultToObjectMapper {
  // SELECT 문에서 칼럼 이름들을 추출하는 정적 메소드입니다.
  private static parseColumnsFromQuery(query: string): string[] {
    const columnString = query.split('SELECT')[1].split('FROM')[0];

    const columns = columnString.split(',').map((column) => {
      let columnName = column.trim();

      // 'AS' 구문을 사용한 별칭 처리
      if (columnName.includes(' AS ')) {
        columnName = columnName.split('AS')[1].trim();
      }
      // 특수문자 제거
      columnName = columnName.replace(/['"\(\)]/g, '');

      // 테이블 이름이나 복잡한 함수 호출 부분 제거 (예: 'vh.videoId' -> 'videoId')
      if (columnName.includes('.')) {
        columnName = columnName.substring(columnName.lastIndexOf('.') + 1);
      }

      return this.toCamelCase(columnName.toLowerCase());
    });

    // 중복 제거하여 최종 칼럼 이름 리스트를 반환합니다.
    return [...new Set(columns)];
  }

  // 문자열을 카멜 케이스로 변환하는 정적 메소드입니다.
  private static toCamelCase(str: string): string {
    return str.replace(/([-_][a-z])/gi, (group) =>
      group.toUpperCase().replace('-', '').replace('_', ''),
    );
  }

  // SQL 쿼리 결과와 칼럼 문자열을 받아 객체 배열로 매핑하는 정적 메소드입니다.
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

  // 단일 객체로 결과를 매핑하기 위한 정적 메소드입니다. 주로 단일 행 결과를 처리할 때 사용됩니다.
  static mapResultToObject<T = any>(result: string[][], columns: string): T {
    const res = this.mapResultToObjects(result, columns);
    return res[0]; // 첫 번째 객체만 반환합니다.
  }
}
