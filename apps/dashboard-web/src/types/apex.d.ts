type ChartType =
  | 'area'
  | 'line'
  | 'rangeArea'
  | 'bar'
  | 'pie'
  | 'donut'
  | 'radialBar'
  | 'scatter'
  | 'bubble'
  | 'heatmap'
  | 'candlestick'
  | 'boxPlot'
  | 'radar'
  | 'polarArea'
  | 'rangeBar'
  | 'treemap'
  | undefined;

type SeriesDetail = Extract<
  ApexAxisChartSeries[number]['data'][number],
  { x: any; y: any }
>;

// SeriesDetail 타입의 data 프로퍼티만 변경
type UpdatedApexAxisChartSeries = {
  [K in keyof ApexAxisChartSeries]: Omit<ApexAxisChartSeries[K], 'data'> & {
    data: SeriesDetail;
  };
};
