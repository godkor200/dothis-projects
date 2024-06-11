import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';

import type { DataItem } from './SummaryChart';

const LineChart = ({ data }) => {
  const [chartData, setChartData] = useState([
    10, 20, 30, 40, 50, 60, 70, 77, 88, 99,
  ]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const width = svg.attr('width');
    const height = svg.attr('height');

    const xScale = d3
      .scaleLinear()
      .domain([0, chartData.length - 1])
      .range([0, Number(width)]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(chartData) || 100])
      .range([Number(height), 0]);

    drawChart(svg, xScale, yScale);
  }, [chartData]);

  const drawChart = (
    svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
    xScale: d3.ScaleLinear<number, number, never>,
    yScale: d3.ScaleLinear<number, number, never>,
  ) => {
    const line = d3
      .line()
      .x((d, i) => xScale(i))
      .y((d) => {
        return yScale(d);
      })
      .curve(d3.curveMonotoneX);

    const line0 = d3
      .line()
      .x((d, i) => xScale(i))
      .y((d) => {
        return yScale(0);
      })
      .curve(d3.curveMonotoneX);

    const initialLineGenerator = d3
      .line<DataItem>()
      .x((d, i) => xScale(i))
      .y(() => yScale(0))
      .curve(d3.curveCatmullRom);

    const path = svg.selectAll('.line').data([chartData]);
    if (!xScale || !yScale) return; // Ensure scales are defined before rendering

    const initialLineGenerator2 = d3
      .line<DataItem>()
      .x((d) => (xScale(d.date) as number) + xScale.bandwidth() / 2)
      .y(() => yScale(0))
      .curve(d3.curveCatmullRom);
    // 업데이트
    // path
    //   .transition()
    //   .duration(1000)
    //   .attr('d', (d) => line(d));

    // 추가
    path
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line0)
      .transition()
      .duration(500)
      .attr('d', line);
    //   .attr('stroke-opacity', 0) // 초기에 투명도를 0으로 설정
    // 업데이트 이후에 투명도를 1로 변경하여 애니메이션 효과를 줌
    //   .transition()
    //   .delay(1000)
    //   .duration(1000)
    //   .attr('stroke-opacity', 1);

    path
      .transition()
      .duration(1000)
      .attr('d', line0)
      .on('end', () => {
        path.transition().duration(2000).attr('d', line);
      });

    // 제거
    // path
    //   .exit()
    //   .call(() => {
    //     console.log('test');
    //   })
    //   .transition()
    //   .duration(1000)
    //   .attr('d', line0)
    //   .remove();
  };

  const handleDataChange = () => {
    const newData = generateRandomData();
    setChartData(newData);
  };

  const generateRandomData = () => {
    const newData = [];
    for (let i = 0; i < 10; i++) {
      newData.push(Math.random() * 100);
    }
    return newData;
  };

  return (
    <div>
      <svg ref={svgRef} width={400} height={200}></svg>
      <button onClick={handleDataChange}>데이터 변경</button>
    </div>
  );
};

export default LineChart;
