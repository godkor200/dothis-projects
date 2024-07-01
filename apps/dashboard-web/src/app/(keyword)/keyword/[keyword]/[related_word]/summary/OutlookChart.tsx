'use client';

import * as D3 from 'd3';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { DISABLE_SPEEDY } from 'styled-components/dist/constants';

import useGetNaverSearchRatio from '@/hooks/react-query/query/useGetNaverSearchRatio';
import { getNaver_FluctuationRate } from '@/utils/naver-search/common';

import useXAxis from './useXAxis';

interface DataItem {
  date: number;
  value: number; // value 속성의 타입을 number로 명시
}

const case1: '좋음' | '나쁨' | '보통' = '보통';

const obj1: { type: string; content: '좋음' | '나쁨' | '보통' } = {
  type: '조회수',
  content: '좋음',
};

const obj2 = {
  type: '검색량',
  content: '보통',
};

const case2: '좋음' | '나쁨' | '보통' = '나쁨';
// const case3 = '보통';

function convert(
  currentCase: '좋음' | '나쁨' | '보통',
  ohterCase: '좋음' | '나쁨' | '보통',
) {
  if (ohterCase === '나쁨') {
    return CONVERT_CHARTDATA['보통2'];
  }
  return CONVERT_CHARTDATA[currentCase];
}

const getOutlook = (value: number | undefined) =>
  value ? (value > 10 ? '좋음' : value < 10 ? '나쁨' : '보통') : '보통';
// 마지막은 defaultValue로 일단 넣어둠

const textObj = {
  좋음: {
    좋음: '매우좋음',
    보통: '좋음',
    나쁨: '보통',
  },
  보통: {
    좋음: '좋음',
    보통: '보통',
    나쁨: '나쁨',
  },
  나쁨: {
    좋음: '보통',
    보통: '나쁨',
    나쁨: '매우나쁨',
  },
};

const summaryObj = {
  좋음: {
    좋음: '매우좋음',
    보통: '좋음',
    나쁨: '보통',
  },
  보통: {
    좋음: '좋음',
    보통: '보통',
    나쁨: '나쁨',
  },
  나쁨: {
    좋음: '보통',
    보통: '나쁨',
    나쁨: '매우나쁨',
  },
};

function Test() {}

const CONVERT_CHARTDATA = {
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

  보통2: [
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

  const title = useRef('');

  const svgRef = useRef<SVGSVGElement | null>(null); // SVG 엘리먼트의 ref 추가

  const { data: naverSearchData } = useGetNaverSearchRatio({
    keyword: baseKeyword,
    relword: relatedkeyword,
  });

  const naverFluctuationRate = getNaver_FluctuationRate(naverSearchData);

  const naverOutlook = getOutlook(naverFluctuationRate);

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

    const contentTest = () => {
      let value1;
      let value2;
    };

    title.current === textObj[obj1?.content]?.[case2];

    if (naverOutlook) {
      const path = chart
        .selectAll('.test')
        .data([
          (naverOutlook as '좋음' | '나쁨' | '보통') === '보통'
            ? convert(naverOutlook, case2)
            : CONVERT_CHARTDATA[naverOutlook],
        ]);

      path
        .enter()
        .append('path')
        .attr('fill', 'none')
        .attr('class', `test`)
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

    if (case2) {
      const path2 = chart
        .selectAll('.ttt')
        .data([
          (case2 as '좋음' | '나쁨' | '보통') === '보통'
            ? convert(case2, case1)
            : CONVERT_CHARTDATA[case2],
        ]);

      path2
        .enter()
        .append('path')
        .attr('fill', 'none')
        .attr('class', `ttt`)
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
            (case1 as '좋음' | '나쁨' | '보통') ===
            (case2 as '좋음' | '나쁨' | '보통')
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
  }, [width, naverOutlook]);

  return (
    <>
      <div
        className="grid flex-grow grid-cols-1 [&_svg]:overflow-visible"
        id="outlook-chart"
        ref={selectRef}
      ></div>

      <div className=" gap-30 flex flex-col text-center">
        <p className=" px-[10px] text-[20px] font-bold">
          {case1 ? (case2 ? textObj?.[case1]?.[case2] : case1) : case2}
        </p>
        <p className="text-grey600  text-[14px]  font-[400]">
          검색에 의한 노출이 줄어드니 추천 알고리즘에 대비한 전략을 준비하세요.
        </p>
      </div>
    </>
  );
};

export default OutlookChart;
