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

interface DotRef {
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
  summaryChartType: string;
  keywordList: string[];
}
const useD3HoverDots = ({
  chartSelector,
  data,
  dimensions,
  xScale,
  yScale,
  styleMethod,
  summaryChartType,
  keywordList,
}: Props) => {
  const { width, height, marginTop, marginRight, marginBottom, marginLeft } =
    dimensions;
  const dotRef = useRef<DotRef | null>(null);

  const handleSelectHoverCircle = () => {
    return chartSelector.selectAll<SVGCircleElement, DataItem>('.node');
  };

  useImperativeHandle(dotRef, () => ({
    render: () => {
      if (!xScale || !yScale) return; // Ensure scales are defined before rendering

      chartSelector.selectAll("[class*='node-']").each(function () {
        const dot = D3.select(this);
        const dotClass = dot.attr('class');

        const shouldRemove = keywordList.every(
          (keyword) =>
            !dotClass
              .split(' ')
              .some((className) => className.includes(keyword)),
        );

        if (shouldRemove) {
          dot
            .classed('to-remove', true)
            .transition()
            .duration(200)
            .style('opacity', 0)
            .on('end', function () {
              // transition이 끝난 후 요소 제거
              if (dot.classed('to-remove')) {
                dot.remove();
              }
            }); // Remove the element
        }
      });

      data.forEach((dataSet, index, arr) => {
        /**
         * Line을 그릴 데이터와 이전 데이터를 비교해서 이미 존재 데이터인지 아닌지 체크
         * @param dataArray  prevData입니다
         * @param target Line을 그릴 target
         * @returns boolean
         */

        const y = yScale[index];

        const circles = chartSelector
          .selectAll<SVGCircleElement, DataItem>(`.node-${keywordList[index]}`)
          .data(dataSet, (d) => d.date); // Use date as the key for data binding

        circles.exit().remove(); // Remove old elements not in data

        circles
          .enter()
          .append('circle')
          .attr('class', `node node-${keywordList[index]}`)
          .attr('fill', 'white')
          .call((selection) => {
            styleMethod && styleMethod(selection, index, false);
          })
          .attr('stroke-width', '4px')
          .style('opacity', 0)
          .style('z-index', 9999)
          .attr('r', 5)
          .attr('cx', function (d) {
            return xScale(d.date)! + xScale.bandwidth() / 2;
          })
          .attr('cy', function (d) {
            return y(d.value as number);
          });

        circles
          .attr('cx', function (d) {
            return xScale(d.date)! + xScale.bandwidth() / 2;
          })
          .attr('cy', function (d) {
            return y(d.value as number);
          })
          .call((selection) => {
            styleMethod && styleMethod(selection, index, true);
          });
      });
    },
    remove: () => {
      const hoverDotsSelector = handleSelectHoverCircle();
      hoverDotsSelector.remove();
    },
  }));

  return { dotRef, handleSelectHoverCircle };
};

export default useD3HoverDots;
