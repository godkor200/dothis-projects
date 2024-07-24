import './styles.css';

import * as D3 from 'd3';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

interface DataItem {
  date: string;
  value: number;
}

interface LineRef {
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

const useD3Line = ({
  chartSelector,
  data,
  dimensions,
  xScale,
  yScale,
  styleMethod,
  title,
  keywordList,
}: Props) => {
  const { width, height, marginTop, marginRight, marginBottom, marginLeft } =
    dimensions;

  const lineRef = useRef<LineRef | null>(null);
  const prevData = usePrevious(data);

  const colorList = ['green', 'blue'];
  const colorList2 = ['green', 'blue'];
  useImperativeHandle(
    lineRef,
    () => ({
      render: () => {
        if (!xScale || !yScale) return; // Ensure scales are defined before rendering

        // if (prevData.length > data.length) {
        //   for (let i = data.length; i < prevData.length; i++) {
        //     chartSelector
        //       .selectAll(`.line-${i}`)
        //       .transition()
        //       .duration(500)
        //       .style('opacity', 0)
        //       .remove();
        //   }
        // }
        // Collect all elements with class name containing 'line-'
        chartSelector.selectAll("[class*='line-']").each(function () {
          const line = D3.select(this);
          const lineClass = line.attr('class');
          // console.log(lineClass);

          // Determine if the class should be removed based on keywordList
          const shouldRemove = keywordList.every(
            (keyword) =>
              !lineClass
                .split(' ')
                .some((className) => className.includes(keyword)),
          );

          if (shouldRemove) {
            line.remove();
            // line.transition().duration(200).style('opacity', 0).remove(); // Remove the element
          }
        });

        data.forEach((dataSet, index, arr) => {
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
          const y = yScale[index];

          const line = D3.line<DataItem>()
            .x((datum) => Number(xScale(datum.date)) + xScale.bandwidth() / 2)
            .y((datum) => y(datum.value))
            .curve(D3.curveCatmullRom);

          const initialLine = D3.line<DataItem>()
            .x((datum) => Number(xScale(datum.date)) + xScale.bandwidth() / 2)
            .y(() => y(0))
            .curve(D3.curveCatmullRom);

          const path = chartSelector
            .selectAll(`.line-${keywordList[index]}`)
            .data([dataSet]);

          console.time(`${keywordList[index]}`);
          path
            .enter()
            .append('path')
            .attr('fill', 'none')
            .attr('class', `line-${keywordList[index]}`)
            .call((selection) => {
              styleMethod && styleMethod(selection, index, false);

              console.time(`${keywordList[index]}`);
            })
            // .attr(
            //   'stroke',
            //   index === arr.length - 1
            //     ? 'red'
            //     : index === arr.length - 2
            //     ? 'green'
            //     : 'blue',
            // )
            .attr('stroke-width', 3)
            .style('stroke-linecap', 'round')
            .attr('d', initialLine) // Initial path for transition
            .transition() // Start transition
            .ease(D3.easeCubicOut)
            .duration(600)

            .attr('d', line); // Final path after transition
          // .call((selection) => {
          //   console.log('isenter');
          //   if (true) {
          //     selection.attr('d', initialLine).transition().duration(1000);
          //   }
          // })
          // .attr('d', line)
          // .style('opacity', 1.0);
          console.timeEnd(`${keywordList[index]}`);
          path.call(
            (selection) => styleMethod && styleMethod(selection, index, true),
          );

          // return prevData[reverseIndex] !== undefined
          //   ? JSON.stringify(data[index]) === JSON.stringify(prevData[index])
          //   : false;
          // 배열이 존재하는지 확인하는 함수

          // console.log(prevData);
          // console.log(dataSet);
          // console.log(arrayExists(prevData, dataSet));
          // prevData.length - 1;

          // 키워드에 대한 line이 있을 경우 transition 조절할 필요가 있겠음.
          // enter도 아래 update transition 코드를 관통하는 점 유의해야함
          console.log(keywordList[index]);
          if (arrayExists(prevData, dataSet)) {
            // path.attr('d', line);
          } else {
            // chartSelector
            //   .selectAll(`.line-${keywordList[index]}`)
            //   .data([dataSet])
            path
              .interrupt()
              .transition()
              .duration(100)
              .attr('d', initialLine)
              .on('end', (selection) => {
                path
                  .transition()
                  .ease(D3.easeCubicOut)
                  .duration(800)
                  .attr('d', line);
              });
          }
          // if (JSON.stringify(prevData[index]) !== JSON.stringify(data[index])) {
          //   if (
          //     true
          //     // JSON.stringify(prevData[prevData.length - 1]) !==
          //     // JSON.stringify(data[data.length - 1])
          //   ) {
          //     path
          //       .transition()
          //       .duration(500)
          //       .attr('d', initialLine)
          //       .on('end', () => {
          //         path
          //           .data([dataSet])
          //           .transition()
          //           .duration(500)
          //           .attr('d', line);
          //       });
          //   }
          // }
        });
      },
      remove: () => {
        data.forEach((_, index) => {
          chartSelector
            .selectAll(`.line-${keywordList[index]}`)
            // .on('end', (selection) => {
            //   selection
            .transition()
            .duration(1000)
            .style('opacity', 0)
            .remove();
          // });
        });
      },
    }),
    [width, data, JSON.stringify(data) === JSON.stringify(prevData)],
  );

  return lineRef;
};

export default useD3Line;
