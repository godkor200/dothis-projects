'use client';
import * as d3 from 'd3';
import React, { useEffect } from 'react';

interface DataItem {
  month: string;
  value: number; // value 속성의 타입을 number로 명시
  color: string;
}

const D3 = () => {
  useEffect(() => {
    makeGraph();
  }, []);

  const makeGraph = () => {
    // setting canvas
    const width = 400;
    const height = 400;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 20;
    const marginLeft = 20;

    const svg = d3
      .select('#mixed-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // data
    const data = [
      { month: '1월', value: 40, color: 'red' },
      { month: '2월', value: 10, color: 'orange' },
      { month: '3월', value: 60, color: 'yellow' },
      { month: '4월', value: 95, color: 'green' },
      { month: '5월', value: 30, color: 'blue' },
      { month: '6월', value: 78, color: 'indigo' },
    ];

    const linedata = [
      { month: '1월', value: 22, color: 'red' },
      { month: '2월', value: 11, color: 'orange' },
      { month: '3월', value: 99, color: 'yellow' },
      { month: '4월', value: 88, color: 'green' },
      { month: '5월', value: 30, color: 'blue' },
      { month: '6월', value: 22, color: 'indigo' },
    ];

    // setting axis
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.month))
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) ?? 0])
      .nice()
      .range([height - marginBottom, marginTop]);

    const xAxis = (g: d3.Selection<SVGGElement, any, HTMLElement, any>) => {
      return g
        .attr('transform', `translate(0, ${height})`)
        .attr('transform', `translate(0, ${height - marginBottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));
    };

    const yAxis = (g: d3.Selection<SVGGElement, any, HTMLElement, any>) =>
      g
        .attr('transform', `translate(${marginLeft}, 0)`)
        .call(
          d3.axisLeft(y).tickValues([0, 20, 40, 60, 80, 100]).tickSize(-width),
        )
        .call((g) => g.select('.domain').remove())
        .attr('class', 'grid');

    // apply axis to canvas
    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);

    // vertical bar chart
    svg
      .append('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (data) => (x(data?.month) as number) + x.bandwidth() / 2 - 10)
      .attr('y', (data) => y(data.value))
      .attr('width', 20)
      .attr('height', (data) => y(0) - y(data.value))
      .attr('class', 'bar-chart')
      .attr('fill', (data) => data.color);

    // //line chart
    // const line = d3
    //   .line()
    //   .x((d) => {
    //     return (x(d.month) as number) + x.bandwidth() / 2;
    //   })
    //   .y((d) => y(d.values));

    // svg
    //   .append('path')
    //   .datum(data)
    //   .attr('fill', 'none')
    //   .attr('stroke', 'red')
    //   .attr('stroke-width', 2)
    //   .attr('d', line);

    // // add text
    // svg
    //   .append('g')
    //   .selectAll('text')
    //   .data(data)
    //   .enter()
    //   .append('text')
    //   .text((d) => d.value)
    //   .attr('x', (data) => x(data.month) + x.bandwidth() / 2)
    //   .attr('y', (data) => y(data.value) - 5)
    //   .attr('fill', 'black')
    //   .attr('font-family', 'Tahoma')
    //   .attr('font-size', '12px')
    //   .attr('text-anchor', 'middle');

    const line = d3
      .line<DataItem>()
      .x((d) => Number(x(d.month)) + x.bandwidth() / 2)
      .y((d) => y(d.value));

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 1)
      .attr('d', line);

    //  동작하는 버전
    // const line = d3
    //   .line()
    //   .x((d) => x(d.month) + x.bandwidth() / 2)
    //   .y((d) => y(d.value));

    // svg
    //   .append('path')
    //   .datum(linedata)
    //   .attr('fill', 'none')
    //   .attr('stroke', 'red')
    //   .attr('stroke-width', 1)
    //   .attr('d', line);

    // add text
    // svg
    //   .append('g')
    //   .selectAll('text')
    //   .data(data)
    //   .enter()
    //   .append('text')
    //   .text((d) => d.value)
    //   .attr('x', (data) => x(data.month) + x.bandwidth() / 2)
    //   .attr('y', (data) => y(data.value) - 5)
    //   .attr('fill', 'black')
    //   .attr('font-family', 'Tahoma')
    //   .attr('font-size', '12px')
    //   .attr('text-anchor', 'middle');
  };

  return <div id="mixed-chart"></div>;
};
export default D3;
