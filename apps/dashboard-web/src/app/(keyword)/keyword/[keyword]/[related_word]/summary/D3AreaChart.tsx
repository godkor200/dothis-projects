'use client';

import './styles.css';

import * as D3 from 'd3';
import { useEffect, useRef } from 'react';

import { useExpectedViewFormatter } from '@/hooks/contents/useChartFormatter';
import useGetDailyExpectedView from '@/hooks/react-query/query/useGetDailyExpectedView';
import useDimensions from '@/hooks/useDimenstions';

interface DataItem {
  date: string;
  value: number;
  color: string;
}

interface AreaDataItem {
  date: string;
  value: number;
  value2: number;
  color: string;
}

const data: DataItem[] = [
  { date: '05/04', value: 252, color: 'red' },
  { date: '05/05', value: 331, color: 'orange' },
  { date: '05/06', value: 390, color: 'yellow' },
  { date: '05/07', value: 388, color: 'green' },
  { date: '05/08', value: 330, color: 'blue' },
  { date: '05/09', value: 292, color: 'indigo' },
];

const areaData = [
  { date: '05/04', value: 222, value2: 300, color: 'red' },
  { date: '05/05', value: 311, value2: 350, color: 'orange' },
  { date: '05/06', value: 290, value2: 450, color: 'yellow' },
  { date: '05/07', value: 288, value2: 400, color: 'green' },
  { date: '05/08', value: 230, value2: 420, color: 'blue' },
  { date: '05/09', value: 222, value2: 300, color: 'indigo' },
];

