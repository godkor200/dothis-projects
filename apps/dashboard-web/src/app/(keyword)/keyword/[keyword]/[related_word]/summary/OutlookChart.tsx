'use client';

import * as D3 from 'd3';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import useGetDailyViewV2 from '@/hooks/react-query/query/useGetDailyViewV2';
import useGetNaverSearchRatio from '@/hooks/react-query/query/useGetNaverSearchRatio';
import {
  getDailyView_FluctuationRate,
  getSumDailyView,
} from '@/utils/dailyView/common';
import { getNaver_FluctuationRate } from '@/utils/naver-search/common';

import useXAxis from './useXAxes';

interface DataItem {
  date: number;
  value: number; // value 속성의 타입을 number로 명시
}

type NaverOutlook = '좋음' | '나쁨' | '보통';

type DailyViewOutlook = '좋음' | '나쁨' | '보통';

type ConbineOutlook = `${NaverOutlook}-${DailyViewOutlook}`;

type OutlookStatus = '매우좋음' | '좋음' | '나쁨' | '보통' | '매우나쁨';

function convert(
  currentCase: '좋음' | '나쁨' | '보통',
  ohterCase: '좋음' | '나쁨' | '보통',
) {
  if (ohterCase === '나쁨') {
    return OUTLOOK_POINT['보통REVERSE'];
  }
  return OUTLOOK_POINT[currentCase];
}

const getOutlook = (value: number | undefined) =>
  value ? (value > 10 ? '좋음' : value < 10 ? '나쁨' : '보통') : '보통';
// 마지막은 defaultValue로 일단 넣어둠

/**
 * 밑에 방식으로는 key가 매우좋음 좋음 보통 나쁨 매우나쁨
 * 이렇게 5가지이지만 보통에서 수치에 따른 분기처리가 너무 많이 들어감
 */

interface OutlookStatusInfo {
  title: OutlookStatus;
  description: (params: {
    naverFluctuationRate?: number;
    dailyViewFluctuationRate?: number;
    dailyView?: number;
  }) => React.ReactNode;
}

const OUTLOOK_STATUSINFO: {
  [key in ConbineOutlook]: OutlookStatusInfo;
} = {
  '좋음-좋음': {
    title: '매우좋음',
    description: () => (
      <>
        조회수와 검색량 모두 오르고 있어요. <br />
        영상만 잘 만든다면 좋은 성과를 얻을 수 있어요.
      </>
    ),
  },
  '좋음-보통': {
    title: '좋음',
    description: () => (
      <>
        검색량이 오르고 있어요.
        <br />
        소재의 조회수도 곧 따라 오를 거에요.
      </>
    ),
  },
  '좋음-나쁨': {
    title: '보통',
    description: ({ dailyViewFluctuationRate, naverFluctuationRate }) =>
      getCompareDescription({ dailyViewFluctuationRate, naverFluctuationRate }),
  },
  '보통-좋음': {
    title: '좋음',
    description: () => (
      <>
        조회수가 오르고 있어요.
        <br />
        관련 영상을 만들면 추천 알고리즘에 등록될 확률이 높아요.
      </>
    ),
  },
  '보통-보통': {
    title: '보통',
    description: ({ dailyView }) => {
      if (!dailyView) return '파악 중 문제가 발생하였습니다.';

      if (dailyView > 1_000_000) {
        return (
          <>
            높은 조회수와 검색량을 유지하고 있어요.
            <br />
            꾸준한 사랑을 받는 소재에요.
          </>
        );
      } else if (dailyView < -300_000) {
        return (
          <>
            낮은 조회수와 검색량을 유지하고 있어요.
            <br />
            시청자들이 관심 없대요.
          </>
        );
      } else if (dailyView <= 1_000_000) {
        return (
          <>
            적당한 조회수와 검색량을 유지하고 있어요.
            <br />
            나쁘지 않지만 좋지도 않아요.
          </>
        );
      }
      return '조건에 맞는 설명을 찾을 수 없습니다.';
    },
  },
  '보통-나쁨': {
    title: '나쁨',
    description: () => (
      <>
        조회수가 줄어들고 있어요.
        <br />
        콘텐츠를 만들어도 좋은 결과를 장담하기 어려워요.
      </>
    ),
  },
  '나쁨-좋음': {
    title: '보통',
    description: ({ naverFluctuationRate, dailyViewFluctuationRate }) =>
      getCompareDescription({ dailyViewFluctuationRate, naverFluctuationRate }),
  },
  '나쁨-보통': {
    title: '나쁨',
    description: () => (
      <>
        검색에 의한 노출이 줄어드니
        <br />
        추천 알고리즘에 대비한 전략을 준비하세요.
      </>
    ),
  },
  '나쁨-나쁨': {
    title: '매우나쁨',
    description: () => (
      <>
        조회수와 검색량이 모두 떨어지고 있어요.
        <br />더 좋은 소재를 찾아보시길 추천드려요.
      </>
    ),
  },
};

