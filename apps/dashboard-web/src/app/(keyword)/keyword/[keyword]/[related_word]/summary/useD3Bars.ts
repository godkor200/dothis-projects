import * as D3 from 'd3';
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
  styleMethod?: (
    selection: D3.Selection<any, any, any, any>,
    index: number,
    isUpdate: boolean,
  ) => void;
  xPositionMethod?: (
    xScale: D3.ScaleBand<string>,
    data: DataItem,
    index: number,
  ) => number;
  xScale: D3.ScaleBand<string> | undefined;
  yScale: D3.ScaleLinear<number, number, never>[] | undefined;
  title: string;
  keywordList: string[];
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
  keywordList,
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

        chartSelector.selectAll("[class*='bar-']").interrupt();

        chartSelector.selectAll('.to-remove').remove();

        chartSelector.selectAll("[class*='bar-']").each(function () {
          const bar = D3.select(this);
          const barClass = bar.attr('class');

          const shouldRemove = keywordList.every(
            (keyword) =>
              !barClass
                .split(' ')
                .some((className) => className.includes(keyword)),
          );

          if (shouldRemove) {
            bar
              .classed('to-remove', true)
              .transition()
              .duration(200)
              .style('opacity', 0)
              .on('end', function () {
                // transition이 끝난 후 요소 제거
                if (bar.classed('to-remove')) {
                  bar.remove();
                }
              }); // Remove the element
          }
        });

        const arrayExists = (
          dataArray: typeof prevData,
          target: (typeof prevData)[number],
        ) => {
          return dataArray.some(
            (subArray) =>
              subArray.length === target.length &&
              subArray.every(
                (item, index) =>
                  item.date === target[index].date &&
                  item.value === target[index].value,
              ),
          );
        };

        data.forEach((dataset, index) => {
          const y = yScale[index];

          const bars = chartSelector
            .selectAll<SVGRectElement, DataItem>(`.bar-${keywordList[index]}`)
            .data<DataItem>(dataset, (d) => d.date);

          bars
            .enter()
            .append('rect')
            .attr('class', `bar-${keywordList[index]}`)
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
            // .attr('rx', 5)
            .attr('fill', '#818cf8')
            .call((selection) => {
              styleMethod && styleMethod(selection, index, false);
            })
            .transition()

            .attr('y', (d) => y(d.value))
            .attr('height', (d) => y(0) - y(d.value));

          bars.call((selection) => {
            styleMethod && styleMethod(selection, index, true);
          });

          if (arrayExists(prevData, dataset)) {
            bars
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
              .attr('y', (d) => y(d.value))
              .attr('height', (d) => y(0) - y(d.value))
              .style('opacity', 1);
          } else {
            bars
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
              .attr('y', y(0))
              .attr('height', 0)
              .transition()
              .duration(500)

              .transition()

              .attr('y', (d) => y(d.value))
              .attr('height', (d) => y(0) - y(d.value))
              .style('opacity', 1);
          }

          // bars
          //   .exit()
          //   .transition()
          //   .duration(1000)
          //   .attr('y', y(0))
          //   .attr('height', 0)
          //   .remove();
        });
      },

      remove: () => {
        data.forEach((_, index) => {
          chartSelector
            .selectAll(`.bar-${keywordList[index]}`)
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
