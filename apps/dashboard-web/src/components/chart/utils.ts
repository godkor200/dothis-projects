const NUMBER_FORMAT_REGX = /\B(?=(\d{3})+(?!\d))/g;

const numberFormat = (value: number) => {
  return value.toString().replace(NUMBER_FORMAT_REGX, ',');
};

export const setUnitText = (numbers: number[]) => {
  const unit = ['', '만', '억', '조', '경'];
  return numbers.map((number, index) =>
    !!number ? numberFormat(number) + unit[unit.length - 1 - index] : number,
  );
};

// 근데 이 부분은 넘어오는 number 형식에 따라 고민 중 (배열?? , 현재 format은 value: number로 제공 )

export function unitFormat(value: any) {
  // y scale interval 도출 시 min값을 가져와서 ∙∙∙ 공백 처리 필요

  const compactNumber = new Intl.NumberFormat('ko', {
    notation: 'compact',
  });
  // 일단 임시로 Intl format을 사용(구현 중 디자인상 format이면 Intl로 사용해도 문제없겠다 생각)

  return compactNumber.format(value);
}

export function numberToKorean(number: number) {
  var inputNumber = number < 0 ? false : number;
  var unitWords = ['', '만', '억', '조', '경'];
  var splitUnit = 10000;
  var splitCount = unitWords.length;
  var resultArray = [];
  var resultString = '';

  for (var i = 0; i < splitCount; i++) {
    var unitResult =
      ((inputNumber as number) % Math.pow(splitUnit, i + 1)) /
      Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }

  for (var i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString =
      String(numberFormat(resultArray[i])) + unitWords[i] + resultString;
  }

  return resultString;
}

// 단위 format

export function getRoundingUnit(value: number) {
  const roundingUnit = Math.pow(10, Math.floor(Math.log10(value) - 1));

  return roundingUnit;
}

// 자릿수 유닛을 구하는 함수
export function ceilToNearest(value: number, roundingUnit: number) {
  console.log(value);
  console.log(roundingUnit);
  const ceilValue = Math.ceil(value / roundingUnit) * roundingUnit;

  return ceilValue;
}

export function floorToNearest(value: number, roundingUnit: number) {
  const floorValue = Math.floor(value / roundingUnit) * roundingUnit;
  return floorValue;
}
