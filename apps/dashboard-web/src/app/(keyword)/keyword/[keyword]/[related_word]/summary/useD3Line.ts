import * as D3 from 'd3';
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

interface LineRef {
  //   line: D3.Line<DataItem>;
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

const useD3Line = ({
  chartSelector,
  data,
  dimensions,
  xScale,
  yScale,
  styleMethod,
  title,
}: Props) => {
  const { width, height, marginTop, marginRight, marginBottom, marginLeft } =
    dimensions;

  const lineRef = useRef<LineRef | null>(null);

  //   const { x } = useXAxis({ chartSelector, data, dimensions });

  //   const { y } = useYAxis({ chartSelector, data, dimensions });

  const prevData = usePrevious(data);

  const [trigger, setTrigger] = useState(true);

  useImperativeHandle(
    lineRef,
    () => ({
      render: () => {
        if (!xScale || !yScale) return; // Ensure scales are defined before rendering

        const line = D3.line<DataItem>()
          .x((datum) => {
            return Number(xScale?.(datum.date)) + xScale?.bandwidth() / 2;
          })
          .y((d) => {
            return yScale?.(d.value);
          })
          .curve(D3.curveCatmullRom);

        const initialLine = D3.line<DataItem>()
          .x((datum) => {
            return Number(xScale?.(datum.date)) + xScale?.bandwidth() / 2;
          })
          .y(() => yScale?.(0))
          .curve(D3.curveCatmullRom);

        const path = chartSelector.selectAll(`.${title}`).data([data]);

        path
          .enter()
          .append('path')
          .attr('fill', 'none')
          .attr('class', `${title}`)
          .attr('stroke', '#F0ABFC')

          .attr('stroke-width', 5)
          .style('stroke-linecap', 'round')
          .call((line) => {
            if (styleMethod) {
              styleMethod(line);
            }
          })
          .attr('d', initialLine)
          .transition()
          .duration(1000)
          .attr('d', line)
          .style('opacity', 1.0);

        if (JSON.stringify(prevData) !== JSON.stringify(data)) {
          path

            .transition()
            .duration(500)
            .attr('d', initialLine)
            .on('end', () => {
              path.data([data]).transition().duration(500).attr('d', line);
            });
        }

        // path.exit().transition().duration(500).style('opacity', 0);
      },
      remove: () => {
        chartSelector
          .selectAll(`.${title}`)
          .transition()
          .duration(1000)
          .style('opacity', 0)
          .remove();
      },
    }),
    [width, data, JSON.stringify(data) === JSON.stringify(prevData)],
  );

  return lineRef;
};

export default useD3Line;

// const lineGenerator = D3.line<DataItem>()
// .x((d) => (xScale(d.date) as number) + xScale.bandwidth() / 2)
// .y((d) => yScale(d.value))
// .curve(D3.curveCatmullRom);

// const initialLineGenerator = D3.line<DataItem>()
// .x((d) => (xScale(d.date) as number) + xScale.bandwidth() / 2)
// .y(() => yScale(0))
// .curve(D3.curveCatmullRom);

// const path = chartSelector
// .append('path')
// .datum(data)
// .attr('fill', 'none')
// .attr('stroke', '#F0ABFC')
// .attr('stroke-width', 5)
// .attr('class', 'line-path')
// .attr('d', initialLineGenerator); // 초기 라인을 높이 0으로 설정

// // Transition to height 0
// path
// .transition()
// .duration(1000)
// .attr('d', initialLineGenerator)
// .on('end', () => {
//   // After delay, transition to new data
//   path
//     .transition()
//     .delay(1000)
//     .duration(1000)
//     .attr('d', lineGenerator);
// });

// chartSelector
// .append('g')
// .attr('transform', `translate(0,${height - marginBottom})`)
// .call(D3.axisBottom(xScale));

// chartSelector
// .append('g')
// .attr('transform', `translate(${marginLeft},0)`)
// .call(D3.axisLeft(yScale));

//왼쪽에서 오른쪽으로 transition이 걸린 line
// const totalLength = path.node()?.getTotalLength() || 0;

// path
//   .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
//   .attr('stroke-dashoffset', totalLength)
//   .transition()
//   .duration(1000)
//   .attr('stroke-dashoffset', 0);

// chartSelector
//   .append('g')
//   .attr('transform', `translate(0,${height - marginBottom})`)
//   .call(D3.axisBottom(xScale));

// chartSelector
//   .append('g')
//   .attr('transform', `translate(${marginLeft},0)`)
//   .call(D3.axisLeft(yScale));
