import type * as D3 from 'd3';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

interface DataItem {
  date: string;
  value: number;
}

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
  data: DataItem[][];
  dimensions: Dimensions;
  styleMethods?: ((selection: D3.Selection<any, any, any, any>) => void)[];
  xPositionMethod?: (
    xScale: D3.ScaleBand<string>,
    data: DataItem,
    index: number,
  ) => number;
  xScale: D3.ScaleBand<string> | undefined;
  yScale: D3.ScaleLinear<number, number, never>[] | undefined;
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
  styleMethods,
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

        data.forEach((dataset, index) => {
          const y = yScale[index];

          const bars = chartSelector
            .selectAll<SVGRectElement, DataItem>(`.bar-${title}-${index}`)
            .data<DataItem>(dataset, (d) => d.date);

          bars
            .enter()
            .append('rect')
            .attr('class', `bar-${title}-${index}`)
            .attr('x', (d) => {
              if (xPositionMethod) {
                return xPositionMethod(xScale, d, index);
              } else {
                return (
                  (xScale(d.date) as number) +
                  index * (xScale.bandwidth() / data.length)
                );
              }
            })
            .attr('y', (d) => y(0) as number)
            .attr('width', 10) // Adjust bar width to prevent overlap
            .attr('height', 0)
            .attr('rx', 5)
            .attr('fill', '#818cf8')
            .call((bar) => {
              if (styleMethods && styleMethods[index]) {
                styleMethods[index](bar);
              }
            })
            .transition()
            .delay(1000)
            .attr('y', (d) => y(d.value))
            .attr('height', (d) => y(0) - y(d.value));

          if (JSON.stringify(prevData) !== JSON.stringify(data)) {
            bars
              .transition()
              .duration(1000)
              .attr('y', y(0))
              .attr('height', 0)
              .transition()
              .delay(500)
              .attr('y', (d) => y(d.value))
              .attr('height', (d) => y(0) - y(d.value));
          }

          bars
            .exit()
            .transition()
            .duration(1000)
            .attr('y', y(0))
            .attr('height', 0)
            .remove();
        });
      },

      remove: () => {
        data.forEach((_, index) => {
          chartSelector
            .selectAll(`.bar-${title}-${index}`)
            .transition()
            .duration(500)
            .style('opacity', 0)
            .remove();
        });
      },
    }),
    [width, data, JSON.stringify(data) === JSON.stringify(prevData)],
  );

  return barRef;
};

export default useD3Bar;
