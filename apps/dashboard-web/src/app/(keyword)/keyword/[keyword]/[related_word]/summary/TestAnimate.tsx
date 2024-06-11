// import * as d3 from 'd3';
// import React, { useEffect, useRef } from 'react';

// function LineChart({ data }) {
//   const svgRef = useRef();

//   useEffect(() => {
//     const svg = d3.select(svgRef.current);
//     const margin = { top: 20, right: 30, bottom: 30, left: 40 };
//     const width = svg.attr('width') - margin.left - margin.right;
//     const height = svg.attr('height') - margin.top - margin.bottom;

//     // 날짜 파싱 및 스케일 정의
//     const parseDate = d3.timeParse('%Y-%m-%d');
//     data.forEach((d) => (d.date = parseDate(d.date)));

//     const xScale = d3
//       .scaleTime()
//       .domain(d3.extent(data, (d) => d.date))
//       .range([0, width]);

//     const yScale = d3
//       .scaleLinear()
//       .domain([0, d3.max(data, (d) => d.value)])
//       .range([height, 0]);

//     const line = d3
//       .line()
//       .x((d) => xScale(d.date))
//       .y((d) => yScale(d.value))
//       .curve(d3.curveMonotoneX); // 부드러운 선을 위함

//     // 스케일 및 축 설정
//     const xAxis = d3.axisBottom(xScale).ticks(data.length);
//     const yAxis = d3.axisLeft(yScale);

//     svg
//       .selectAll('.x-axis')
//       .data([0])
//       .join('g')
//       .attr('class', 'x-axis')
//       .attr('transform', `translate(${margin.left},${height + margin.top})`)
//       .call(xAxis);

//     svg
//       .selectAll('.y-axis')
//       .data([0])
//       .join('g')
//       .attr('class', 'y-axis')
//       .attr('transform', `translate(${margin.left},${margin.top})`)
//       .call(yAxis);

//     // 선 그리기
//     svg
//       .selectAll('.line')
//       .data([data]) // data를 배열로 감싸야 함
//       .join('path')
//       .attr('class', 'line')
//       .attr('fill', 'none')
//       .attr('stroke', function (d) {
//         return d[0].color;
//       }) // 첫 번째 데이터 항목의 색상을 사용
//       .attr('stroke-width', 1.5)
//       .attr('transform', `translate(${margin.left},${margin.top})`)
//       .transition() // 부드러운 전환을 위한 transition
//       .duration(1000) // 전환 지속 시간 설정
//       .attr('d', line);
//   }, [data]); // 데이터가 변경될 때마다 useEffect가 실행됩니다.

//   return <svg ref={svgRef} width={600} height={300}></svg>;
// }

// export default LineChart;
import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

const LineChartAnimated = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    // 스케일 정의
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(...data)])
      .range([height, 0]);

    const lineGenerator = d3
      .line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d))
      .curve(d3.curveMonotoneX); // 부드러운 라인을 위해

    // 기존 라인을 0으로 애니메이션
    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('class', 'line')
      .transition()
      .duration(500)
      .attr('d', lineGenerator(data.map(() => 0)))
      .on('end', () => {
        // 새 데이터로 라인 확장 애니메이션
        d3.select(this)
          .transition()
          .duration(500)
          .attr('d', lineGenerator(data));
      });
  }, [data]); // 데이터가 변경될 때마다 useEffect 트리거

  return <svg ref={svgRef} width={400} height={200}></svg>;
};

export default LineChartAnimated;
