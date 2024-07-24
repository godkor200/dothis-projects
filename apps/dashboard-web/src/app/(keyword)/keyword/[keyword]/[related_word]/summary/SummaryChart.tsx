'use client';

import * as D3 from 'd3';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import {
  useDailyViewList,
  useExpectedViewList,
  useSearchRatioFormmaterListD3,
  useUploadVideoCountFormatterListD3,
} from '@/hooks/contents/useChartFormatter';
import useGetRankingRelWords from '@/hooks/react-query/query/useGetRankingRelWords';
import type { TKeywords } from '@/types/common';
import { cn } from '@/utils/cn';

import { useSelectedKeywordContext } from '../comparison/SelectedKeywordProvider';
import useD3 from './useD3';
import useD3Bars from './useD3Bars';
import useD3Lines from './useD3Lines';
import useDailyViewQueries from './useDailyViewQueries';
import useNaverSearchQueries from './useNaverSearchQueries';
import useXAxes from './useXAxes';
import useYAxes from './useYAxes';

const summaryChartList = [
  { label: '조회수', value: 'views' },
  { label: '성과', value: 'performance' },
  { label: '검색량', value: 'searchRatio' },
  { label: '발행량', value: 'videoCount' },
] as const;

export interface DataItem {
  date: string;
  value: number; // value 속성의 타입을 number로 명시
  // color: string;
}

