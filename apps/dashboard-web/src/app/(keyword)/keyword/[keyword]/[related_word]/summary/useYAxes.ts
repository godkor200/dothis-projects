import * as D3 from 'd3';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

interface DataItem {
  value: number;
}

interface YAxisRef {
  render: () => void;
  remove: () => void;
}

interface Dimensions {
  width: number;
  height: number;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
}

interface Props {
  chartSelector: D3.Selection<D3.BaseType, unknown, HTMLElement, any>;
  data: DataItem[][];
  dimensions: Dimensions;
  styleMethod?: (
    selection: D3.Selection<any, any, any, any>,
    index: number,
  ) => void;
}

const useYAxes = ({ chartSelector, data, dimensions, styleMethod }: Props) => {
  const { width, height, marginTop, marginRight, marginBottom, marginLeft } =
    dimensions;

  const yAxisRef = useRef<YAxisRef | null>(null);

  const yScales = data.map((dataSet) => {
    const [min = 0, max = 100] = D3.extent(
      dataSet,
      (data) => data.value as number,
    );
    return D3.scaleLinear()
      .domain([0, max === 0 ? 100 : max])
      .nice()
      .range([height - marginBottom, marginTop]);
  });

  useImperativeHandle(
    yAxisRef,
    () => ({
      render: () => {
        yScales.forEach((y, index) => {
          const yMin = y.domain()[0];
          const yMax = y.domain()[1];

          const yMiddle = (yMin + yMax) / 2; // 중간값 계산

          const yAxisCallback = (
            g: D3.Selection<SVGGElement, unknown, HTMLElement, undefined>,
          ) =>
            g
              .attr('transform', `translate(${marginLeft}, 0)`)
              .call(
                D3.axisLeft(y)
                  .tickSize(-width)
                  .tickValues([yMin, yMiddle, yMax]),
              );

          chartSelector
            .append('g')
            .attr('transform', `translate(${marginLeft}, 0)`)
            .call(yAxisCallback)
            .call(
              (g: D3.Selection<SVGGElement, unknown, HTMLElement, undefined>) =>
                g.select('.domain').remove(),
            )

            .attr('class', function (d) {
              return `dashed yaxis-${index}`;
            })
            .call((yAxis) => {
              if (styleMethod) {
                styleMethod(yAxis, index);
              }
            })
            .selectAll('text')
            .remove();
        });
      },
      remove: () => {
        yScales.forEach((_, index) => {
          chartSelector.selectAll(`.yaxis-${index}`).remove();
        });
      },
    }),
    [chartSelector, width, data],
  );

  return { y: yScales, yAxisRef };
};

export default useYAxes;
