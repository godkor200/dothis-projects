'use client';

import * as D3 from 'd3';
import { useEffect } from 'react';
const D3TextBorder = () => {
  useEffect(() => {
    const svg = D3.select('#border')
      .append('svg')
      .attr('width', 800)
      .attr('height', 600);

    // 필터 정의
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
      .attr('stdDeviation', 2);

    defs
      .select('#rounded-corners')
      .append('feComponentTransfer')
      .append('feFuncA')
      .attr('type', 'table')
      .attr('tableValues', '0 0 0 1');

    defs
      .select('#rounded-corners')
      .append('feComponentTransfer')
      .append('feFuncA')
      .attr('type', 'table')
      .attr('tableValues', '0 1 1 1 1 1 1 1');

    defs
      .select('#rounded-corners')
      .append('feComposite')
      .attr('operator', 'over')
      .attr('in', 'SourceGraphic');

    defs
      .append('filter')
      .attr('id', 'rounded-corners-2')
      .attr('primitiveUnits', 'objectBoundingBox')
      .append('feImage')
      .attr('preserveAspectRatio', 'none')
      .attr('width', '110%')
      .attr('height', '110%')
      .attr('x', '-5%')
      .attr('y', '0%')
      .attr(
        'xlink:href',
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 400 40' height='40' width='400'%3E%3Crect fill='red' x='0' y='0' rx='10' ry='10' width='400' height='40'/%3E%3C/svg%3E",
      );

    defs
      .select('#rounded-corners-2')
      .append('feComposite')
      .attr('operator', 'over')
      .attr('in', 'SourceGraphic');

    // 텍스트 요소 추가
    svg
      .append('text')
      .attr('filter', 'url(#rounded-corners)')
      .attr('x', 20)
      .attr('y', 40)
      .style('font-size', 30)
      .text('Blur & opacity filter');

    svg
      .append('text')
      .attr('filter', 'url(#rounded-corners)')
      .attr('x', 20)
      .attr('y', 80)
      .style('font-size', 30)
      .text('But the x padding is relative and overflows with long text');

    svg
      .append('text')
      .attr('filter', 'url(#rounded-corners-2)')
      .attr('x', 20)
      .attr('y', 140)
      .style('font-size', 30)
      .text('feImage and a rect filter');

    svg
      .append('text')
      .attr('filter', 'url(#rounded-corners-2)')
      .attr('x', 20)
      .attr('y', 180)
      .style('font-size', 30)
      .text("But you still can't get away from relative padding");
  }, []);

  return <div id="border"></div>;
};

export default D3TextBorder;