const SummaryChart = ({ baseKeyword, relatedKeyword }: TKeywords) => {
  const selectRef = useRef<HTMLDivElement>(null);

  const [element, setElement] = useState(null);

  const [summaryChartType, setSummaryChartType] =
    useState<(typeof summaryChartList)[number]['value']>('views');

  // const viewsDatta = useViewsQuery();

  // const performanceData = useperformanceQuery();

  // const searchRatioData = usesearchRatioQuery();

  // const videoCountData = usevideoCountQuery();

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

  const lineData = [
    [
      { date: '2024-05-01', value: 222, color: '#F0516D' },
      { date: '2024-05-02', value: 311, color: '#F0516D' },
      { date: '2024-05-03', value: 290, color: '#F0516D' },
      { date: '2024-05-04', value: 288, color: '#F0516D' },
      { date: '2024-05-05', value: 230, color: '#F0516D' },
      { date: '2024-05-06', value: 222, color: '#F0516D' },
    ],
    [
      { date: '2024-05-01', value: 50, color: '#34D399' },
      { date: '2024-05-02', value: 60, color: '#34D399' },
      { date: '2024-05-03', value: 40, color: '#34D399' },
      { date: '2024-05-04', value: 28, color: '#34D399' },
      { date: '2024-05-05', value: 34, color: '#34D399' },
      { date: '2024-05-06', value: 21, color: '#34D399' },
    ],
    [
      { date: '2024-05-01', value: 60, color: '#818CF8' },
      { date: '2024-05-02', value: 15, color: '#818CF8' },
      { date: '2024-05-03', value: 26, color: '#818CF8' },
      { date: '2024-05-04', value: 34, color: '#818CF8' },
      { date: '2024-05-05', value: 31, color: '#818CF8' },
      { date: '2024-05-06', value: 22, color: '#818CF8' },
    ],
  ];

  const [mockLine, setMockLine] = useState([
    [
      { date: '2024-07-15', value: 222 },
      { date: '2024-07-16', value: 311 },
      { date: '2024-07-17', value: 290 },
      { date: '2024-07-18', value: 288 },
      { date: '2024-07-19', value: 230 },
      { date: '2024-07-20', value: 222 },
      { date: '2024-07-21', value: 222 },
    ],
    [
      { date: '2024-07-15', value: 50 },
      { date: '2024-07-16', value: 60 },
      { date: '2024-07-17', value: 40 },
      { date: '2024-07-18', value: 28 },
      { date: '2024-07-19', value: 34 },
      { date: '2024-07-20', value: 21 },
      { date: '2024-07-21', value: 21 },
    ],
    [
      { date: '2024-07-15', value: 60 },
      { date: '2024-07-16', value: 15 },
      { date: '2024-07-17', value: 26 },
      { date: '2024-07-18', value: 34 },
      { date: '2024-07-19', value: 31 },
      { date: '2024-07-20', value: 22 },
      { date: '2024-07-21', value: 22 },
    ],
  ]);

  const keywordList = ['파워', '서울', '대구'];
  // const mockList = [
  //   {
  //     data: [
  //       { date: '2024-05-01', value: 222, color: '#F0516D' },
  //       { date: '2024-05-02', value: 311, color: '#F0516D' },
  //       { date: '2024-05-03', value: 290, color: '#F0516D' },
  //       { date: '2024-05-04', value: 288, color: '#F0516D' },
  //       { date: '2024-05-05', value: 230, color: '#F0516D' },
  //       { date: '2024-05-06', value: 222, color: '#F0516D' },
  //     ],
  //     keyword: '대구',
  //   },
  //   {
  //     data: [
  //       { date: '2024-05-01', value: 50, color: '#34D399' },
  //       { date: '2024-05-02', value: 60, color: '#34D399' },
  //       { date: '2024-05-03', value: 40, color: '#34D399' },
  //       { date: '2024-05-04', value: 28, color: '#34D399' },
  //       { date: '2024-05-05', value: 34, color: '#34D399' },
  //       { date: '2024-05-06', value: 21, color: '#34D399' },
  //     ],
  //     keyword: '파워',
  //   },
  //   {
  //     data: [
  //       { date: '2024-05-01', value: 60, color: '#818CF8' },
  //       { date: '2024-05-02', value: 15, color: '#818CF8' },
  //       { date: '2024-05-03', value: 26, color: '#818CF8' },
  //       { date: '2024-05-04', value: 34, color: '#818CF8' },
  //       { date: '2024-05-05', value: 31, color: '#818CF8' },
  //       { date: '2024-05-06', value: 22, color: '#818CF8' },
  //     ],
  //     keyword: '서울',
  //   },
  // ];

  const { width } = useDimensions(selectRef);

  const height = 324;
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

  const { relatedKeywordList, setRelatedKeywordList } =
    useSelectedKeywordContext('RelatedKeywordList');

  const {
    data: rankingList,
    isLoading,
    isError,
    refetch,
  } = useGetRankingRelWords(baseKeyword);

  const sortedRelatedKeywordList = relatedKeywordList.sort((a, b) => {
    if (!rankingList || rankingList.indexOf(a) === rankingList.indexOf(b)) {
      return 0;
    }

    // nulls sort after anything else
    if (rankingList.indexOf(a) === -1) {
      return 1;
    }
    if (rankingList.indexOf(b) === -1) {
      return -1;
    }

    return rankingList.indexOf(a) < rankingList.indexOf(b) ? -1 : 1;
  });

  const { chartDataList, keywordList: testKeywordList } = useDailyViewList({
    baseKeyword,
    relatedKeywords: sortedRelatedKeywordList,
  });

  const { chartDataList: naverChartDataList, keywordList: naverKeywordList } =
    useSearchRatioFormmaterListD3({
      baseKeyword,
      relatedKeywords: sortedRelatedKeywordList,
    });

  const {
    chartDataList: expectedViewChartList,
    keywordList: expectedKeywordList,
  } = useExpectedViewList({
    baseKeyword,
    relatedKeywords: sortedRelatedKeywordList,
  });

  const {
    chartDataList: uploadVideoChartList,
    keywordList: uploadVideoKeywordList,
  } = useUploadVideoCountFormatterListD3({
    baseKeyword,
    relatedKeywords: sortedRelatedKeywordList,
  });

  const dataMap = {
    views: mockLine.slice(0, sortedRelatedKeywordList.length),
    performance: expectedViewChartList,
    searchRatio: naverChartDataList,
    videoCount: uploadVideoChartList,
  };

  const currentData = dataMap[summaryChartType];

  const selectedListcolors = ['green', 'blue'];

  const updateSelectedColors = ['green', 'blue'];

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

  const { y, yAxisRef } = useYAxes({
    chartSelector: chart,
    data: currentData,
    dimensions,
    styleMethod(selection) {
      selection.attr('stroke-dasharray', '5, 5').style('opacity', 0.2);
    },
  });

  const { x, xAxisRef } = useXAxes({
    chartSelector: chart,
    data: currentData[0],
    dimensions,
  });

  const chartColorSchema = {
    red: '#F0516D',
    blue: '#818CF8',
    green: '#34D399',
    unknown: '#000',
  };

  const line = useD3Lines({
    chartSelector: chart,
    data: currentData,
    dimensions,
    xScale: x,
    yScale: y,
    styleMethod(selection, index, isUpdate) {
      const color: 'red' | 'blue' | 'green' | 'unknown' =
        sortedRelatedKeywordList[index] === relatedKeyword
          ? 'red'
          : isUpdate
          ? updateSelectedColors.length > 0
            ? (updateSelectedColors.shift() as 'blue' | 'green')
            : 'unknown'
          : selectedListcolors.length > 0
          ? (selectedListcolors.shift() as 'blue' | 'green')
          : 'unknown';

      // console.log(
      //   sortedRelatedKeywordList[index],
      //   relatedKeyword,
      //   chartColorSchema[color],
      // );

      selection.classed('red blue green unknown', false);
      selection.attr('stroke', chartColorSchema[color]);
    },
    title: '일일조회수',
    keywordList: sortedRelatedKeywordList,
  });

  const xOffset = [-10, 0, 10]; // Offsets for each dataset index

  const bar = useD3Bars({
    chartSelector: chart,
    data: currentData,
    dimensions,
    xScale: x,
    yScale: y,
    title: '일일조회수',
    styleMethods: [
      (selection) => {
        selection.style('fill', '#F0516D');
        selection.attr('rx', 0);
      },
      (selection) => {
        selection.style('fill', '#4CAF50');
        selection.attr('rx', 0);
      },
      (selection) => {
        selection.attr('fill', '#818CF8');
        selection.attr('rx', 0);
      },
      // Add more style functions as needed
    ],

    xPositionMethod(xScale, data, index) {
      return (
        (xScale(data.date) as number) + xScale.bandwidth() / 2 + xOffset[index]
      );
    },
  });

  // const bar2 = useD3Bar({
  //   chartSelector: chart,
  //   data: data2,
  //   dimensions,
  //   xScale: x2,
  //   yScale: y2,
  //   xPositionMethod(xScale, data) {
  //     return (xScale(data.date) as number) + xScale.bandwidth() / 2 - 10;
  //   },
  //   styleMethod(selection) {
  //     selection.attr('rx', 0);
  //     selection.attr('fill', '#818CF8');
  //   },
  //   title: '영상수',
  // });

  // const bar3 = useD3Bar({
  //   chartSelector: chart,
  //   data: data3,
  //   dimensions,
  //   xScale: x3,
  //   yScale: y3,
  //   xPositionMethod(xScale, data) {
  //     return (xScale(data.date) as number) + xScale.bandwidth() / 2 + 10;
  //   },
  //   styleMethod(selection) {
  //     selection.attr('rx', 0);
  //     selection.attr('fill', '#34D399');
  //   },
  //   title: '검색량',
  // });

  useEffect(() => {
    chart.selectAll('*').remove();
  }, [width]);

  useEffect(() => {
    yAxisRef.current?.remove();
    xAxisRef.current?.remove();
    yAxisRef.current?.render();
    xAxisRef.current?.render();
  }, [width, xAxisRef, yAxisRef, summaryChartType]);

  useEffect(() => {
    if (summaryChartType === 'videoCount') {
      bar.current?.render();
      // bar2.current?.render();
      // bar3.current?.render();
      line.current?.remove();
      // line2.current?.remove();
      // line3.current?.remove();
    } else {
      bar.current?.remove();
      // bar2.current?.remove();
      // bar3.current?.remove();
      line.current?.render();
      // line2.current?.render();
      // line3.current?.render();
    }
  }, [
    width,
    data,
    data2,
    data3,
    summaryChartType,
    currentData,
    relatedKeywordList,
  ]);

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
                // line2.current?.remove();
                // line3.current?.remove();
              } else {
                setMockLine([
                  [
                    { date: '2024-07-15', value: 222 },
                    { date: '2024-07-16', value: 311 },
                    { date: '2024-07-17', value: 290 },
                    { date: '2024-07-18', value: 288 },
                    { date: '2024-07-19', value: 230 },
                    { date: '2024-07-20', value: 222 },
                    { date: '2024-07-21', value: 222 },
                  ],
                  [
                    {
                      date: '2024-07-15',
                      value: Math.random() * 100,
                    },
                    {
                      date: '2024-07-16',
                      value: Math.random() * 100,
                    },
                    {
                      date: '2024-07-17',
                      value: Math.random() * 100,
                    },
                    {
                      date: '2024-07-18',
                      value: Math.random() * 100,
                    },
                    {
                      date: '2024-07-19',
                      value: Math.random() * 100,
                    },
                    {
                      date: '2024-07-20',
                      value: Math.random() * 100,
                    },
                    {
                      date: '2024-07-21',
                      value: Math.random() * 100,
                    },
                  ],
                  [
                    {
                      date: '2024-07-15',
                      value: Math.random() * 100,
                    },
                    {
                      date: '2024-07-16',
                      value: Math.random() * 100,
                    },
                    {
                      date: '2024-07-17',
                      value: Math.random() * 100,
                    },
                    {
                      date: '2024-07-18',
                      value: Math.random() * 100,
                    },
                    {
                      date: '2024-07-19',
                      value: Math.random() * 100,
                    },
                    {
                      date: '2024-07-20',
                      value: Math.random() * 100,
                    },
                    {
                      date: '2024-07-21',
                      value: Math.random() * 100,
                    },
                  ],
                ]);
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