const getOutlookStatusInfo = ({
  naverOutlook,
  dailyViewOutlook,
}: {
  naverOutlook: NaverOutlook;
  dailyViewOutlook: DailyViewOutlook;
}) => OUTLOOK_STATUSINFO[`${naverOutlook}-${dailyViewOutlook}`];

const getCompareDescription = ({
  naverFluctuationRate,
  dailyViewFluctuationRate,
}: {
  naverFluctuationRate?: number;
  dailyViewFluctuationRate?: number;
}) => {
  if (!dailyViewFluctuationRate || !naverFluctuationRate)
    return '파악 중 문제가 발생하였습니다.';

  const biggerText =
    Math.max(naverFluctuationRate, dailyViewFluctuationRate) ===
    naverFluctuationRate
      ? '검색량이'
      : '조회수가';

  const smallerText =
    Math.min(naverFluctuationRate, dailyViewFluctuationRate) ===
    naverFluctuationRate
      ? '검색량이'
      : '조회수가';

  const totalFluctuation = dailyViewFluctuationRate + naverFluctuationRate;

  if (totalFluctuation > 20) {
    return (
      <>
        {smallerText} 낮아지지만 {biggerText} 크게 높아지고 있어요. <br />이
        주제가 숨은 노다지일 수도 있어요
      </>
    );
  } else if (totalFluctuation < -20) {
    return (
      <>
        {biggerText} 높아지지만 {smallerText} 크게 낮아지고 있어요. <br />
        전체적인 관심도의 양은 떨어지고 있으니 주의하세요.
      </>
    );
  } else if (totalFluctuation <= 20) {
    return (
      <>
        {biggerText} 높아진 만큼 {smallerText} 낮아지고 있어요. <br />
        미래를 장담하기 어려워요.
      </>
    );
  }
  return '조건에 맞는 설명을 찾을 수 없습니다.';
};

/**
 * 현재 해당 Description 구조
 * 1* OUTLOOK_TITLE의 value를 기반으로 key를 나누는 방식 ex)매우좋음, 좋음,보통
 * 2* '조회수:좋음-변동량-좋음' 형식으로 key를 나누는 방식 ex) OUTLOOK_DESCRIPTION[`${case1}-${case2}`];
 * 위에 두 가지는 최대한 nested obj 구조를 피하기위해서 생각한 방식
 * but 함수형 구조를 갖춰야함 (같은 보통-보통 구조에서 수치로 인해서 Description이 결정된다.)
 * 3* nested 구조인 조회수 : { 변동량 : description }
 */

const OUTLOOK_POINT = {
  좋음: [
    { date: 1, value: 1 },
    { date: 6, value: 12 },
    { date: 8, value: 8 },
    { date: 13, value: 17 },
  ],
  보통: [
    { date: 1, value: 2 },
    { date: 6, value: 1 },
    { date: 8, value: 4 },
    { date: 13, value: 2 },
  ],

  보통REVERSE: [
    { date: 1, value: 15 },
    { date: 6, value: 14 },
    { date: 8, value: 17 },
    { date: 13, value: 15 },
  ],

  나쁨: [
    { date: 1, value: 17 },
    { date: 6, value: 8 },
    { date: 8, value: 12 },
    { date: 13, value: 1 },
  ],
};

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

