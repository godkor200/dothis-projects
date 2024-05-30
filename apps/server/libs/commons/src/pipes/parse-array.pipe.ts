import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseArrayPipe implements PipeTransform {
  transform(
    value: Record<string, unknown>,
    metadata: ArgumentMetadata,
  ): Record<string, unknown> {
    // 객체의 각 속성을 순회하며 처리
    Object.keys(value).forEach((key) => {
      const val = value[key];
      if (typeof val === 'string') {
        // 숫자 또는 문자열 속성에서 쉼표로 구분된 값을 배열로 변환
        // 쉼표가 없을 경우 문자열을 하나의 원소로 갖는 배열로 변환
        // 각 항목의 앞뒤 공백을 제거
        // 날짜 쿼리 예외 필터링
        value[key] = val.includes(',')
          ? val.split(',').map((item) => item.trim())
          : key == 'from' || key === 'to'
          ? val.trim()
          : [val.trim()];
      }

      // 쉼표가 없는 문자열은 배열로 변환하지 않고 그대로 둠
    });
    return value;
  }
}
