import * as D3 from 'd3';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import type { DataItem } from './SummaryChart';

interface YAxisRef {
  //   y: D3.ScaleLinear<number, number>;
  render: () => void;
}

interface Dimensions {
  width: number;
  height: number;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
}

interface Props {
  chartSelector: D3.Selection<D3.BaseType, unknown, HTMLElement, any>;
  data: DataItem[];
  dimensions: Dimensions;
  styleMethod?: (selection: D3.Selection<any, any, any, any>) => void;
}
const useYAxis = ({ chartSelector, data, dimensions, styleMethod }: Props) => {
  const { width, height, marginTop, marginRight, marginBottom, marginLeft } =
    dimensions;

  const yAxisRef = useRef<YAxisRef | null>(null);

  const [min = 0, max = 100] = D3.extent(data, (data) => data.value as number);
  const y = D3.scaleLinear()
    .domain([0, max === 0 ? 100 : max])
    .nice()
    .range([height - marginBottom, marginTop]);

  useImperativeHandle(
    yAxisRef,
    () => ({
      render: () => {
        const yAxisCallback = (
          g: D3.Selection<SVGGElement, unknown, HTMLElement, undefined>,
        ) =>
          g
            .attr('transform', `translate(${marginLeft}, 0)`)
            .call(D3.axisLeft(y).tickSize(-width).ticks(3));

        chartSelector
          .append('g')
          // .attr('transform', `translate(${marginLeft},0)`)
          .call(yAxisCallback)
          .call(
            (g: D3.Selection<SVGGElement, unknown, HTMLElement, undefined>) =>
              g.select('.domain').remove(),
          )
          .attr('class', 'grid')
          .attr('class', function (d) {
            return 'dashed';
          })
          .call((yAxis) => {
            if (styleMethod) {
              styleMethod(yAxis);
            }
          })
          .selectAll('text')
          .remove();
      },
    }),
    [chartSelector, width, data],
  );

  return { y, yAxisRef };
};

export default useYAxis;
