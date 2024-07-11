'use client';

import * as D3 from 'd3';
import { useEffect } from 'react';

interface PieData {
  name: string;
  value: number;
}

const D3Donut = () => {
  useEffect(() => {
    const width = 800;
    const height = 400;

    const radius = Math.min(width, height) / 2;

    const data: PieData[] = [
      { name: '<5', value: 19912018 },
      { name: '5-9', value: 20501982 },
      { name: '10-14', value: 20679786 },
      { name: '15-19', value: 21354481 },
      { name: '20-24', value: 22604232 },
      { name: '25-29', value: 21698010 },
      { name: '30-34', value: 21183639 },
      { name: '35-39', value: 19855782 },
      { name: '40-44', value: 20796128 },
      { name: '45-49', value: 21370368 },
      { name: '50-54', value: 22525490 },
      { name: '55-59', value: 21001947 },
      { name: '60-64', value: 18415681 },
      { name: '65-69', value: 14547446 },
      { name: '70-74', value: 10587721 },
      { name: '75-79', value: 7730129 },
      { name: '80-84', value: 5811429 },
      { name: '≥85', value: 5938752 },
    ];

    const svg = D3.select('#donut')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height]);

    const defs = svg.append('defs');

    defs
      .append('filter')
      .attr('id', 'rounded-corners')
      .attr('x', '-5%')
      .attr('width', '110%')
      .attr('y', '0%')
      .attr('height', '100%')
      .append('feFlood')
      .attr('flood-color', '#FFAA55');

    defs
      .select('#rounded-corners')
      .append('feGaussianBlur')
      .attr('stdDeviation', 0);

    // defs
    //   .select('#rounded-corners')
    //   .append('feComponentTransfer')
    //   .append('feFuncA')
    //   .attr('type', 'table')
    //   .attr('tableValues', '0 0 0 1');

    // defs
    //   .select('#rounded-corners')
    //   .append('feComponentTransfer')
    //   .append('feFuncA')
    //   .attr('type', 'table')
    //   .attr('tableValues', '0 1 1 1 1 1 1 1');

    defs
      .select('#rounded-corners')
      .append('feComposite')
      .attr('operator', 'over')
      .attr('in', 'SourceGraphic');

    const arc = D3.arc<D3.PieArcDatum<PieData>>()
      .innerRadius(radius * 0.57)
      .outerRadius(radius);

    const pie = D3.pie<PieData>()
      .padAngle(1 / radius)
      .sort(null)
      .value((d) => d.value);

    const color = D3.scaleOrdinal()
      .domain(data.map((d) => d.name))
      .range(
        D3.quantize(
          (t) => D3.interpolateSpectral(t * 0.8 + 0.1),
          data.length,
        ).reverse(),
      );

    svg
      .append('g')
      .selectAll()
      .data(pie(data))
      .join('path')
      .attr('fill', (d) => color(d.data.name) as string)
      .attr('d', arc)
      .append('title')
      .text((d) => `${d.data.name}: ${d.data.value.toLocaleString()}`);

    svg
      .append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 12)
      .attr('text-anchor', 'middle')
      .selectAll()
      .data(pie(data))
      .join('text')

      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .call((text) => {
        console.log(text);

        text
          .filter((d) => d.endAngle - d.startAngle > 0.25)
          .append('tspan')
          .attr('x', 0)
          .attr('y', '0.7em')
          .attr('fill-opacity', 0.7)
          .text((d) => d.data.value.toLocaleString('ko-kr'));
      });

    svg
      .append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 12)
      .attr('text-anchor', 'middle')
      .selectAll()
      .data(pie(data))
      .join('text')
      .attr('transform', (d) => {
        // console.log(arc.centroid(d));
        return `translate(${arc.centroid(d)})`;
      })
      .call((text) =>
        text
          .append('tspan')
          .attr('y', '-0.4em')
          .attr('filter', 'url(#rounded-corners)')
          .attr('font-weight', 'bold')
          .text((d) => d.data.name),
      );
  }, []);
  return <div id="donut"></div>;
};

export default D3Donut;
