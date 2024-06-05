'use client';

import * as D3 from 'd3';
import React, { useEffect, useState } from 'react';

interface IData {
  ser1: number;
  ser2: number;
}

const MAX_VALUE = 200;

const BarChart = ({ data, height, width }) => {
  const svgRef = React.useRef(null);

  React.useEffect(() => {
    console.log('checked');
    console.log(data);
    const svg = D3.select(svgRef.current);

    const xScale = D3.scaleBand()
      .domain(data.map((value, index) => index.toString()))
      .range([0, width])
      .padding(0.1);

    const yScale = D3.scaleLinear().domain([0, MAX_VALUE]).range([height, 0]);

    const xAxis = D3.axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((_, index) => data[index].label);

    svg
      .select('#x-axis')
      .style('transform', `translateY(${height}px)`)
      .style('font-size', '16px')
      .call(xAxis);

    const yAxis = D3.axisLeft(yScale);
    svg.select('#y-axis').style('font-size', '16px').call(yAxis);

    svg.selectAll('g.tick');

    const bars = svg
      .selectAll('.bar')
      .data(data)
      .join('g')
      .classed('bar', true);

    bars
      .append('rect')
      .style('transform', 'scale(1, -1)')
      .attr('x', (_, index) => xScale(index.toString()))
      .attr('y', -height)
      .attr('width', xScale.bandwidth())
      .transition()
      .delay((_, index) => index * 500)
      .duration(1000)
      .attr('fill', (d) => d.color)
      .attr('height', (d) => height - yScale(d.value));
  }, [data]);
  // const D3Transition = () => {
  //   const marginTop = 20;
  //   const marginRight = 20;
  //   const marginBottom = 80;
  //   const marginLeft = 20;

  //   var margin = { top: 10, right: 30, bottom: 30, left: 50 };

  //   const data1: IData[] = [
  //     { ser1: 0.3, ser2: 4 },
  //     { ser1: 2, ser2: 16 },
  //     { ser1: 3, ser2: 8 },
  //   ];

  //   const data2: IData[] = [
  //     { ser1: 1, ser2: 7 },
  //     { ser1: 4, ser2: 1 },
  //     { ser1: 6, ser2: 8 },
  //   ];

  //   const [test, setTest] = useState(data1);

  //   useEffect(() => {
  //     const width = 600;
  //     const height = 400;

  //     // const svg = D3.select('#transition')
  //     //   .attr('width', width)
  //     //   .attr('height', height);

  //     const svg = D3.select('#my_dataviz')
  //       .append('svg')
  //       .attr('width', width + margin.left + margin.right)
  //       .attr('height', height + margin.top + margin.bottom)
  //       .append('g')
  //       .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  //     const x = D3.scaleLinear().range([0, width]);

  //     const xAxis = D3.axisBottom(x);

  //     svg
  //       .append('g')
  //       .attr('transform', 'translate(0,' + height + ')')
  //       .attr('class', 'myXaxis');

  //     const y = D3.scaleLinear().range([height, 0]);
  //     const yAxis = D3.axisLeft(y);

  //     svg.append('g').attr('class', 'myYaxis');

  //     function update(data: IData[]) {
  //       // Create the X axis:
  //       x.domain([
  //         0,
  //         D3.max(data, function (d) {
  //           return d.ser1 as number;
  //         }) as number,
  //       ]);
  //       svg.selectAll('.myXaxis').transition().duration(3000).call(xAxis);

  //       // create the Y axis
  //       y.domain([
  //         0,
  //         D3.max(data, function (d) {
  //           return d.ser2;
  //         }) as number,
  //       ]);
  //       svg.selectAll('.myYaxis').transition().duration(3000).call(yAxis);

  //       // Create a update selection: bind to the new data
  //       const u = svg.selectAll('.lineTest').data(data, (d: IData) => {
  //         console.log(d);
  //         return d.ser1;
  //       });

  //       // Updata the line
  //       u.enter()
  //         .append('path')
  //         .attr('class', 'lineTest')
  //         .merge(u)
  //         .transition()
  //         .duration(3000)
  //         .attr(
  //           'd',
  //           D3.line()
  //             .x(function (d) {
  //               return x(d.ser1);
  //             })
  //             .y(function (d) {
  //               return y(d.ser2);
  //             }),
  //         )
  //         .attr('fill', 'none')
  //         .attr('stroke', 'red')
  //         .attr('stroke-width', 2.5);
  //     }

  //     update(test);
  //   }, [test]);
  return (
    <div id="my_dataviz">
      {/* <button onClick={() => setTest(data2)}>클릭</button> */}
      <svg ref={svgRef} height={height} width={width}></svg>
    </div>
  );
};

export default BarChart;
