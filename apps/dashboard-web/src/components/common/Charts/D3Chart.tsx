'use client';

import * as d3 from 'd3';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import useGetRankingRelWords from '@/hooks/react-query/query/useGetRankingRelWords';

interface TransactionData {
  title: string;
  value: number;
  type: string;
  x: number;
  y: number;
}
const transactionsData: TransactionData[] = [
  { title: '주점', value: 100, type: 'low', x: 0, y: 0 },
  { title: '돼지고기', value: 200, type: 'low', x: 0, y: 0 },
  { title: '중국', value: 300, type: 'middle', x: 0, y: 0 },
  { title: '차오', value: 400, type: 'middle', x: 0, y: 0 },
  { title: '마파두부', value: 400, type: 'middle', x: 0, y: 0 },
  { title: '고추잡채', value: 300, type: 'middle', x: 0, y: 0 },
  { title: '짜장', value: 500, type: 'middle', x: 0, y: 0 },
  { title: '세종대왕', value: 500, type: 'middle', x: 0, y: 0 },
  { title: '두부김치', value: 1000, type: 'high', x: 0, y: 0 },
  { title: '마라탕', value: 1000, type: 'high', x: 0, y: 0 },
  { title: '탕수육', value: 1000, type: 'high', x: 0, y: 0 },
];

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

  const { data } = useGetRankingRelWords(keyword);

  const circleData = data?.slice(0, 10)?.map((item, i) => ({
    title: item,
    value: i < 3 ? 1000 : i < 7 ? 500 : 250,
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
        .force(
          'charge',
          d3
            .forceManyBody()
            .strength((d) => -size((d as TransactionData).value)),
        )
        .force(
          'attract',
          d3
            .forceRadial(
              (d) => size((d as TransactionData).value) / 2,
              width / 2,
              height / 2,
            )
            .strength((d) => (d as TransactionData).value / 1000),
        )
        .force(
          'collide',
          d3
            .forceCollide()
            .strength(0.5)
            .radius((d) => size((d as TransactionData).value) + 10)
            .iterations(1),
        )
        .force('y', d3.forceY(height / 2).strength(0.3));

      simulation.nodes(circleData!).on('tick', () => {
        node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
        labels.attr('x', (d) => d.x).attr('y', (d) => d.y);
      });
    }
  }, [ref, width, JSON.stringify(data)]);

  return (
    <div className="App">
      <div id="my_dataviz" ref={ref}></div>
    </div>
  );
};

export default D3Chart;
