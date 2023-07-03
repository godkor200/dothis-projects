const NUMBER_FORMAT_REGX = /\B(?=(\d{3})+(?!\d))/g;

const numberFormat = (value: number) => {
  return value.toString().replace(NUMBER_FORMAT_REGX, ',');
};
