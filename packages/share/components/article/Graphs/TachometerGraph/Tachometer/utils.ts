import type { TachometerGraphProps } from 'components/article/Graphs/TachometerGraph/Tachometer/index';

export const defaultPercentValueInfo = {
  min: 0,
  max: 100,
  formatter: (value: TachometerGraphProps['value']) => `${value.toFixed(2)}%`,
};
