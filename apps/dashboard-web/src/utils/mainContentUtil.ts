const NUMBER_FORMAT_REGX = /\B(?=(\d{3})+(?!\d))/g;
const KOREAN_NUMERICAL_UNIT = ['', '만', '억', '조', '경'];

/**
 * @numberFormat @setUnitText 함수는 Intl.NumberFormat의 존재를 모르고 있을 때 임시로 사용했던 한국숫자 포맷팅 함수입니다. (현재는 사용 X)
 */
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

/**
 * nivo Line 그래프 axisLeft의 format을 수정하는 함수이다. (ex->1만, 20만)
 * @param value format을 할 number형 숫자
 * @param minValue axisLeft값 중 최소값을 명시적으로 넣어준다. (현재 위,아래 그래프를 붙여놓은 형태이다, 그 중간에 겹치는 부분(교선)의 Text를 대체하기 위해 받는다)
 * @returns 한국에 맞는 숫자 format이 된 string or 중간에 겹치는 부분을 대체하기위한 ∙∙∙ 텍스트를 반환한다.
 */
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

/**
 * 위 unitFormat과 동일한 형태이지만 아래 Line 그래프 부분의 교선은 maxValue이기에 새로 만들어주었다. (굳이 필요없는 함수이다.)
 * @param value format을 할 number형 숫자
 * @param maxValue axisLeft값 중 최소값을 명시적으로 넣어준다. (현재 위,아래 그래프를 붙여놓은 형태이다, 그 중간에 겹치는 부분(교선)의 Text를 대체하기 위해 받는다)
 * @returns 한국에 맞는 숫자 format이 된 string or 중간에 겹치는 부분을 대체하기위한 ∙∙∙ 텍스트를 반환한다.
 */
export const unitFormatExpected = (value: number, maxValue: number) => {
  if (value === maxValue) return '∙∙∙';

  const compactNumber = new Intl.NumberFormat('ko', {
    notation: 'compact',
  });

  return compactNumber.format(value);
};

/**
 * 값의 올림,내림,반올림을 구할 때 어느 자릿수 기준으로 계산할지 정하는 함수
 * 파라미터로 들어오는 value의 n자리수를 구하며 digit 값에 따라 반환할 자릿수를 조절할 수 있다 (최대n개에서 0에 자릿수 (예외처리 필요))
 * Math.log10(value) 으로 해당 자릿수 n-1 값을 가져올 수 있다.
 * @example Math.log10을 이용하면  1222이면 3 122이면 2
 * @param value 자릿수를 구할 파라미터
 * @param digit 어느 자릿수를 기준으로 반올림할지 정하는 파라미터 (0이면 value의 n자릿수 1이면 value의 n-1자릿수 ~~..)
 * @returns 기준으로 할 자릿수를 구하고, 해당 자릿수만큼의 10제곱을 한 값을 반환한다.(10의 제곱을 해야 해당 단위로 올림, 내림이 가능하다. )
 * @example (5000,0) -> 10000 | (5000,1) -> 1000
 */
export const getRoundingUnit = (value: number, digit: number) => {
  return Math.pow(10, Math.floor(Math.log10(value) - (digit - 1)));
};

/**
 * roundingUnit 파라미터를 기준으로 해당 value 파라미터의 값을 올림하는 함수이다.
 * @param value 올림 할 파라미터
 * @param roundingUnit getRoundingUnit의 반환값 형태인 자릿수 파라미터 (10,100,1000~~..)
 * @returns roundingUnit 파라미터를 기준으로 올림한 number를 반환한다.
 * @example ceilToNearest(53333,getRoundingUnit(53333,2)) -> 54000  || ceilToNearest(53333,getRoundingUnit(53333,1)) -> 60000
 */
export function ceilToNearest(value: number, roundingUnit: number) {
  if (value <= 0) {
    return 0;
  }

  // roundtingUnit으로 받는 단위를 가지고 올림을한다
  return Math.ceil(value / roundingUnit) * roundingUnit;
}

/**
 * roundingUnit 파라미터를 기준으로 해당 value 파라미터의 값을 내림하는 함수이다.
 * @param value 내림 할 파라미터
 * @param roundingUnit getRoundingUnit의 반환값 형태인 자릿수 파라미터 (10,100,1000~~..)
 * @returns roundingUnit 파라미터를 기준으로 내림한 number를 반환한다.
 * @example floorToNearest(53333,getRoundingUnit(53333,1)) -> 50000 || floorToNearest(53333,getRoundingUnit(53333,2)) -> 53000
 */
export function floorToNearest(value: number, roundingUnit: number) {
  if (value === 0) return 0;

  // roundtingUnit으로 받는 단위를 가지고 내림을한다
  return Math.floor(value / roundingUnit) * roundingUnit;
}

/**
 * roundingUnit 파라미터를 기준으로 해당 value 파라미터의 값을 반올림하는 함수이다.
 * @param value 반올림 할 파라미터
 * @param roundingUnit getRoundingUnit의 반환값 형태인 자릿수 파라미터 (10,100,1000~~..)
 * @returns roundingUnit 파라미터를 기준으로 반올림한 number를 반환한다.
 */
export function roundToNearest(value: number, roundingUnit: number) {
  if (roundingUnit === 0) {
    return 0;
  }
  // roundtingUnit으로 받는 단위를 가지고 반올림을한다
  return Math.round(value / roundingUnit) * roundingUnit;
}
