const NUMBER_FORMAT_REGX = /\B(?=(\d{3})+(?!\d))/g;

const numberFormat = (value: number) => {
  return value.toString().replace(NUMBER_FORMAT_REGX, ',');
};

const setUnitText = (numbers: number[]) => {
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
