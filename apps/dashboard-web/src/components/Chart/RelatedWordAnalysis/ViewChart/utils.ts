const NUMBER_FORMAT_REGX = /\B(?=(\d{3})+(?!\d))/g;
const KOREAN_NUMERICAL_UNIT = ['', '만', '억', '조', '경'];

const numberFormat = (value: number) => {
  return value.toString().replace(NUMBER_FORMAT_REGX, ',');
};

export const setUnitText = (numbers: number[]) => {
  return numbers.map((number, index) =>
    !!number
      ? numberFormat(number) +
        KOREAN_NUMERICAL_UNIT[KOREAN_NUMERICAL_UNIT.length - 1 - index]
      : number,
  );
};

export const unitFormat = (value: number, minValue: number) => {
  /**
   * y scale interval 도출 시 min값을 이용해 ∙∙∙ 공백 처리
   * 임시로 Intl format 사용
   */

  if (value === minValue) return '∙∙∙';

  const compactNumber = new Intl.NumberFormat('ko', {
    notation: 'compact',
  });

  return compactNumber.format(value);
};

// 단위 format
// 해당 digit을 value의 length의 맞게 type 지정
export const getRoundingUnit = (value: number, digit: number) => {
  return Math.pow(10, Math.floor(Math.log10(value) - (digit - 1)));
};

// 자릿수 유닛을 구하는 함수 (2번째 자릿수)
export function ceilToNearest(value: number, roundingUnit: number) {
  if (value <= 0) {
    return 0;
  }

  return Math.ceil(value / roundingUnit) * roundingUnit;
}

export function floorToNearest(value: number, roundingUnit: number) {
  return Math.floor(value / roundingUnit) * roundingUnit;
}

export function roundToNearest(value: number, roundingUnit: number) {
  return Math.round(value / roundingUnit) * roundingUnit;
}
