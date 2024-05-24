'use client';

import * as d3 from 'd3';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const transactionsData = [
  { title: '주점', value: 100, type: 'low' },
  { title: '돼지고기', value: 200, type: 'low' },
  { title: '중국', value: 300, type: 'middle' },
  { title: '차오', value: 400, type: 'middle' },
  { title: '마파두부', value: 400, type: 'middle' },
  { title: '고추잡채', value: 300, type: 'middle' },
  { title: '짜장', value: 500, type: 'middle' },
  { title: '세종대왕', value: 500, type: 'middle' },
  { title: '두부김치', value: 1000, type: 'high' },
  { title: '마라탕', value: 1000, type: 'high' },
  { title: '탕수육', value: 1000, type: 'high' },
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

const D3Chart = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(ref);
  useEffect(() => {
    const chart = d3.select(ref.current);
    chart.selectAll('*').remove();

    const height = 320;

    const svg = d3
      .select('#my_dataviz')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const color = d3
      .scaleOrdinal()
      .domain(['high', 'low', 'middle'])
      .range(['#F7B4C0', '#f07288', '#FDE7EB']);

    const size = d3.scaleLinear().domain([0, 2000]).range([7, 100]);

    const node = svg
      .append('g')
      .selectAll('circle')
      .data(transactionsData)
      .join('circle')
      .attr('class', 'node')
      .attr('r', (d) => size(d.value))
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .style('fill', (d) => color(d.type) as string)
      .style('fill-opacity', 0.8);

    const labels = svg
      .append('g')
      .selectAll('text')
      .data(transactionsData)
      .join('text')
      .attr('class', 'label')
      .attr('x', width / 2)
      .attr('y', height / 2)
      .text((d) => d.title)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .style('fill', '#71717A')
      .style('font-size', '16px')
      .style('font-weight', 700);

    const simulation = d3
      .forceSimulation(transactionsData)
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force(
        'charge',
        d3.forceManyBody().strength((d) => -size(d.value)),
      )
      .force(
        'attract',
        d3
          .forceRadial((d) => size(d.value) / 2, width / 2, height / 2)
          .strength((d) => d.value / 1000),
      )
      .force(
        'collide',
        d3
          .forceCollide()
          .strength(0.5)
          .radius((d) => size(d.value) + 10)
          .iterations(1),
      )
      .force('y', d3.forceY(height / 2).strength(0.3));

    simulation.nodes(transactionsData).on('tick', () => {
      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
      labels.attr('x', (d) => d.x).attr('y', (d) => d.y);
    });
  }, [ref, width]);

  return (
    <div className="App">
      <div id="my_dataviz" ref={ref}></div>
    </div>
  );
};

export default D3Chart;
