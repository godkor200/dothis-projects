'use client';

import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

const Test = () => {
  const ref = useRef<HTMLDivElement>(null);
  const data = [
    { name: '🍊', count: 21 },
    { name: '🍇', count: 13 },
    { name: '🍏', count: 8 },
    { name: '🍌', count: 5 },
    { name: '🍐', count: 3 },
    { name: '🍋', count: 2 },
    { name: '🍎', count: 1 },
    { name: '🍉', count: 1 },
  ];

  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 100,
  };

  const width = 800 - (margin.left + margin.right);
  const height = 550 - (margin.top + margin.bottom);

  useEffect(() => {
    const svg = d3
      .select('#chart')
      .append('svg')
      .attr(
        'viewBox',
        `0 0 ${width + (margin.left + margin.right)} ${
          height + (margin.top + margin.bottom)
        }`,
      )
      .attr('width', width)
      .attr('height', height);

    const group = svg
      .append('g')
      .attr('transform', `translate(${margin.left} ${margin.top})`);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, ({ count }) => count) as number])
      .range([0, width]);

    const yScale = d3
      .scaleBand()
      .domain(data.map(({ name }) => name))
      .range([0, height])
      .padding(0.2);

    const xAxis = d3.axisBottom(xScale);

    const yAxis = d3.axisLeft(yScale);

    group.append('g').attr('transform', `translate(0 ${height})`).call(xAxis);

    group.append('g').call(yAxis);

    const groups = group
      .selectAll('g.group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'group')
      .attr('transform', ({ name }) => {
        return `translate(0 ${yScale(name)})`;
      });

    groups
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', ({ count }) => {
        return xScale(count);
      })
      .attr('height', yScale.bandwidth())
      .style('fill', '#6994C0');
  }, [ref]);

  return (
    <div ref={ref} className="App">
      <div id="chart"></div>
    </div>
  );
};

export default Test;
