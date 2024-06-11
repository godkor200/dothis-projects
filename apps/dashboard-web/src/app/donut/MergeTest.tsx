'use client';
import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';

const D3MergeExample = () => {
  const [data, setData] = useState([1, 2, 3, 4, 5]);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // 데이터 바인딩
    const circles = svg
      .selectAll<SVGCircleElement, number>('circle')
      .data(data, (d) => d);

    // Enter selection: 새로운 데이터 항목에 대해 요소 생성
    const enterCircles = circles
      .enter()
      .append('circle')
      .attr('cy', 60)
      .attr('r', 10)
      .attr('fill', 'green');

    // Merge: enter와 update selection 결합
    circles
      .merge(enterCircles)
      .attr('cx', (d, i) => i * 40 + 30)
      .attr('fill', 'red');

    // Exit selection: 불필요한 요소 제거
    circles.exit().remove();

    // 2초 후에 데이터 업데이트
    const timeout = setTimeout(() => {
      setData([2, 4, 6, 8, 10, 12]);
    }, 2000);

    // 클린업 함수
    return () => clearTimeout(timeout);
  }, [data]);

  return <svg ref={svgRef} width="600" height="200"></svg>;
};

export default D3MergeExample;
