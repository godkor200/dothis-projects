'use client';

import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

interface DataItem {
  x: number;
  y: number;
  name: string;
  bbox?: DOMRect; // Optional bounding box property
}

interface Props {
  data: DataItem[];
}

const Chart: React.FC<Props> = ({ data }) => {
  const chartContainerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const height = 0.8 * window.innerHeight;
    const width = chartContainerRef.current.clientWidth;

    // Create SVG container using D3
    const svg = d3
      .select(chartContainerRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`);

    // Add rect elements as placeholders
    svg
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .style('fill', 'black')
      .style('opacity', '0.5');

    // Add text elements
    svg
      .selectAll('text')
      .data(data)
      .join('text')
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .style('font', '14px sans-serif')
      .style('fill', '#FFF')
      .text((d) => d.name);

    // Save dimensions of text elements
    svg.selectAll<SVGTextElement, DataItem>('text').each(function (d) {
      d.bbox = this.getBBox();
    });

    // Update rectangles using text sizes
    const xMargin = 4;
    const yMargin = 2;
    svg
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('width', (d) => (d.bbox?.width || 0) + 2 * xMargin)
      .attr('height', (d) => (d.bbox?.height || 0) + 2 * yMargin)
      .attr('transform', function (d) {
        return `translate(-${xMargin}, -${(d.bbox?.height || 0) * 0.8 + yMargin})`;
      });
  }, [data]);

  return (
    <div id="chart-container">
      <svg ref={chartContainerRef}></svg>
    </div>
  );
};

export default Chart;
