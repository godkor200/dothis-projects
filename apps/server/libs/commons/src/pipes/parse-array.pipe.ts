import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseArrayPipe implements PipeTransform {
  transform(
    value: Record<string, unknown>,
    metadata: ArgumentMetadata,
  ): Record<string, unknown> {
    console.log('ParseArrayPipe', value, metadata);

    // 배열로 변환하지 않을 키 목록
    const noArrayKeys = ['order', 'page', 'limit'];

    Object.keys(value).forEach((key) => {
      const val = value[key];
      if (typeof val === 'string') {
        // 날짜 쿼리 예외 필터링
        if (key === 'from' || key === 'to') {
          value[key] = val.trim();
        } else if (noArrayKeys.includes(key)) {
          // 배열로 변환하지 않을 키는 그대로 둠
          value[key] = val.trim();
        } else {
          // 쉼표로 구분된 값을 배열로 변환, 각 항목의 앞뒤 공백을 제거
          value[key] = val.includes(',')
            ? val.split(',').map((item) => item.trim())
            : [val.trim()];
        }
      }
    });
    return value;
  }
}
