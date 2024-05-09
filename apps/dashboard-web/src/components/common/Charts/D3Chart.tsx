'use client';

import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

const transactionsData = [
  { title: 'test', value: 100, type: 'low' },
  { title: 'test', value: 200, type: 'low' },
  { title: 'test', value: 300, type: 'middle' },
  { title: 'test', value: 400, type: 'middle' },
  { title: 'test', value: 400, type: 'middle' },
  { title: 'test', value: 300, type: 'middle' },
  { title: 'test', value: 500, type: 'middle' },
  { title: 'test', value: 500, type: 'middle' },
  { title: 'test', value: 1000, type: 'high' },
  { title: 'test', value: 1000, type: 'high' },
  { title: 'test', value: 1000, type: 'high' },
];

const D3Chart = () => {
  const ref = useRef<HTMLDivElement>(null);
  Object.defineProperty(d3, 'tip', {
    value: require('d3-tip'),
  });

  useEffect(() => {
    // set the dimensions and margins of the graph
    const width = 460;
    const height = 460;

    // append the svg object to the body of the page
    const svg = d3
      .select('#my_dataviz')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Color palette for each transaction
    const color = d3
      .scaleOrdinal()
      .domain(['high', 'low', 'middle'])
      .range(['#353745', '#d9d9d9', '#00C853']);

    // Size scale for transactions
    const size = d3.scaleLinear().domain([0, 2000]).range([7, 100]); // circle will be between 7 and 55 px wide

    // Initialize the circle: all located at the center of the svg area
    var node = svg
      .append('g')
      .selectAll('circle')
      .data(transactionsData)
      .join('circle')
      .attr('class', 'node')
      .attr('r', (d) => size(d.value))
      .attr('cx', width)
      .attr('cy', height)
      .style('fill', function (d) {
        console.log(d);

        return color(d.type) as string;
      })
      .style('fill-opacity', 0.8);

    // Features of the forces applied to the nodes:
    // const simulation = d3
    //   .forceSimulation()
    //   .force(
    //     'center',
    //     d3
    //       .forceCenter()
    //       .x(width / 2)
    //       .y(height / 2),
    //   ) // Attraction to the center of the svg area
    //   .force('charge', d3.forceManyBody().strength(0.1)) // Nodes are attracted one each other of value is > 0
    //   .force(
    //     'collide',
    //     d3
    //       .forceCollide()
    //       .strength(0.2)
    //       .radius(function (d) {
    //         return size(d.value) + 3;
    //       })
    //       .iterations(1),
    //   ); // Force that avoids circle overlapping

    // Apply these forces to the nodes and update their positions.
    // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
    // simulation.nodes(transactionsData).on('tick', function (d) {
    //   node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
    // });
    // });
  }, [ref]);

  return (
    <div ref={ref} className="App">
      <div id="my_dataviz"></div>
    </div>
  );
};

export default D3Chart;
