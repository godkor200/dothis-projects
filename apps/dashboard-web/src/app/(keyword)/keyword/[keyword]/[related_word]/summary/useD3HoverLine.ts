import type * as D3 from 'd3';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { DataItem } from './SummaryChart';

interface LineRef {
  //   line: D3.Line<DataItem>;
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
  data: DataItem[];
  dimensions: Dimensions;
  xScale: D3.ScaleBand<string> | undefined;
}

const useD3HoverLine = ({ chartSelector, data, dimensions, xScale }: Props) => {
  const { width, height, marginTop, marginRight, marginBottom, marginLeft } =
    dimensions;

  const lineHoverRef = useRef<LineRef | null>(null);

  const handleSelectHoverLines = () => {
    return chartSelector
      .selectAll('.hover-rect-group')
      .selectAll<SVGRectElement, DataItem>('rect');
  };

  useImperativeHandle(lineHoverRef, () => ({
    render: () => {
      if (!xScale) return;

      let hoverLineGroup =
        chartSelector.select<SVGGElement>('.hover-rect-group');
      if (hoverLineGroup.empty()) {
        // If it doesn't exist, create it
        hoverLineGroup = chartSelector
          .append('g')
          .attr('class', 'hover-rect-group');
      }

      hoverLineGroup
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d) => (xScale(d?.date) as number) + xScale.bandwidth() / 2)
        .attr('y', marginTop)
        .attr('width', 1)
        .attr('height', height - marginBottom - marginTop)
        .attr('fill', '#A1A1AA')
        .style('opacity', 0);
    },

    remove: () => {
      const hoverLinesSelector = handleSelectHoverLines();

      hoverLinesSelector.remove();
    },
  }));

  return {
    lineHoverRef,
    handleSelectHoverLines,
  };
};

export default useD3HoverLine;
