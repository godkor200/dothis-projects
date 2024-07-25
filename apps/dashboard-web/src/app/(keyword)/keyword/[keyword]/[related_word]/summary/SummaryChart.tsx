'use client';

import * as D3 from 'd3';
import { useEffect, useRef, useState } from 'react';

import {
  useDailyViewList,
  useExpectedViewList,
  useSearchRatioFormmaterListD3,
  useUploadVideoCountFormatterListD3,
} from '@/hooks/contents/useChartFormatter';
import useGetRankingRelWords from '@/hooks/react-query/query/useGetRankingRelWords';
import useDimensions from '@/hooks/useDimenstions';
import type { TKeywords } from '@/types/common';
import { cn } from '@/utils/cn';

import { useSelectedKeywordContext } from '../comparison/SelectedKeywordProvider';
import useD3Bars from './useD3Bars';
import useD3Lines from './useD3Lines';
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

  const [summaryChartType, setSummaryChartType] =
    useState<(typeof summaryChartList)[number]['value']>('views');

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
    views: chartDataList,
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

      line.current?.remove();
    } else {
      bar.current?.remove();

      line.current?.render();
    }
  }, [width, summaryChartType, currentData, relatedKeywordList]);

  return (
    <div className="flex gap-[20px]">
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
              }
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <>
        {/* grid cols 넣으니깐 부모에 반응형적으로 자식이 제어가 된다.   */}
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
