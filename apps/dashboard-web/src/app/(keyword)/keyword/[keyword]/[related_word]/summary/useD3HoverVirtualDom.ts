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
  data: DataItem[][];
  dimensions: Dimensions;
  xScale: D3.ScaleBand<string> | undefined;
  hoverLinesSelector: D3.Selection<
    SVGRectElement,
    DataItem,
    SVGGElement,
    unknown
  > | null;
  tooltip: D3.Selection<D3.BaseType, unknown, HTMLElement, any>;
  dotsSelector: D3.Selection<D3.BaseType, unknown, D3.BaseType, unknown>;
  tooltipColorCallback: (index: number, colorList: string[]) => void;
}

const useD3HoverVirtualDom = ({
  chartSelector,
  data,
  dimensions,
  xScale,
  hoverLinesSelector,
  tooltip,
  dotsSelector,
  tooltipColorCallback,
}: Props) => {
  const { width, height, marginTop, marginRight, marginBottom, marginLeft } =
    dimensions;

  const hoverVirtualRef = useRef<LineRef | null>(null);

  //   console.log(hoverLineGroup.empty());
  //   if (hoverLineGroup.empty()) {
  //     chartSelector.append('g').attr('class', 'hover-line-group');
  //   }

  const timeSeriesData = data[0];

  useImperativeHandle(hoverVirtualRef, () => ({
    render: () => {
      if (!xScale || !hoverLinesSelector) return;

      chartSelector
        .append('g')
        .selectAll('rect')
        .data(timeSeriesData)
        .enter()
        .append('rect')
        .attr(
          'x',
          (d) => (xScale(d?.date) as number) + xScale.bandwidth() / 2 - 20,
        )
        .attr('y', marginTop)
        .attr('width', 40)
        .attr('height', height - marginBottom - marginTop)
        .attr('fill', 'transparent')
        .raise()
        .on('mouseover', (e, i) => {
          // console.log(e);

          const bisect = D3.bisector(
            (d: DataItem | (typeof timeSeriesData)[number]) => d.date,
          ).left;

          const bisectArray = data.map((currentData) => {
            const dataLavel = bisect(currentData, i.date);

            return currentData[dataLavel];
          });

          hoverLinesSelector
            .filter((d) => {
              return d.date === i.date;
            })
            .style('opacity', 1);

          chartSelector
            .selectAll('circle')
            .filter((d, item) => (d as DataItem).date === i.date)
            .style('opacity', 1);

          D3.select(e.target).transition().attr('r', 4);

          const [mouseX, mouseY] = D3.pointer(e);

          tooltip.transition().duration(0).style('display', 'block');
          const colorList = ['green', 'blue'];
          tooltip
            .html(
              `<div>  
                ${bisectArray
                  .map((d, index) => {
                    return `<div style="display:flex; align-items:center;"> 
                                <div  style="border:2px solid ${tooltipColorCallback(
                                  index,
                                  colorList,
                                )}; width:8px; height:8px; border-radius:9999px; background-color:transparent; margin-right:8px;" ></div>
                                <p style="color: #E4E4E7; font-size: 14px;
                                font-style: normal;
                                font-weight: 700; flex-basis: 30%; margin-right:8px;">${d.value.toLocaleString(
                                  'ko-kr',
                                )}</p>
                                <p style="color: #A1A1AA; font-size: 12px;
                                font-style: normal;
                                font-weight: 500; white-space:nowrap;"> ${`일일조회수`} </p>
                            </div>`;
                  })
                  .join('')}
            </div>`,
            )
            .style('left', mouseY + convertRemToPixels(-1.6) + 'px')
            .style('top', mouseX - convertRemToPixels(2) + 'px');
        })
        .on('mousemove', function (e, i) {
          const [mouseX, mouseY] = D3.pointer(e);

          return (
            tooltip
              // .style(
              //   'transform',
              //   `translate(${mouseX}px, ${mouseY}px)`,
              // );
              .style('top', mouseY + convertRemToPixels(-1.6) + 'px')
              .style('left', mouseX + convertRemToPixels(2) + 'px')
          );
        })
        .on('mouseout', (e) => {
          dotsSelector.style('opacity', 0);

          D3.select(e.target).transition().attr('r', 2);

          hoverLinesSelector.style('opacity', 0);

          tooltip.transition().duration(0);
          tooltip
            // .style('left', '-999px')
            // .style('top', '-999px')
            .style('display', 'none');
        });
    },
    remove: () => {},
  }));

  return { hoverVirtualRef };
};

export default useD3HoverVirtualDom;
const convertRemToPixels = (rem: number) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};
