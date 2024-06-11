import type * as D3 from 'd3';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { DataItem } from './SummaryChart';
import useXAxis from './useXAxis';
import useYAxis from './useYAxis';

interface BarRef {
  render: () => void;
  remove: () => void;
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
  xPositionMethod?: (xScale: D3.ScaleBand<string>, data: DataItem) => number;
  xScale: D3.ScaleBand<string> | undefined;
  yScale: D3.ScaleLinear<number, number, never> | undefined;
  title: string;
}

function usePrevious<T>(state: T) {
  const ref = useRef<T>(state);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  return ref.current;
}

const useD3Bar = ({
  chartSelector,
  data,
  dimensions,
  xScale,
  yScale,
  title,
  styleMethod,
  xPositionMethod,
}: Props) => {
  const { width, height, marginTop, marginRight, marginBottom, marginLeft } =
    dimensions;

  const barRef = useRef<BarRef | null>(null);

  const prevData = usePrevious(data);

  useImperativeHandle(
    barRef,
    () => ({
      render: () => {
        if (!xScale || !yScale) return; // Ensure scales are defined before rendering

        const bars = chartSelector
          .selectAll<SVGRectElement, DataItem>(`.bar-${title}`)
          .data<DataItem>(data, (d) => d.date);

        bars

          .enter()
          .append('rect')
          .attr('class', `bar-${title}`)
          .attr('x', (d) => {
            if (xPositionMethod) {
              return xPositionMethod(xScale, d);
            } else return (xScale(d.date) as number) + xScale.bandwidth() / 2;
          })
          .attr('y', (d) => yScale(0) as number)
          .attr('width', 10)

          .attr('height', 0)
          .attr('rx', 5)
          .attr('fill', '#818cf8')

          .call((bar) => {
            if (styleMethod) {
              styleMethod(bar);
            }
          })
          .transition()
          .delay(1000)
          .attr('y', (d) => yScale(d.value))
          .attr('height', (data) => yScale(0) - yScale(data.value));

        //   서로 다른 API로 요소들이 독립적으로 update되어야함
        if (JSON.stringify(prevData) !== JSON.stringify(data)) {
          bars
            .transition()
            .duration(1000)
            .attr('y', yScale(0))
            .attr('height', 0)
            .transition()
            .delay(500)
            .attr('y', (d) => yScale(d.value))
            .attr('height', (d) => yScale(0) - yScale(d.value));
        }
        // Exit selection
        bars
          .exit()
          .transition()
          .duration(1000)
          .attr('y', yScale(0))
          .attr('height', 0)
          .remove();
      },

      remove: () => {
        chartSelector
          .selectAll(`.bar-${title}`)
          .transition()
          .duration(500)
          .style('opacity', 0)
          .remove();
      },
    }),
    [width, data, JSON.stringify(data) === JSON.stringify(prevData)],
  );
  return barRef;
};

export default useD3Bar;
