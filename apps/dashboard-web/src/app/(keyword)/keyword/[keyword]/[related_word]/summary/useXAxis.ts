import * as D3 from 'd3';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { DataItem } from './SummaryChart';

interface XAxisRef {
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
const useXAxis = ({ chartSelector, data, dimensions, styleMethod }: Props) => {
  const { width, height, marginTop, marginRight, marginBottom, marginLeft } =
    dimensions;

  const xAxisRef = useRef<XAxisRef | null>(null);

  const x = D3.scaleBand()
    .domain(data.map((item) => item.date))
    .range([-40, width - -40]);

  useImperativeHandle(
    xAxisRef,
    () => ({
      render: () => {
        const xAxisCallback = (
          g: D3.Selection<SVGGElement, unknown, HTMLElement, undefined>,
        ) => {
          return g
            .attr('transform', `translate(0, ${height - marginBottom})`)
            .call(
              D3.axisBottom(x)
                .tickSizeOuter(0)
                .tickSize(0)
                .tickFormat((d) => d),
            )
            .selectAll('text')
            .attr('font-size', '12px')

            .attr('color', '#A1A1AA');
        };
        chartSelector
          .append('g')
          .call(xAxisCallback)
          .call(
            (g: D3.Selection<SVGGElement, unknown, HTMLElement, undefined>) =>
              g.select('.domain').remove(),
          )
          .call((xAxis) => {
            if (styleMethod) {
              styleMethod(xAxis);
            }
          })
          .selectAll('text')
          .attr('transform', 'translate(0,10)');
      },
    }),
    [chartSelector, width, data],
  );

  return { xAxisRef, x };
};

export default useXAxis;
