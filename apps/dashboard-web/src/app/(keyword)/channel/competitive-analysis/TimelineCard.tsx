import * as D3 from 'd3';
import { useEffect, useRef } from 'react';

import {
  useDailyViewV2,
  useUploadVideoCountFormatterD3,
} from '@/hooks/contents/useChartFormatter';
import useDimensions from '@/hooks/useDimenstions';

import useD3Bar from '../../keyword/[keyword]/[related_word]/summary/useD3Bar';
import useD3Line from '../../keyword/[keyword]/[related_word]/summary/useD3Line';
import useXAxis from '../../keyword/[keyword]/[related_word]/summary/useXAxis';
import useYAxis from '../../keyword/[keyword]/[related_word]/summary/useYAxis';

interface Props {
  keyword: string;
  relword: string;
  index: number;
}

const TimelineCard = ({ keyword, relword, index }: Props) => {
  const selectRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(selectRef);

  const height = 290;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 60;
  const marginLeft = 0;

  const dimensions = {
    width,
    height,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
  };

  const dailyViewData = useDailyViewV2({
    keyword: keyword,
    relword: relword,
  });

  const videoCountData = useUploadVideoCountFormatterD3({
    keyword: keyword,
    relword: relword,
  });

  useEffect(() => {
    // 컴포넌트가 마운트될 때 SVG 생성
    const svg = D3.select(`#content-timeline-chart-${index}`)
      .append('svg')

      .attr('preserveAspectRatio', 'xMidYMid meet');
    // svgRef.current = svg.node(); // SVG 엘리먼트의 ref 설정

    // chart 객체 초기화

    return () => {
      // 컴포넌트가 언마운트될 때 SVG 제거
      svg.remove();
    };
  }, []); //

  const chart = D3.select(`#content-timeline-chart-${index}`)
    .select('svg')
    .attr('width', width)
    .attr('height', height);

  const { y, yAxisRef } = useYAxis({
    chartSelector: chart,
    data: dailyViewData,
    dimensions,
    styleMethod(selection) {
      selection.attr('stroke-dasharray', '5, 5').style('opacity', 0.2);
    },
  });

  const { x, xAxisRef } = useXAxis({
    chartSelector: chart,
    data: dailyViewData,
    dimensions,
  });

  const line = useD3Line({
    chartSelector: chart,
    data: dailyViewData,
    dimensions,
    xScale: x,
    yScale: y,
    styleMethod(selection) {
      //   selection.style('stroke-linecap', 'round');
      //   selection.classed('class', '조회-수');
    },
    curveType: D3.curveStepAfter, //curvelinear
    title: keyword + '조회-수' + index,
  });

  const bar = useD3Bar({
    chartSelector: chart,
    data: videoCountData,
    title: keyword + '발행영상-수' + index,
    dimensions,
    xScale: x,
    yScale: y,
  });

  useEffect(() => {
    chart.selectAll('*').remove();
  }, [width]);

  useEffect(() => {
    // yAxisRef.current?.remove();
    // xAxisRef.current?.remove();
    yAxisRef.current?.render();
    xAxisRef.current?.render();
    // lineHoverRef.current?.render();
  }, [width, xAxisRef, yAxisRef]);

  useEffect(() => {
    // dotRef.current?.remove();

    line.current?.remove();
    bar.current?.remove();

    bar.current?.render();
    line.current?.render();

    const xMargin = 16;
    const yMargin = 6;
    const legendSpacing = 80 + xMargin * 2;

    const legendWidth = 2 * legendSpacing;
    const legendStartX = (width - legendWidth) / 2 + 50;

    const dataReady = [
      { name: '조회-수', values: dailyViewData, color: '#F0ABFC' },
      { name: '발행영상-수', values: dailyViewData, color: '#2a61e0' },
    ];
    const legendBackGround = chart

      .selectAll<SVGRectElement, { name: string; values: any; color: string }>(
        'g.legend-group',
      )
      .data(dataReady, (d) => d.name);

    const legendText = chart
      .selectAll<SVGGElement, { name: string; values: any; color: string }>(
        'g.legend-text',
      )
      .data(dataReady, (d) => d.name);

    const legendBack = legendBackGround
      .enter()
      .append('g')
      .attr('class', 'legend-group');

    const legendTextEnter = legendText
      .enter()
      .append('g')
      .attr('class', 'legend-text');

    legendTextEnter
      .style('fill', '#cf2e2e')
      .style('margin', 8)
      .append('text')
      .attr('class', (d) => `${keyword}legend${d.name}${index}`)
      .attr('text-anchor', 'middle ') // 텍스트 중앙 정렬

      .attr('transform', function (d, i) {
        d.name;
        return `translate(${
          legendStartX + i * legendSpacing
        }, ${height - marginBottom / 8})`;
      })
      // .attr('x', function (d, i) {
      //   return height;
      // })
      // .attr('y', 30)
      .attr('cursor', 'pointer')
      .text(function (d) {
        return d.name.replace(/-/g, ' ');
      })
      .style('fill', function (d) {
        return d.color;
      })
      .style('font-size', 15)
      .style('border', '1px solid black')
      .style('pointer-events', 'none');

    const bbox: Record<string, DOMRect> = {};

    legendTextEnter.each(function (d) {
      bbox[d.name] = this.getBBox();
    });

    legendBack
      .append('rect')
      .attr('fill', '#ff0000')
      .attr('width', (d) => (bbox[d.name]?.width || 0) + 2 * xMargin)
      .attr('height', (d) => (bbox[d.name]?.height || 0) + 2 * yMargin)
      .attr('transform', (d, i) => {
        const textBBox = bbox[d.name];
        const rectX =
          legendStartX + i * legendSpacing - textBBox.width / 2 - xMargin;
        const rectY =
          height - marginBottom / 8 - textBBox.height * 0.8 - yMargin;
        return `translate(${rectX}, ${rectY})`;
      })
      .attr('rx', 10)
      .attr('ry', 10)
      .attr('fill', '#fafafa')
      .attr('stroke', (d) => d.color)
      .attr('stroke-width', 1)
      .attr('cursor', 'pointer')
      .on('click', function (d, i) {
        // is the element currently visible ?

        let currentOpacity: string;
        currentOpacity = D3.selectAll('.' + keyword + i.name + index)?.style(
          'opacity',
        );
        // Change the opacity: from 0 to 1 or from 1 to 0
        D3.selectAll('.' + keyword + i.name + index)
          .transition()
          .style('opacity', Number(currentOpacity) == 1 ? 0.2 : 1);

        D3.selectAll('.' + `${keyword}legend${i.name}${index}`)
          .transition()
          .style('opacity', Number(currentOpacity) == 1 ? 0.2 : 1);
      });

    legendBackGround.exit().remove();
  }, [width, JSON.stringify(dailyViewData)]);

  return (
    <div className="relative flex-grow">
      {/* grid cols 넣으니깐 부모에 반응형적으로 자식이 제어가 된다. 이전 relative 박스가 있기전에    */}
      <div
        className="grid grid-cols-1 [&_svg]:overflow-visible"
        id={`content-timeline-chart-${index}`}
        ref={selectRef}
      ></div>
      <div id={`content-timeline-tooltip-${index}`} className="z-[500]"></div>{' '}
    </div>
  );
};

export default TimelineCard;
