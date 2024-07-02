'use client';

import * as D3 from 'd3';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { cn } from '@/utils/cn';

import LineChar2t from './Test';
import LineChart from './TestAnimate';
import useD3 from './useD3';
import useD3Bar from './useD3Bar';
import useD3Line from './useD3Line';
import useXAxis from './useXAxis';
import useYAxis from './useYAxis';

const summaryChartList = [
  { label: '조회수', value: 'views' },
  { label: '성과', value: 'performance' },
  { label: '검색량', value: 'searchRatio' },
  { label: '발행량', value: 'videoCount' },
] as const;

export interface DataItem {
  date: string;
  value: number; // value 속성의 타입을 number로 명시
  color: string;
}

const SummaryChart = () => {
  const selectRef = useRef<HTMLDivElement>(null);

  const [element, setElement] = useState(null);

  const [summaryChartType, setSummaryChartType] =
    useState<(typeof summaryChartList)[number]['value']>('views');

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

  // const data: DataItem[] = [
  //   { date: '2024-05-01', value: 222, color: 'red' },
  //   { date: '2024-05-02', value: 311, color: 'orange' },
  //   { date: '2024-05-03', value: 290, color: 'yellow' },
  //   { date: '2024-05-04', value: 288, color: 'green' },
  //   { date: '2024-05-05', value: 230, color: 'blue' },
  //   { date: '2024-05-06', value: 222, color: 'indigo' },
  // ];

  // const data2: DataItem[] = [
  //   { date: '2024-05-01', value: 50, color: 'red' },
  //   { date: '2024-05-02', value: 60, color: 'orange' },
  //   { date: '2024-05-03', value: 40, color: 'yellow' },
  //   { date: '2024-05-04', value: 28, color: 'green' },
  //   { date: '2024-05-05', value: 34, color: 'blue' },
  //   { date: '2024-05-06', value: 21, color: 'indigo' },
  // ];

  // const data3: DataItem[] = [
  //   { date: '2024-05-01', value: 60, color: '#818CF8' },
  //   { date: '2024-05-02', value: 15, color: '#818CF8' },
  //   { date: '2024-05-03', value: 26, color: '#818CF8' },
  //   { date: '2024-05-04', value: 34, color: '#818CF8' },
  //   { date: '2024-05-05', value: 31, color: '#818CF8' },
  //   { date: '2024-05-06', value: 22, color: '#818CF8' },
  // ];

  const [data, setData] = useState([
    { date: '2024-05-01', value: 222, color: 'red' },
    { date: '2024-05-02', value: 311, color: 'orange' },
    { date: '2024-05-03', value: 290, color: 'yellow' },
    { date: '2024-05-04', value: 288, color: 'green' },
    { date: '2024-05-05', value: 230, color: 'blue' },
    { date: '2024-05-06', value: 222, color: 'indigo' },
  ]);

  const [data2, setData2] = useState([
    { date: '2024-05-01', value: 50, color: 'red' },
    { date: '2024-05-02', value: 60, color: 'orange' },
    { date: '2024-05-03', value: 40, color: 'yellow' },
    { date: '2024-05-04', value: 28, color: 'green' },
    { date: '2024-05-05', value: 34, color: 'blue' },
    { date: '2024-05-06', value: 21, color: 'indigo' },
  ]);

  const [data3, setData3] = useState([
    { date: '2024-05-01', value: 60, color: '#818CF8' },
    { date: '2024-05-02', value: 15, color: '#818CF8' },
    { date: '2024-05-03', value: 26, color: '#818CF8' },
    { date: '2024-05-04', value: 34, color: '#818CF8' },
    { date: '2024-05-05', value: 31, color: '#818CF8' },
    { date: '2024-05-06', value: 22, color: '#818CF8' },
  ]);

  const { width } = useDimensions(selectRef);
  const height = 220;
  const marginTop = 0;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 0;

  const dimensions = {
    width,
    height,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
  };

  const svgRef = useRef<SVGSVGElement | null>(null); // SVG 엘리먼트의 ref 추가

  // let svg: D3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  useEffect(() => {
    // 컴포넌트가 마운트될 때 SVG 생성
    const svg = D3.select('#summary-chart')
      .append('svg')

      .attr('preserveAspectRatio', 'xMidYMid meet');
    svgRef.current = svg.node(); // SVG 엘리먼트의 ref 설정

    // chart 객체 초기화

    return () => {
      // 컴포넌트가 언마운트될 때 SVG 제거
      svg.remove();
    };
  }, []); //

  const chart = D3.select('#summary-chart')
    .select('svg')
    .attr('width', width)
    .attr('height', height);

  const { y, yAxisRef } = useYAxis({
    chartSelector: chart,
    data: data,
    dimensions,
    styleMethod(selection) {
      selection.attr('stroke-dasharray', '5, 5').style('opacity', 0.2);
    },
  });

  const { y: y2 } = useYAxis({
    chartSelector: chart,
    data: data2,
    dimensions,
    styleMethod(selection) {
      selection.attr('stroke-dasharray', '5, 5').style('opacity', 0.2);
    },
  });

  const { y: y3 } = useYAxis({
    chartSelector: chart,
    data: data3,
    dimensions,
    styleMethod(selection) {
      selection.attr('stroke-dasharray', '5, 5').style('opacity', 0.2);
    },
  });

  const { x, xAxisRef } = useXAxis({
    chartSelector: chart,
    data: data,
    dimensions,
  });

  const { x: x2, xAxisRef: xAxisRef2 } = useXAxis({
    chartSelector: chart,
    data: data2,
    dimensions,
  });

  const { x: x3, xAxisRef: xAxisRef3 } = useXAxis({
    chartSelector: chart,
    data: data3,
    dimensions,
  });

  const line = useD3Line({
    chartSelector: chart,
    data: data,
    dimensions,
    xScale: x,
    yScale: y,
    styleMethod(selection) {
      selection.style('stroke', '#F0516D');
    },
    title: '일일조회수',
  });

  const line2 = useD3Line({
    chartSelector: chart,
    data: data2,
    dimensions,
    xScale: x2,
    yScale: y2,
    styleMethod(selection) {
      selection.style('stroke', '#818CF8');
    },
    title: '영상수',
  });

  const line3 = useD3Line({
    chartSelector: chart,
    data: data3,
    dimensions,
    xScale: x3,
    yScale: y3,
    styleMethod(selection) {
      selection.style('stroke', '#34D399');
    },
    title: '검색량',
  });

  const bar = useD3Bar({
    chartSelector: chart,
    data: data,
    dimensions,
    xScale: x,
    yScale: y,
    title: '일일조회수',
    styleMethod(selection) {
      selection.attr('rx', 0);
      selection.attr('fill', '#F0516D');
    },
  });

  const bar2 = useD3Bar({
    chartSelector: chart,
    data: data2,
    dimensions,
    xScale: x2,
    yScale: y2,
    xPositionMethod(xScale, data) {
      return (xScale(data.date) as number) + xScale.bandwidth() / 2 - 10;
    },
    styleMethod(selection) {
      selection.attr('rx', 0);
      selection.attr('fill', '#818CF8');
    },
    title: '영상수',
  });

  const bar3 = useD3Bar({
    chartSelector: chart,
    data: data3,
    dimensions,
    xScale: x3,
    yScale: y3,
    xPositionMethod(xScale, data) {
      return (xScale(data.date) as number) + xScale.bandwidth() / 2 + 10;
    },
    styleMethod(selection) {
      selection.attr('rx', 0);
      selection.attr('fill', '#34D399');
    },
    title: '검색량',
  });

  useEffect(() => {
    chart.selectAll('*').remove();

    yAxisRef.current?.render();
    xAxisRef.current?.render();
    xAxisRef2.current?.render();
    xAxisRef3.current?.render();
  }, [width, xAxisRef, yAxisRef]);

  useEffect(() => {
    if (summaryChartType === 'videoCount') {
      bar.current?.render();
      bar2.current?.render();
      bar3.current?.render();
      line.current?.remove();
      line2.current?.remove();
      line3.current?.remove();
    } else {
      bar.current?.remove();
      bar2.current?.remove();
      bar3.current?.remove();
      line.current?.render();
      line2.current?.render();
      line3.current?.render();
    }
  }, [width, data, data2, data3, summaryChartType]);

  const [number, setNumber] = useState([2, 4, 5, 6, 7]);
  return (
    <div className="flex gap-[20px]">
      {/* <LineChar2t /> */}
      {/* <LineChart data={number} width={width} height={height} /> */}
      {/* <button onClick={() => yAxis.current?.render()}>안녕 테스트</button> */}
      <ul className="flex w-[100px] shrink-0 flex-col gap-[20px] text-center text-[20px] font-bold">
        {summaryChartList.map((item) => (
          <li
            className={cn('cursor-pointer', {
              'text-primary400': item.value === summaryChartType,
            })}
            key={item.value}
            onClick={() => {
              setSummaryChartType(item.value);

              if (item.value === 'videoCount') {
                line.current?.remove();
                line2.current?.remove();
                line3.current?.remove();
              } else {
                setData([
                  {
                    date: '2024-05-01',
                    value: Math.random() * 100,
                    color: 'red',
                  },
                  {
                    date: '2024-05-02',
                    value: Math.random() * 100,
                    color: 'orange',
                  },
                  {
                    date: '2024-05-03',
                    value: Math.random() * 100,
                    color: 'yellow',
                  },
                  {
                    date: '2024-05-04',
                    value: Math.random() * 100,
                    color: 'green',
                  },
                  {
                    date: '2024-05-05',
                    value: Math.random() * 100,
                    color: 'blue',
                  },
                  {
                    date: '2024-05-06',
                    value: Math.random() * 100,
                    color: 'indigo',
                  },
                ]);
                setData2([
                  {
                    date: '2024-05-01',
                    value: Math.random() * 100,
                    color: 'red',
                  },
                  {
                    date: '2024-05-02',
                    value: Math.random() * 100,
                    color: 'orange',
                  },
                  {
                    date: '2024-05-03',
                    value: Math.random() * 100,
                    color: 'yellow',
                  },
                  {
                    date: '2024-05-04',
                    value: Math.random() * 100,
                    color: 'green',
                  },
                  {
                    date: '2024-05-05',
                    value: Math.random() * 100,
                    color: 'blue',
                  },
                  {
                    date: '2024-05-06',
                    value: Math.random() * 100,
                    color: 'indigo',
                  },
                ]);

                setData3([
                  {
                    date: '2024-05-01',
                    value: Math.random() * 100,
                    color: '#818CF8',
                  },
                  {
                    date: '2024-05-02',
                    value: Math.random() * 100,
                    color: '#818CF8',
                  },
                  {
                    date: '2024-05-03',
                    value: Math.random() * 100,
                    color: '#818CF8',
                  },
                  {
                    date: '2024-05-04',
                    value: Math.random() * 100,
                    color: '#818CF8',
                  },
                  {
                    date: '2024-05-05',
                    value: Math.random() * 100,
                    color: '#818CF8',
                  },
                  {
                    date: '2024-05-06',
                    value: Math.random() * 100,
                    color: '#818CF8',
                  },
                ]);
              }
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <>
        {/* grid cols 넣으니깐 부모에 반응형적으로 자식이 제어가 된다.. 흠.. 왜그러지  */}
        <div
          className="grid flex-grow grid-cols-1 [&_svg]:overflow-visible"
          id="summary-chart"
          ref={selectRef}
        ></div>
      </>
    </div>
  );
};

export default SummaryChart;
