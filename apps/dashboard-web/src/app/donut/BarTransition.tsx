'use client';

import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

interface DataItem {
  name: string;
  // 다른 속성들도 있을 수 있음
  value: number;
}

const GptTest = ({
  data,
}: {
  data: {
    name: string;
    value: number;
  }[];
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const height = 400;
    const width = 600;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const x = d3
      .scaleBand()
      .domain(data.map((d, i) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 100])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // svg
    //   .selectAll('.bar')
    //   .data(data)
    //   .join(
    //     (enter) =>
    //       enter
    //         .append('rect')
    //         .attr('class', 'bar')
    //         .attr('x', (d, i) => x(d.name))
    //         .attr('y', y(0))
    //         .attr('height', 0)
    //         .attr('width', x.bandwidth())
    //         .transition()
    //         .delay(1000)
    //         .attr('y', (d) => y(d.value))
    //         .attr('height', (d) => y(0) - y(d.value)),
    //     (update) =>
    //       update
    //         .transition()
    //         .duration(1000)
    //         .attr('y', y(0))
    //         .attr('height', 0)
    //         .transition()
    //         .delay(1000)
    //         .attr('y', (d) => y(d.value))
    //         .attr('height', (d) => y(0) - y(d.value)),
    //     (exit) =>
    //       exit
    //         .transition()
    //         .duration(1000)
    //         .attr('y', y(0))
    //         .attr('height', 0)
    //         .remove(),
    //   );
    // 이거 동작함 join 메서드로

    const bars = svg
      .selectAll<SVGRectElement, DataItem>('.bar')
      .data<DataItem>(data, (d) => d.name); // Use a key function to match data items to elements

    // Enter selection
    bars
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => {
        console.log(d, i);
        return x(d.name) as number;
      })
      .attr('y', y(0))
      .attr('height', 0)
      .attr('width', x.bandwidth())

      .transition()
      .delay(1000)
      .attr('x', (d, i) => {
        return x(d.name) as number;
      })
      .attr('y', (d) => y(d.value))
      .attr('height', (d) => y(0) - y(d.value))
      .attr('width', x.bandwidth());

    // Update selection
    bars
      .transition()
      .duration(1000)
      .attr('y', y(0))
      .attr('height', 0)
      .transition()
      .delay(500)
      .attr('x', (d, i) => x(d.name) as number)
      .attr('y', (d) => y(d.value))
      .attr('height', (d) => y(0) - y(d.value))
      .attr('width', x.bandwidth());

    // Exit selection
    bars
      .exit()
      .transition()
      .duration(1000)
      .attr('y', y(0))
      .attr('height', 0)
      .remove();

    // ---------------------------
    // svg
    //   .selectAll('.bar')
    //   .data(data, (d) => d.name)
    //   .join(
    //     (enter) =>
    //       enter
    //         .append('rect')
    //         .attr('class', 'bar')
    //         .attr('x', (d, i) => x(d.name))
    //         .attr('y', y(0))
    //         .attr('height', 0)
    //         .attr('width', x.bandwidth())
    //         .call((enter) =>
    //           enter
    //             .transition()
    //             .duration(1000)
    //             .attr('x', (d, i) => x(d.name))
    //             .attr('y', (d) => y(d.value))
    //             .attr('height', (d) => y(0) - y(d.value))
    //             .attr('width', x.bandwidth()),
    //         ),
    //     (update) =>
    //       update.call((update) =>
    //         update
    //           .transition()
    //           .duration(1000)
    //           .attr('x', (d, i) => x(d.name))
    //           .attr('y', (d) => y(d.value))
    //           .attr('height', (d) => y(0) - y(d.value))
    //           .attr('width', x.bandwidth()),
    //       ),
    //     (exit) =>
    //       exit.call((exit) =>
    //         exit
    //           .transition()
    //           .duration(1000)
    //           .attr('y', y(0))
    //           .attr('height', 0)
    //           .remove(),
    //       ),
    //   );

    svg.selectAll('.axis').remove(); // Remove old axes

    svg
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .tickFormat((i) => data[Number(i)]?.name || '')
          .tickSizeOuter(0),
      );

    svg
      .append('g')
      .attr('class', 'axis y-axis')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, [data]);

  return <svg ref={svgRef} width={600} height={400}></svg>;
};

export default GptTest;