const OutlookChart = ({
  baseKeyword,
  relatedkeyword,
}: {
  baseKeyword: string;
  relatedkeyword: string;
}) => {
  const selectRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(selectRef);

  const height = 100;
  const marginTop = 0;
  const marginRight = 0;
  const marginBottom = 20;
  const marginLeft = 0;

  const svgRef = useRef<SVGSVGElement | null>(null); // SVG 엘리먼트의 ref 추가

  const { data: naverSearchData } = useGetNaverSearchRatio({
    keyword: baseKeyword,
    relword: relatedkeyword,
  });

  const naverFluctuationRate = getNaver_FluctuationRate(naverSearchData);

  const naverOutlook = getOutlook(naverFluctuationRate);

  const { data: dailyViewData, isLoading: viewsLoading } = useGetDailyViewV2({
    keyword: baseKeyword,
    relword: relatedkeyword,
  });

  const dailyViewFluctuationRate = getDailyView_FluctuationRate(dailyViewData);

  const dailyViewOutlook = getOutlook(dailyViewFluctuationRate);

  const totalDailyView = getSumDailyView(dailyViewData);

  const chart = D3.select('#outlook-chart')
    .select('svg')
    .attr('width', width)
    .attr('height', height);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 SVG 생성
    const svg = D3.select('#outlook-chart')
      .append('svg')

      .attr('preserveAspectRatio', 'xMidYMid meet');
    svgRef.current = svg.node(); // SVG 엘리먼트의 ref 설정

    // chart 객체 초기화

    return () => {
      // 컴포넌트가 언마운트될 때 SVG 제거
      svg.remove();
    };
  }, []); //

  const x = D3.scaleLinear()
    .domain([1, 13])
    .range([marginLeft, width - marginRight]);

  const xAxisCallback = (
    g: D3.Selection<SVGGElement, unknown, HTMLElement, undefined>,
  ) => {
    return g.attr('transform', `translate(0, ${height - marginBottom})`);
    // .call(
    //   D3.axisBottom(x)
    //     .tickSizeOuter(0)
    //     .tickSize(0)
    //     .tickFormat((d) => `${d}`),
    // )
    // .selectAll('text')
    // .attr('font-size', '12px')
    // .attr('color', '#ff0000');
  };

  const y = D3.scaleLinear()
    .domain([1, 17])
    .nice()
    .range([height - marginBottom, marginTop]);

  const yAxisCallback = (
    g: D3.Selection<SVGGElement, unknown, HTMLElement, undefined>,
  ) =>
    g
      .attr('transform', `translate(${marginLeft}, 0)`)
      .call(D3.axisLeft(y).tickSize(0).ticks(3));

  useEffect(() => {
    chart.selectAll('*').remove();
    chart
      .append('g')
      .call(xAxisCallback)
      .call((g: D3.Selection<SVGGElement, unknown, HTMLElement, undefined>) =>
        g.select('.domain').remove(),
      );

    chart
      .append('g')
      // .attr('transform', `translate(${marginLeft},0)`)
      .call(yAxisCallback)
      .call((g: D3.Selection<SVGGElement, unknown, HTMLElement, undefined>) =>
        g.select('.domain').remove(),
      )
      .attr('class', 'grid')
      .attr('class', function (d) {
        return 'dashed';
      })

      .selectAll('text')
      .remove();

    const line = D3.line<DataItem>()
      .x((datum) => {
        return Number(x?.(datum.date));
      })
      .y((d) => {
        return y?.(d.value);
      });

    if (naverSearchData) {
      const path = chart
        .selectAll('.검색량')
        .data([
          (naverOutlook as '좋음' | '나쁨' | '보통') === '보통'
            ? convert(naverOutlook, dailyViewOutlook)
            : OUTLOOK_POINT[naverOutlook],
        ]);

      path
        .enter()
        .append('path')
        .attr('fill', 'none')
        .attr('class', `검색량`)
        .attr('stroke', '#F0516D')

        .attr('stroke-width', 4)
        .style('stroke-linecap', 'round')
        .attr('d', line)
        .style('opacity', 1.0)
        .call((path) => {
          const totalLength = path.node()?.getTotalLength() ?? 0;
          path
            .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
            .attr('stroke-dashoffset', totalLength)
            .transition()
            .duration(1000)
            .ease(D3.easeLinear)
            .attr('stroke-dashoffset', 0)
            .on('end', () => {
              path.attr('marker-end', 'url(#triangle)');
            });
        });
    }

    if (dailyViewData) {
      const path2 = chart
        .selectAll('.조회수')
        .data([
          (dailyViewOutlook as '좋음' | '나쁨' | '보통') === '보통'
            ? convert(dailyViewOutlook, naverOutlook)
            : OUTLOOK_POINT[dailyViewOutlook],
        ]);

      path2
        .enter()
        .append('path')
        .attr('fill', 'none')
        .attr('class', `조회수`)
        .attr('stroke', '#818CF8')

        .attr('stroke-width', 4)
        .style('stroke-linecap', 'round')
        .attr('d', line)
        .style('opacity', 1.0)

        .call((path) => {
          const totalLength = path.node()?.getTotalLength() ?? 0;
          path
            .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
            .attr('stroke-dashoffset', totalLength)
            .transition()
            .duration(1000)
            .ease(D3.easeLinear)
            .attr('stroke-dashoffset', 0)
            .on('end', () => {
              path.attr('marker-end', 'url(#triangle2)');
            });
        })
        .call((path) => {
          if (
            (naverOutlook as '좋음' | '나쁨' | '보통') ===
            (dailyViewOutlook as '좋음' | '나쁨' | '보통')
          ) {
            path.attr('transform', `translate(0,10)`);
          }
        });
    }

    // .attr('transform', `translate(0, 10)`);

    // .selectAll('text')
    // .attr('transform', 'translate(0,10)');

    chart
      .append('svg:defs')
      .append('svg:marker')
      .attr('id', 'triangle')
      .attr('refX', 5) // Adjusted reference point
      .attr('refY', 3) // Adjusted reference point
      .attr('markerWidth', 10) // Reduced width
      .attr('markerHeight', 10) // Reduced height
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M 0 0 L 6 3 L 0 6 L 0 3') // Reduced size path
      .style('fill', '#F0516D');

    chart
      .append('svg:defs')
      .append('svg:marker')
      .attr('id', 'triangle2')
      .attr('refX', 5) // Adjusted reference point
      .attr('refY', 3) // Adjusted reference point
      .attr('markerWidth', 10) // Reduced width
      .attr('markerHeight', 10) // Reduced height
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M 0 0 L 6 3 L 0 6 L 0 3') // Reduced size path
      .style('fill', '#818CF8');
  }, [width, naverOutlook, dailyViewOutlook]);

  return (
    <>
      <div
        className="grid w-full grid-cols-1 [&_svg]:overflow-visible"
        id="outlook-chart"
        ref={selectRef}
      ></div>

      <div className=" gap-30 flex flex-col whitespace-nowrap text-center">
        <p className=" px-[10px] text-[20px] font-bold">
          {naverSearchData
            ? dailyViewData
              ? getOutlookStatusInfo({
                  naverOutlook: naverOutlook,
                  dailyViewOutlook: dailyViewOutlook,
                }).title
              : naverOutlook
            : dailyViewOutlook}
        </p>
        <p className="text-grey600  text-[14px]  font-[400]">
          {getOutlookStatusInfo({
            naverOutlook: naverOutlook,
            dailyViewOutlook: dailyViewOutlook,
          }).description({
            naverFluctuationRate,
            dailyViewFluctuationRate: 6,
            dailyView: 400000,
          })}
        </p>
      </div>
    </>
  );
};

export default OutlookChart;
