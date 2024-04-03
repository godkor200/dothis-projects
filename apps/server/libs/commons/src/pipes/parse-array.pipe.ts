import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseArrayPipe
  implements PipeTransform<Record<string, unknown>, Record<string, unknown>>
{
  transform(
    value: Record<string, unknown>,
    metadata: ArgumentMetadata,
  ): Record<string, unknown> {
    // 객체의 각 속성을 순회하며 처리
    console.log(value);
    Object.keys(value).forEach((key) => {
      const val = value[key];
      if (typeof val === 'string') {
        // 문자열 속성에서 쉼표로 구분된 값을 배열로 변환
        // 각 항목의 앞뒤 공백을 제거
        value[key] = val.includes(',')
          ? val.split(',').map((item) => item.trim())
          : [val.trim()];
      }
    });
    return value;
  }
}
