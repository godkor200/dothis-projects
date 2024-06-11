import * as D3 from 'd3';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import type { DataItem } from './SummaryChart';

interface D3Ref {
  render: () => void;
  y: D3.ScaleLinear<number, number>;
}

interface Props {
  chartSelector: D3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  data: DataItem[];
  width: number;
  styleMethod?: (selection: D3.Selection<any, any, any, any>) => void;
}
const useD3 = ({ chartSelector, data, width, styleMethod }: Props) => {
  const height = 220;
  const marginTop = 0;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 0;
  const ref = useRef<D3Ref | null>(null);

  const line = D3.line<DataItem>()
    .x((datum) => {
      // console.log(x(d.month) + x.bandwidth() / 2);

      return Number(datum.date) / 2;
    })
    .y((d) => {
      return d.value as number;
    })
    .curve(D3.curveCatmullRom);

  const [min = 0, max = 100] = D3.extent(data, (data) => data.value as number);
  const y = D3.scaleLinear()
    .domain([0, max === 0 ? 100 : max])
    .nice()
    .range([height - marginBottom, marginTop]);

  useImperativeHandle(
    ref,
    () => ({
      render: () => {
        const yAxisCallback = (
          g: D3.Selection<SVGGElement, any, HTMLElement, any>,
        ) =>
          g
            .attr('transform', `translate(${marginLeft}, 0)`)
            .call(D3.axisLeft(y).tickSize(-width).ticks(3));

        chartSelector
          .append('g')
          // .attr('transform', `translate(${marginLeft},0)`)

          .call(yAxisCallback)

          .call((g: D3.Selection<SVGGElement, any, HTMLElement, any>) =>
            g.select('.domain').remove(),
          )
          .attr('class', 'grid')
          .attr('class', function (d) {
            return 'dashed';
          })
          .call((line) => {
            if (styleMethod) {
              styleMethod(line);
            }
          })
          .selectAll('text')
          .remove();

        chartSelector
          .append('path')
          .datum(data)
          .attr('fill', 'none')
          .attr('stroke', '#FCD34D')
          .attr('class', '검색량')
          .attr('stroke-width', 5)
          .style('stroke-linecap', 'round') // 선의 끝 모양을 둥글게 설정
          .attr('d', line);
      },
      y: y,
    }),
    [chartSelector, width, data],
  );

  return ref;
};

export default useD3;
