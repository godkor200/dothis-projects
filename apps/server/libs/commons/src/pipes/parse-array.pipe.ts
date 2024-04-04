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
      if (typeof val === 'string' && val.includes(',')) {
        // 문자열 속성에서 쉼표로 구분된 값을 배열로 변환
        // 각 항목의 앞뒤 공백을 제거
        value[key] = val.split(',').map((item) => item.trim());
      }
      // 쉼표가 없는 문자열은 배열로 변환하지 않고 그대로 둠
    });
    return value;
  }
}
