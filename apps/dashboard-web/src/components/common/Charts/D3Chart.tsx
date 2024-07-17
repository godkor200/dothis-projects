'use client';

import * as d3 from 'd3';
import { useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import BoxLoadingComponent from '@/app/(keyword)/keyword/BoxLoadingComponent';
import useGetRankingRelWords from '@/hooks/react-query/query/useGetRankingRelWords';
import { cn } from '@/utils/cn';

import ApiErrorComponent from './ApiErrorComponent ';

interface TransactionData {
  title: string;
  value: number;
  type: string;
  x: number;
  y: number;
}

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

const D3Chart = ({ keyword }: { keyword: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const { data, isLoading, isError, refetch } = useGetRankingRelWords(keyword);

  const circleData = data?.slice(0, 10)?.map((item, i) => ({
    title: item,
    value: i < 3 ? 1200 : i < 6 ? 1000 : 800,
    type: i < 3 ? 'high' : i < 7 ? 'middle' : 'low',
    x: 0,
    y: 0,
  }));

  const { width } = useDimensions(ref);
  useEffect(() => {
    const chart = d3.select(ref.current);
    chart.selectAll('*').remove();

    const height = 320;

    if (circleData) {
      const svg = d3
        .select('#my_dataviz')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      const color = d3
        .scaleOrdinal()
        .domain(['high', 'low', 'middle'])
        .range(['#f07288', '#FDE7EB', '#F7B4C0']);

      const size = d3.scaleLinear().domain([0, 2000]).range([7, 100]);

      const group = svg.append('g');

      const node = group
        .selectAll('circle')
        .data(circleData!)
        .join('circle')
        .attr('class', 'node')
        .attr('r', (d) => size(d.value))
        .attr('cx', width / 2)
        .attr('cy', height / 2)
        .style('fill', (d) => color(d.type) as string)
        .style('fill-opacity', 0.8)
        .raise()
        .on('mouseover', (e, i) => {
          d3.select(e.target)
            .raise()
            .transition()
            .style('cursor', 'pointer')
            .style('fill', (d) => '#D4D4D8')
            .attr('r', () => size(i.value + 100));

          const selectedLabel = labels.filter((d) => d.title === i.title);

          selectedLabel
            .style('stroke', '#D4D4D8')
            .style('paint-order', 'stroke')
            .style('stroke-linecap', 'butt')
            .style('stroke-linejoin', 'miter')
            .style('stroke-width', 2)
            .style('fill', '#fff')
            .raise();
        })
        .on('mouseout', (e, i) => {
          const selectedLabel = labels.filter((d) => d.title === i.title);

          selectedLabel
            .style('fill', () => (i.type === 'high' ? '#fff' : '#71717A'))
            .style('stroke-width', 0)
            .lower();

          d3.select(e.target)
            .lower()
            .transition()
            .style('cursor', 'auto')
            .style('fill', () => color(i.type) as string)
            .attr('r', () => size(i.value));
        })
        .on('click', function (event, d) {
          router.push(`/keyword/${keyword}/${d.title}/analysis`);
        });

      const labels = group
        .selectAll('text')
        .data(circleData!)
        .join('text')
        .attr('class', 'label')
        .attr('x', width / 2)
        .attr('y', height / 2)
        .text((d) => d.title)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .style('fill', (d) => (d.type === 'high' ? '#fff' : '#71717A'))
        .style('font-size', '16px')
        .style('font-weight', 700)
        .attr('pointer-events', 'none');
      // .style('pointer-events', 'none');
      // .on('mouseover', (e, i) => {
      //   d3.select(e.target).style('fill', (d) => '#fff');
      // })
      // .on('mouseout', (e, i) => {
      //   d3.select(e.target).style('fill', () =>
      //     i.type === 'high' ? '#fff' : '#71717A',
      //   );
      // });

      const simulation = d3
        .forceSimulation(circleData!)
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('charge', d3.forceManyBody().strength(-30))
        // .force(
        //   'attract',
        //   d3.forceRadial(
        //     (d) => size((d as TransactionData).value) / 2,
        //     width / 2,
        //     height / 2,
        //   ),
        // )
        .force(
          'attract',
          d3
            .forceRadial(
              (d) => size((d as TransactionData).value) / 2,
              width / 2,
              height / 2,
            )
            .strength(0.1),
        )
        .force(
          'collide',
          d3
            .forceCollide()
            .strength(1)
            .radius((d) => size((d as TransactionData).value + 100))
            // 거리를 얼마나 띄울거냐, 기존 value에 따라 생성된 size만큼 띄우며(독립적인 자리를 가지려면 기본적으로 띄어야함 ) + margin을 100만큼 부여한 것
            .iterations(1),
        )
        // .force(
        //   'collide',
        //   d3
        //     .forceCollide()
        //     .strength(0.5)
        //     .radius((d) => size((d as TransactionData).value) + 10)
        //     .iterations(1),
        // )
        .force('x', d3.forceX(width / 2).strength(0.1)) // 추가된 forceX
        .force('y', d3.forceY(height / 2).strength(0.7)); // forceY 강도 조정

      simulation.nodes(circleData!).on('tick', () => {
        node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
        labels.attr('x', (d) => d.x).attr('y', (d) => d.y);
      });
    }
  }, [ref, width, JSON.stringify(data)]);

  // if (isError) {
  //   return <ApiErrorComponent refetch={refetch} />;
  // }

  return (
    <>
      <div className="App [&_svg]:overflow-visible">
        <div id="my_dataviz" ref={ref}></div>
      </div>
    </>
  );
};

export default D3Chart;
