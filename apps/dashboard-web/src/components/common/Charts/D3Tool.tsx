'use client';
import './styles.css';

import * as d3 from 'd3';
import { useEffect } from 'react';

const D3Tool = () => {
  useEffect(() => {
    const dataset = [
      { date: '2023-01-01', close: 100 },
      { date: '2023-01-02', close: 105 },
      { date: '2023-01-03', close: 102 },
      { date: '2023-01-04', close: 107 },
      { date: '2023-01-05', close: 110 },
      { date: '2023-01-06', close: 108 },
      { date: '2023-01-07', close: 115 },
      { date: '2023-01-08', close: 120 },
      { date: '2023-01-09', close: 125 },
      { date: '2023-01-10', close: 130 },
      { date: '2023-01-11', close: 128 },
      { date: '2023-01-12', close: 133 },
      { date: '2023-01-13', close: 135 },
      { date: '2023-01-14', close: 138 },
      { date: '2023-01-15', close: 140 },
      { date: '2023-01-16', close: 142 },
      { date: '2023-01-17', close: 145 },
      { date: '2023-01-18', close: 148 },
      { date: '2023-01-19', close: 150 },
      { date: '2023-01-20', close: 155 },
    ];

    // Accessors
    const parseDate = d3.timeParse('%Y-%m-%d');
    const xAccessor = (d) => parseDate(d.date);
    const yAccessor = (d) => parseInt(d.close);

    // Dimensions
    let dimensions = {
      width: 1000,
      height: 500,
      margins: 50,
    };

    const containerWidth = dimensions.width - dimensions.margins * 2;
    const containerHeight = dimensions.height - dimensions.margins * 2;

    // Draw Image
    const svg = d3
      .select('#chart')
      .append('svg')
      .attr('width', dimensions.width)
      .attr('height', dimensions.height);

    // Selections
    const container = svg
      .append('g')
      .attr(
        'transform',
        `translate(${dimensions.margins}, ${dimensions.margins})`,
      );

    const tooltip = d3.select('#tooltip');
    const tooltipDot = container
      .append('circle')
      .attr('r', 5)
      .attr('fill', '#fc8781')
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .style('opacity', 0)
      .style('pointer-events', 'none');

    // Scales
    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(dataset, yAccessor))
      .range([containerHeight, 0])
      .nice();

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(dataset, xAccessor))
      .range([0, containerWidth]);

    // Line Generator
    const lineGenerator = d3
      .line()
      .x((d) => xScale(xAccessor(d)))
      .y((d) => yScale(yAccessor(d)));

    // Line
    container
      .append('path')
      .datum(dataset)
      .attr('d', lineGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#30475e')
      .attr('stroke-width', 2);

    // Axis
    const yAxis = d3.axisLeft(yScale).tickFormat((d) => `$${d}`);

    container.append('g').classed('yAxis', true).call(yAxis);

    const xAxis = d3.axisBottom(xScale);

    container
      .append('g')
      .classed('xAxis', true)
      .style('transform', `translateY(${containerHeight}px)`)
      .call(xAxis);

    // Tooltip
    container
      .append('rect')
      .attr('width', containerWidth)
      .attr('height', containerHeight)
      .style('opacity', 0)
      .on('touchmouse mousemove', function (event) {
        const mousePos = d3.pointer(event, this);
        // x coordinate stored in mousePos index 0
        const date = xScale.invert(mousePos[0]);

        // Custom Bisector - left, center, right
        const dateBisector = d3.bisector(xAccessor).left;
        const bisectionIndex = dateBisector(dataset, date);
        // math.max prevents negative index reference error
        const hoveredIndexData = dataset[Math.max(0, bisectionIndex - 1)];

        // Update Image
        tooltipDot
          .style('opacity', 1)
          .attr('cx', xScale(xAccessor(hoveredIndexData)))
          .attr('cy', yScale(yAccessor(hoveredIndexData)))
          .raise();

        tooltip
          .style('display', 'block')
          .style('top', `${yScale(yAccessor(hoveredIndexData)) - 50}px`)
          .style('left', `${xScale(xAccessor(hoveredIndexData))}px`);

        tooltip.select('.price').text(`$${yAccessor(hoveredIndexData)}`);

        const dateFormatter = d3.timeFormat('%B %-d, %Y');

        tooltip
          .select('.date')
          .text(`${dateFormatter(xAccessor(hoveredIndexData))}`);
      })
      .attr('class', 'hihi')
      .on('mouseleave', function () {
        tooltipDot.style('opacity', 0);
        tooltip.style('display', 'none');
      });
  }, []);

  return (
    <div id="chart">
      <div id="tooltip">
        <div className="price"></div>
        <div className="date"></div>
      </div>
    </div>
  );
};

export default D3Tool;
