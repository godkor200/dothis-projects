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
