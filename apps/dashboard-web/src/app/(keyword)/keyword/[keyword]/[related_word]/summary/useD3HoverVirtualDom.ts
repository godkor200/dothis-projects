import * as D3 from 'd3';
import { useImperativeHandle, useRef } from 'react';

import type { DataItem } from './SummaryChart';

interface LineRef<T> {
  //   line: D3.Line<DataItem>;
  render: (selectorFn: {
    handleSelectHoverCircle: () => D3.Selection<
      SVGCircleElement,
      T,
      D3.BaseType,
      unknown
    >;
    handleSelectHoverLines: () => D3.Selection<
      SVGRectElement,
      T,
      D3.BaseType,
      unknown
    >;
  }) => void;
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

  tooltip: D3.Selection<D3.BaseType, unknown, HTMLElement, any>;
  tooltipColorCallback: (index: number, colorList: string[]) => void;
  keywordList: string[];
}

const useD3HoverVirtualDom = ({
  chartSelector,
  data,
  dimensions,
  xScale,
  tooltip,
  tooltipColorCallback,
  keywordList,
}: Props) => {
  const { width, height, marginTop, marginRight, marginBottom, marginLeft } =
    dimensions;

  const hoverVirtualRef = useRef<LineRef<DataItem> | null>(null);

  const timeSeriesData = data[0];

  const handleSelectHoverVirtualDom = () => {
    return chartSelector.select<SVGGElement>('.hover-virtual-rect-group');
  };

  const tooltipContent = (
    data: DataItem,
    index: number,
    colorList: string[],
  ) => {
    return `<div style="display:flex; align-items:center;"> 
              <div  style="border:2px solid ${tooltipColorCallback(
                index,
                colorList,
              )}; width:8px; height:8px; border-radius:9999px; background-color:transparent; margin-right:8px;" ></div>
                <p style="color: #E4E4E7; font-size: 14px;
                  font-style: normal;
                  font-weight: 700; flex-basis: 30%; margin-right:8px;">${data.value.toLocaleString(
                    'ko-kr',
                  )}</p>
                <p style="color: #A1A1AA; font-size: 12px;
                font-style: normal;
                font-weight: 500; white-space:nowrap;"> ${
                  keywordList[index]
                } </p>
              </div>`;
  };

  useImperativeHandle(hoverVirtualRef, () => ({
    render: ({ handleSelectHoverCircle, handleSelectHoverLines }) => {
      if (!xScale) return;

      let hoverLineGroup = chartSelector.select<SVGGElement>(
        '.hover-virtual-rect-group',
      );
      if (hoverLineGroup.empty()) {
        // If it doesn't exist, create it

        hoverLineGroup = chartSelector
          .append('g')
          .attr('class', 'hover-virtual-rect-group');
      }

      const hoverDotsSelector = handleSelectHoverCircle();

      const hoverLinesSelector = handleSelectHoverLines();

      hoverLineGroup
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
            .filter((d, item) => (d as DataItem).date === i.date)
            .style('opacity', 1);

          hoverDotsSelector
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
                    return tooltipContent(d, index, colorList);
                  })
                  .join('')}
            </div>`,
            )
            .style('left', mouseY + convertRemToPixels(-1.6) + 'px')
            .style('top', mouseX - convertRemToPixels(2) + 'px');
        })
        .on('mousemove', function (e, i) {
          const [mouseX, mouseY] = D3.pointer(e);

          return tooltip

            .style('top', mouseY + convertRemToPixels(-1.6) + 'px')
            .style('left', mouseX + convertRemToPixels(2) + 'px');
        })
        .on('mouseout', (e) => {
          //   데이터가 정상적으로 로드되지 않았을 때 dotsSelector도 존재하지 않아서 mouseout circle 이벤트 효과가 기대했던대로 동작하지 않는 버그가 존재 --> 그로인해 dotsSelector 비어있을 경우 (즉 데이터가 불러오지 못했을 경우 해당 chart 안에 circle을 전부 지워버리도록 코드 추가 (hover 시에 circle에 class를 추가하는 방식도 고려해볼 수 있음 -지울 때 circle 범위를 축소시키기 위해))

          /**
           * dotsSelector.empty로 구성했을 경우 두 번째 이상으로 활성된 circle에 대해서는 또 대응을 하지 못한다. 첫 번째로 가져온 연관어에 대해서는 데이터를 불러와서 empty 조건에 넘어가지 못함
           *
           */
          //   if (dotsSelector.empty()) {
          // chartSelector.selectAll('circle').style('opacity', 0);
          // }

          hoverDotsSelector.style('opacity', 0);

          D3.select(e.target).transition().attr('r', 2);

          hoverLinesSelector.style('opacity', 0);

          tooltip.transition().duration(0);
          tooltip.style('display', 'none');
        });

      hoverLineGroup
        .selectAll('rect')
        .data(timeSeriesData)
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
            .filter((d, item) => (d as DataItem).date === i.date)
            .style('opacity', 1);

          hoverDotsSelector
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
                  return tooltipContent(d, index, colorList);
                })
                .join('')}
          </div>`,
            )
            .style('left', mouseY + convertRemToPixels(-1.6) + 'px')
            .style('top', mouseX - convertRemToPixels(2) + 'px');
        })
        .on('mousemove', function (e, i) {
          const [mouseX, mouseY] = D3.pointer(e);

          return tooltip

            .style('top', mouseY + convertRemToPixels(-1.6) + 'px')
            .style('left', mouseX + convertRemToPixels(2) + 'px');
        })
        .on('mouseout', (e) => {
          //   데이터가 정상적으로 로드되지 않았을 때 dotsSelector도 존재하지 않아서 mouseout circle 이벤트 효과가 기대했던대로 동작하지 않는 버그가 존재 --> 그로인해 dotsSelector 비어있을 경우 (즉 데이터가 불러오지 못했을 경우 해당 chart 안에 circle을 전부 지워버리도록 코드 추가 (hover 시에 circle에 class를 추가하는 방식도 고려해볼 수 있음 -지울 때 circle 범위를 축소시키기 위해))

          /**
           * dotsSelector.empty로 구성했을 경우 두 번째 이상으로 활성된 circle에 대해서는 또 대응을 하지 못한다. 첫 번째로 가져온 연관어에 대해서는 데이터를 불러와서 empty 조건에 넘어가지 못함
           *
           */
          //   if (dotsSelector.empty()) {
          // chartSelector.selectAll('circle').style('opacity', 0);
          // }

          hoverDotsSelector.style('opacity', 0);

          D3.select(e.target).transition().attr('r', 2);

          hoverLinesSelector.style('opacity', 0);

          tooltip.transition().duration(0);
          tooltip.style('display', 'none');
        });
    },
    remove: () => {
      const hoverVirtualDomSelector = handleSelectHoverVirtualDom();

      hoverVirtualDomSelector.remove();
    },
  }));

  return { hoverVirtualRef };
};

export default useD3HoverVirtualDom;
const convertRemToPixels = (rem: number) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};
