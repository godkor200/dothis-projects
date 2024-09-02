'use client';

import * as D3 from 'd3';
import { useEffect } from 'react';

import useGetSuccessRate from '@/hooks/react-query/query/useGetSuccessRate';

interface PieData {
  name: string;
  value: number;
  color: string;
}

interface Props {
  baseKeyword: string;
  relatedKeyword: string;
}

const SuccessProbability = ({ baseKeyword, relatedKeyword }: Props) => {
  const { data } = useGetSuccessRate({
    keyword: baseKeyword,
    relword: relatedKeyword,
  });

  const donutData: PieData[] = Array.from({ length: 2 }, (_, index) => {
    if (index === 0) {
      return {
        name: 'aboveAverageViewsChannels',
        value: data ? data?.countAboveAverage : 0,
        color: '#F0516D',
      };
    } else {
      return {
        name: 'belowAverageViewsChannels',
        value: data ? data?.totalVideoCount - data?.countAboveAverage : 0,
        color: '#818CF8',
      };
    }
  });

  useEffect(() => {
    const chart = D3.select('#donut');
    chart.selectAll('*').remove();

    const width = 140;
    const height = 140;

    const radius = Math.min(width, height) / 2;

    // const data: PieData[] = [
    //   { name: 'aboveAverageViewsChannels', value: 19912018, color: '#F0516D' },
    //   {
    //     name: 'belowAverageViewsChannels',
    //     value: 20501982,
    //     color: '#818CF8',
    //   },
    // ];

    const svg = D3.select('#donut')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height]);

    const arc = D3.arc<D3.PieArcDatum<PieData>>()
      .innerRadius(radius * 0.57)
      .outerRadius(radius);

    const pie = D3.pie<PieData>()
      .padAngle(1 / radius)
      .sort(null)
      .value((d) => d.value);

    const color = D3.scaleOrdinal()
      .domain(donutData.map((d) => d.name))
      .range(
        D3.quantize(
          (t) => D3.interpolateSpectral(t * 0.8 + 0.1),
          donutData.length,
        ).reverse(),
      );

    svg
      .append('g')
      .selectAll()
      .data(pie(donutData))
      .join('path')
      //   .attr('fill', (d) => color(d.data.name) as string)
      .attr('fill', (d) => d.data.color)
      .attr('d', arc)
      .append('title')
      .text((d) => `${d.data.name}: ${d.data.value.toLocaleString()}`)
      .attr('transform', function (d) {
        var c = arc.centroid(d);

        return 'translate(' + c[0] * 1.5 + ',' + c[1] * 1.5 + ')';
      });

    //   Text tag border 주입ㅌ`
    // defs
    //   .select('#rounded-corners')
    //   .append('feComponentTransfer')
    //   .append('feFuncA')
    //   .attr('type', 'table')
    //   .attr('tableValues', '0 0 0 1');

    // defs
    //   .select('#rounded-corners')
    //   .append('feComponentTransfer')
    //   .append('feFuncA')
    //   .attr('type', 'table')
    //   .attr('tableValues', '0 1 1 1 1 1 1 1');

    // const defs = svg.append('defs');

    // defs
    //   .append('filter')
    //   .attr('id', 'rounded-corners')
    //   .attr('x', '-5%')
    //   .attr('width', '110%')
    //   .attr('y', '0%')
    //   .attr('height', '100%')
    //   .append('feFlood')
    //   .attr('flood-color', '#FFAA55');

    // defs
    //   .select('#rounded-corners')
    //   .append('feGaussianBlur')
    //   .attr('stdDeviation', 0);

    // defs
    //   .select('#rounded-corners')
    //   .append('feComposite')
    //   .attr('operator', 'over')
    //   .attr('in', 'SourceGraphic');
    // svg
    //   .append('g')
    //   .attr('font-family', 'sans-serif')
    //   .attr('font-size', 12)
    //   .attr('text-anchor', 'middle')
    //   .selectAll()
    //   .data(pie(data))
    //   .join('text')

    //   .attr('transform', (d) => `translate(${arc.centroid(d)})`)
    //   .call((text) => {
    //     console.log(text);

    //     text
    //       .filter((d) => d.endAngle - d.startAngle > 0.25)
    //       .append('tspan')
    //       .attr('x', 0)
    //       .attr('y', '0.7em')
    //       .attr('fill-opacity', 0.7)
    //       .text((d) => d.data.value.toLocaleString('ko-kr'));
    //   });

    // svg
    //   .append('g')
    //   .attr('font-family', 'sans-serif')
    //   .attr('font-size', 12)
    //   .attr('text-anchor', 'middle')
    //   .selectAll()
    //   .data(pie(data))
    //   .join('text')
    //   .attr('transform', (d) => {
    //     // console.log(arc.centroid(d));
    //     return `translate(${arc.centroid(d)})`;
    //   })
    //   .call((text) =>
    //     text
    //       .append('tspan')
    //       .attr('y', '-0.4em')
    //       .attr('filter', 'url(#rounded-corners)')
    //       .attr('font-weight', 'bold')
    //       .text((d) => d.data.name),
    //   );

    // Text labels
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('font-size', '20px')
      // .style('font-family', 'Arial')
      .style('font-weight', 'bold')
      .text(
        `${
          data
            ? Math.floor(
                (data?.countAboveAverage / data?.totalVideoCount !== 0
                  ? data?.totalVideoCount
                  : 1) * 100,
              ) + '%'
            : '분석 중입니다'
        }`,
      );
  }, [data]);
  return (
    <>
      <div className="flex justify-center">
        <div id="donut"></div>
      </div>

      <div className=" gap-30 mt-[30px] flex flex-col text-center">
        {/* <p className=" px-[10px] text-[20px] font-bold">
          {data
            ? Math.floor(
                (data?.countAboveAverage / data?.totalVideoCount) * 100,
              )
            : 0}
        </p> */}
        {/* donut차트 중앙으로 이동  */}
        <p className="text-grey600  text-[14px]  font-[400]">
          {data
            ? `이 주제를 다룬 ${data?.totalVideoCount.toLocaleString(
                'ko-kr',
              )}명 중 
          ${data?.countAboveAverage.toLocaleString('ko-kr')}명이 평소보다
          조회수가 높습니다.`
            : '분석 중입니다.'}
        </p>
      </div>
    </>
  );
};

export default SuccessProbability;