interface Props {
  baseKeyword: string;
  relatedKeyword: string | null;
}
const D3AreaChart = ({ baseKeyword, relatedKeyword }: Props) => {
  const height = 290;
  const marginTop = 20;
  const marginRight = -40;
  const marginBottom = 80;
  const marginLeft = -40;

  const selectRef = useRef(null);

  const { width } = useDimensions(selectRef);

  const { data: apiData } = useGetDailyExpectedView({
    baseKeyword,
    relatedKeyword,
  });

  const { expectedView, expectedArea } = useExpectedViewFormatter({
    keyword: baseKeyword,
    relword: relatedKeyword,
  });

  useEffect(() => {
    const chart = D3.select(selectRef.current);
    chart.selectAll('*').remove();

    const svg = D3.select('#area')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    // const chart = svg
    //   .append('g')
    //   .attr('transform', `translate(${marginLeft},${marginTop})`);

    const x = D3.scalePoint()
      .domain(expectedArea.map((item) => item.date))
      .range([marginLeft, width - marginRight])
      .padding(0.5);

    const xAxisCallback = (
      g: D3.Selection<SVGGElement, any, HTMLElement, any>,
    ) => {
      return g
        .attr('transform', `translate(0, ${height - marginBottom})`)
        .call(
          D3.axisBottom(x)
            .tickSizeOuter(0)
            .tickSize(0)
            .tickFormat((d) => d),
        )
        .selectAll('text')
        .attr('font-size', '12px')

        .attr('color', '#A1A1AA');
    };

    svg
      .append('g')
      .call(xAxisCallback)
      .call((g: D3.Selection<SVGGElement, any, HTMLElement, any>) =>
        g.select('.domain').remove(),
      )
      .selectAll('text')
      .attr('transform', 'translate(0,10)');

    const y = D3.scaleLinear()
      .domain([
        0,
        (D3.max(expectedArea, (d) => d.value[1]) ?? 100) +
          (D3.min(expectedArea, (d) => d.value[0])
            ? (D3.min(expectedArea, (d) => d.value[0]) ?? 0) / 2
            : 100),
      ])
      .nice()
      .range([height - marginBottom, marginTop]);

    const yAxisCallback = (
      g: D3.Selection<SVGGElement, any, HTMLElement, any>,
    ) => {
      const yMin = y.domain()[0];
      const yMax = y.domain()[1];

      const yMiddle = (yMin + yMax) / 2; // 중간값 계산

      return g
        .attr('transform', `translate(0, 0)`)
        .call(
          D3.axisLeft(y).tickSize(-width).tickValues([yMin, yMiddle, yMax]),
        );
    };

    svg
      .append('g')
      .call(yAxisCallback)
      .call((g: D3.Selection<SVGGElement, any, HTMLElement, any>) =>
        g.select('.domain').remove(),
      )
      .attr('class', 'grid')
      .attr('class', function (d) {
        return 'dashed';
      })
      .selectAll('text')
      .remove();

    const line = D3.line<(typeof expectedView)[number]>()
      .x((datum) => {
        // console.log(x(d.month) + x.bandwidth() / 2);

        return Number(x(datum.date)) + x.bandwidth() / 2;
      })
      .y((d) => {
        return y(d.value as number);
      })
      .curve(D3.curveCatmullRom);

    const tooltip2 = D3.select('#area-tooltip')
      .style('position', 'absolute')
      // .style('top', '-999px')
      // .style('left', '-999px')
      .style('display', 'none')
      .style('min-width', '150px')
      .style('background-color', '#3F3F46')
      .style('padding', '9px 6px')
      .style('border-radius', '10px');

    const area = D3.area<(typeof expectedArea)[number]>()
      .x((d) => x(d.date) as number)
      .y0((d) => y(d.value[0]))
      .y1((d) => y(d.value[1]))
      .curve(D3.curveCatmullRom);

    svg
      .append('path')
      .datum(expectedArea)
      // .data(areaData)
      // .enter()

      .attr('fill', '#FDE7EB')
      .attr('d', area(expectedArea))
      .on('mouseover', (e, i) => {
        const bisect = D3.bisector(
          (d: (typeof expectedView)[number] | (typeof expectedArea)[number]) =>
            d.date,
        ).left;

        const xPosition = D3.pointer(e)[0];
        var domain = x.domain();
        var range = x.range();
        var rangePoints = D3.range(range[0], range[1], x.step());
        var yPos = domain[D3.bisect(rangePoints, xPosition) - 1];

        const dataLavel = bisect(expectedArea, yPos);

        const currentAreaData = expectedArea[dataLavel];
        const currentExpectedData = expectedView[dataLavel];

        // Linear interpolation

        // 이 코드는 mousemove 이벤트가 svg 요소에서 발생할 때마다 마우스 포인터의 좌표를 콘솔에 출력합니다. mouseX와 mouseY는 svg 요소의 왼쪽 상단 모서리를 기준으로 한 상대적인 좌표입니다.
        // D3.pointer(e): 특정 요소(target element)를 기준으로 한 상대적인 좌표입니다.  <--> 기존에는 pageX pageY로 진행해서 relative에 따른 차이가 보였음
        const [mouseX, mouseY] = D3.pointer(e);

        const formatNumber = (number: number) =>
          number > 0.1 ? number.toFixed(1) : 0.1;

        tooltip2
          .transition()
          .duration(0)
          .style('display', 'block')
          .style('opacity', 1);
        tooltip2
          .html(
            `<div>
            <div style="display:flex; align-items:center;">
              <div  style="border:2px solid ${'#FDE7EB'}; width:8px; height:8px; border-radius:9999px; background-color:transparent; margin-right:8px;" ></div>
              <p style="color: #E4E4E7; font-size: 14px;
              font-style: normal;
              font-weight: 700; flex-basis: 30%; margin-right:8px;">${formatNumber(
                currentAreaData.value[1],
              )}</p>
              <p style="color: #A1A1AA; font-size: 12px;
              font-style: normal;
              font-weight: 500; "> ${`최대 조회수`} </p>
            </div>

            <div style="display:flex; align-items:center;">
              <div  style="border:2px solid ${'#FDE7EB'}; width:8px; height:8px; border-radius:9999px; background-color:transparent; margin-right:8px;" ></div>
              <p style="color: #E4E4E7; font-size: 14px;
              font-style: normal;
              font-weight: 700; flex-basis: 30%; margin-right:8px;">${formatNumber(
                currentExpectedData.value,
              )}</p>
              <p style="color: #A1A1AA; font-size: 12px;
              font-style: normal;
              font-weight: 500; "> ${`평균 조회수`} </p>
            </div>

                 <div style="display:flex; align-items:center;">
              <div  style="border:2px solid ${'#FDE7EB'}; width:8px; height:8px; border-radius:9999px; background-color:transparent; margin-right:8px;" ></div>
              <p style="color: #E4E4E7; font-size: 14px;
              font-style: normal;
              font-weight: 700; flex-basis: 30%; margin-right:8px;">${formatNumber(
                currentAreaData.value[0],
              )}</p>
              <p style="color: #A1A1AA; font-size: 12px;
              font-style: normal;
              font-weight: 500; "> ${`최소 조회수`} </p>
            </div>
          </div>`,
          )
          .style('transform', `translate(${mouseX + 30}px, ${mouseY + 30}px)`) //리플로우 및 애니메이션과 결합될 여지를 남겨두고 transform으로 조절
          .style('pointer-events', 'none'); // tooltip이랑 hover가 맞물리는 경우를 방지
      })
      .on('mousemove', function (e, i) {
        // Linear interpolation

        // 이 코드는 mousemove 이벤트가 svg 요소에서 발생할 때마다 마우스 포인터의 좌표를 콘솔에 출력합니다. mouseX와 mouseY는 svg 요소의 왼쪽 상단 모서리를 기준으로 한 상대적인 좌표입니다.
        // D3.pointer(e): 특정 요소(target element)를 기준으로 한 상대적인 좌표입니다.  <--> 기존에는 pageX pageY로 진행해서 relative에 따른 차이가 보였음

        const bisect = D3.bisector(
          (d: (typeof expectedView)[number] | (typeof expectedArea)[number]) =>
            d.date,
        ).left;

        const xPosition = D3.pointer(e)[0];
        var domain = x.domain();
        var range = x.range();
        var rangePoints = D3.range(range[0], range[1], x.step());
        var yPos = domain[D3.bisect(rangePoints, xPosition) - 1];

        const dataLavel = bisect(expectedArea, yPos);

        const currentAreaData = expectedArea[dataLavel];
        const currentExpectedData = expectedView[dataLavel];

        const [mouseX, mouseY] = D3.pointer(e);

        tooltip2
          .transition()
          .duration(0)
          .style('display', 'block')
          .style('opacity', 1);

        const tooltipNode = tooltip2.node() as HTMLElement;

        // Only update HTML if necessary
        if (
          tooltipNode &&
          tooltipNode.getAttribute('data-date') !== currentAreaData.date
        ) {
          tooltip2.attr('data-date', currentAreaData.date);
          tooltip2.html(
            `<div>
                <div style="display:flex; align-items:center;">
                  <div  style="border:2px solid ${'#F0516D'}; width:8px; height:8px; border-radius:9999px; background-color:transparent; margin-right:8px;" ></div>
                  <p style="color: #E4E4E7; font-size: 14px;
                  font-style: normal;
                  font-weight: 700; flex-basis: 30%; margin-right:8px;">${
                    currentAreaData.value[1]
                  }</p>
                  <p style="color: #A1A1AA; font-size: 12px;
                  font-style: normal;
                  font-weight: 500; "> ${`최대 조회수`} </p>
                </div>

                <div style="display:flex; align-items:center;">
                  <div  style="border:2px solid ${'#F0516D'}; width:8px; height:8px; border-radius:9999px; background-color:transparent; margin-right:8px;" ></div>
                  <p style="color: #E4E4E7; font-size: 14px;
                  font-style: normal;
                  font-weight: 700; flex-basis: 30%; margin-right:8px;">${
                    currentExpectedData.value
                  }</p>
                  <p style="color: #A1A1AA; font-size: 12px;
                  font-style: normal;
                  font-weight: 500; "> ${`평균 조회수`} </p>
                </div>

                           <div style="display:flex; align-items:center;">
                  <div  style="border:2px solid ${'#F0516D'}; width:8px; height:8px; border-radius:9999px; background-color:transparent; margin-right:8px;" ></div>
                  <p style="color: #E4E4E7; font-size: 14px;
                  font-style: normal;
                  font-weight: 700; flex-basis: 30%; margin-right:8px;">${
                    currentAreaData.value[0]
                  }</p>
                  <p style="color: #A1A1AA; font-size: 12px;
                  font-style: normal;
                  font-weight: 500; "> ${`최소 조회수`} </p>
                </div>


              </div>`,
          );
        }
        tooltip2.style(
          'transform',
          `translate(${mouseX + 30}px, ${mouseY + 30}px)`,
        );
      })

      .on('mouseout', (e) => {
        tooltip2
          .transition()
          .duration(0)
          .style('opacity', 0)
          .on('end', () => {
            tooltip2.style('display', 'none');
          });
      });

    const xMargin = 16;
    const yMargin = 6;
    const legendSpacing = 80 + xMargin * 2;

    const legendList = [
      { name: '평균 성과', color: '#F0516D' },
      { name: '성과 범위', color: '#F7B4C0' },
    ];

    const legendWidth = legendList.length * legendSpacing;
    const legendStartX = (width - legendWidth) / 2 + 50;

    const legendBackGround = svg
      .append('g')
      .selectAll('rect')
      .data(legendList)
      .join('rect');

    const legendText = svg
      .append('g')
      .selectAll<SVGTextElement, (typeof legendList)[number]>('text')
      .data(legendList)
      .join('text')
      .attr('class', 'legend')
      .attr('text-anchor', 'middle')
      .attr(
        'transform',
        (d, i) =>
          `translate(${legendStartX + i * legendSpacing}, ${
            height - marginBottom / 3
          })`,
      )
      .attr('cursor', 'pointer')
      .text((d) => d.name)
      .style('fill', (d) => d.color)
      .style('font-size', 15);

    // Calculate bounding boxes
    const bbox: Record<string, DOMRect> = {};
    legendText.each(function (d) {
      bbox[d.name] = this.getBBox();
    });

    // Create legend rectangles based on text bounding boxes
    legendBackGround
      .attr('fill', '#ff0000')
      .attr('width', (d) => (bbox[d.name]?.width || 0) + 2 * xMargin)
      .attr('height', (d) => (bbox[d.name]?.height || 0) + 2 * yMargin)
      .attr('transform', (d, i) => {
        const textBBox = bbox[d.name];
        const rectX =
          legendStartX + i * legendSpacing - textBBox.width / 2 - xMargin;
        const rectY =
          height - marginBottom / 3 - textBBox.height * 0.8 - yMargin;
        return `translate(${rectX}, ${rectY})`;
      })
      .attr('rx', 10)
      .attr('ry', 10)
      .attr('fill', '#fafafa')
      .attr('stroke', (d) => d.color)
      .attr('stroke-width', 1);

    svg
      .append('path')
      .datum(expectedView)
      .attr('fill', 'none')
      .attr('stroke', '#FF647D')
      .attr('class', '기대조회수')
      .attr('stroke-width', 2)
      .style('stroke-linecap', 'round')
      .style('pointer-events', 'none')
      .attr('d', line);
  }, [width, expectedView, expectedArea, apiData]);

  return (
    <div className="relative">
      <div id="area-tooltip" className="z-[500]"></div>
      <div id="area" className="[&_svg]:overflow-visible" ref={selectRef}></div>
    </div>
  );
};

export default D3AreaChart;

const convertRemToPixels = (rem: number) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};
