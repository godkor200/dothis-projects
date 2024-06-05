'use client';

import * as D3 from 'd3';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import useD3 from './useD3';
import useD3Line from './useD3Line';
import useXAxis from './useXAxis';
import useYAxis from './useYAxis';

const summaryChartList = [
  { label: '조회수', value: 'views' },
  { label: '성과', value: 'performance' },
  { label: '검색량', value: 'searchRatio' },
  { label: '발행량', value: 'videoCount' },
];

export interface DataItem {
  date: string;
  value: number; // value 속성의 타입을 number로 명시
  color: string;
}

const SummaryChart = () => {
  const selectRef = useRef<HTMLDivElement>(null);

  const chartRef = useRef<D3.Selection<
    SVGSVGElement,
    unknown,
    null,
    undefined
  > | null>(null);

  const useDimensions = (targetRef: React.RefObject<HTMLDivElement>) => {
    const getDimensions = () => {
      return {
        width: targetRef.current ? targetRef.current.offsetWidth : 0,
        height: targetRef.current ? targetRef.current.offsetHeight : 0,
      };
    };

    const [dimensions, setDimensions] = useState(getDimensions);

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    useLayoutEffect(() => {
      handleResize();
    }, []);

    return dimensions;
  };

  const data: DataItem[] = [
    { date: '05/04', value: 222, color: 'red' },
    { date: '05/05', value: 311, color: 'orange' },
    { date: '05/06', value: 290, color: 'yellow' },
    { date: '05/07', value: 288, color: 'green' },
    { date: '05/08', value: 230, color: 'blue' },
    { date: '05/09', value: 222, color: 'indigo' },
  ];

  const { width } = useDimensions(selectRef);
  const height = 220;
  const marginTop = 0;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 0;

  const svgRef = useRef<SVGSVGElement | null>(null); // SVG 엘리먼트의 ref 추가

  // let svg: D3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  useEffect(() => {
    // 컴포넌트가 마운트될 때 SVG 생성
    const svg = D3.select('#summary-chart')
      .append('svg')
      .attr('preserveAspectRatio', 'xMidYMid meet');
    svgRef.current = svg.node(); // SVG 엘리먼트의 ref 설정
    return () => {
      // 컴포넌트가 언마운트될 때 SVG 제거
      svg.remove();
    };
  }, []); //

  const chart = D3.select(svgRef.current)
    .attr('width', width)
    .attr('height', height)
    .attr('preserveAspectRatio', 'xMidYMid meet');

  const yAxis = useYAxis({
    chartSelector: chart,
    data: data,
    dimensions: {
      width,
      height,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
    },
    styleMethod(selection) {
      selection.attr('stroke-dasharray', '5, 5').style('opacity', 0.2);
    },
  });

  const xAxis = useXAxis({
    chartSelector: chart,
    data: data,
    dimensions: {
      width,
      height,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
    },
  });

  const line = useD3Line({
    chartSelector: chart,
    data: data,
    dimensions: {
      width,
      height,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
    },
    xScale: xAxis.current?.x,
    yScale: yAxis.current?.y,
  });

  useEffect(() => {
    chart.selectAll('*').remove();
    console.log('test');
    yAxis.current?.render();
    xAxis.current?.render();
    line.current?.render();
  }, [width, xAxis, yAxis]);

  return (
    <div className="flex gap-[20px]">
      {/* <button onClick={() => yAxis.current?.render()}>안녕 테스트</button> */}
      <ul className="flex w-[100px] flex-col gap-[20px] text-center text-[20px] font-bold">
        {summaryChartList.map((item) => (
          <li className="cursor-pointer" key={item.value}>
            {item.label}
          </li>
        ))}
      </ul>

      <div className="flex-grow" id="summary-chart" ref={selectRef}></div>
    </div>
  );
};

export default SummaryChart;
