'use client';

import 'd3-transition';

import { max } from 'd3-array';
import { easeElastic } from 'd3-ease';
import { scaleBand, scaleLinear } from 'd3-scale';
import type { Selection } from 'd3-selection';
import { select } from 'd3-selection';
import React, { useEffect, useRef, useState } from 'react';

let initialData = [
  {
    name: 'foo',
    units: 32,
  },
  {
    name: 'bar',
    units: 67,
  },
  {
    name: 'baz',
    units: 81,
  },
  {
    name: 'hoge',
    units: 38,
  },
  {
    name: 'piyo',
    units: 28,
  },
  {
    name: 'hogera',
    units: 59,
  },
];

let copy = [
  {
    name: 'te',
    units: 92,
  },
  {
    name: 'tes',
    units: 1,
  },
  {
    name: 'test',
    units: 22,
  },
  {
    name: 'testt',
    units: 66,
  },
  {
    name: 'teste',
    units: 11,
  },
  {
    name: 'testes',
    units: 22,
  },
];
const Transition: React.FC = () => {
  const dimensions = { width: 800, height: 500 };
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [data, setData] = useState(initialData);
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');

  let x = scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, dimensions.width])
    .padding(0.05);

  let y = scaleLinear()
    .domain([0, max(data, (d) => d.units)!])
    .range([dimensions.height, 0]);

  const [selection, setSelection] = useState<null | Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  useEffect(() => {
    if (!selection) {
      setSelection(select(svgRef.current));
    } else {
      selection
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d) => x(d.name)!)
        .attr('y', dimensions.height)
        .attr('width', x.bandwidth)
        .attr('fill', 'orange')
        .attr('height', 0)
        /**
         * Transitions work similar to CSS Transitions
         * From an inital point, to the conlcuded point
         * in which you set the duration, and the ease
         * and a delay if you'd like
         */
        .transition()
        .duration(4000)
        .delay((_, i) => i * 100)
        .ease(easeElastic)
        .attr('height', (d) => dimensions.height - y(d.units))
        .attr('y', (d) => y(d.units));
    }
  }, [selection]);

  useEffect(() => {
    if (selection) {
      x = scaleBand()
        .domain(data.map((d) => d.name))
        .range([0, dimensions.width])
        .padding(0.05);
      y = scaleLinear()
        .domain([0, max(data, (d) => d.units)!])
        .range([dimensions.height, 0]);

      const rects = selection.selectAll('rect').data(data);

      rects
        .exit()
        .transition()
        .ease(easeElastic)
        .duration(1000)
        .attr('height', 0)
        .attr('y', dimensions.height)
        .remove();

      /**
       * a delay is added here to aid the transition
       * of removing and adding elements
       * otherwise, it will shift all elements
       * before the add/remove transitions are finished
       */
      rects
        .transition()

        .attr('x', (d) => x(d.name)!)
        .attr('y', (d) => y(d.units))
        .attr('width', x.bandwidth)
        .attr('height', (d) => dimensions.height - y(d.units))
        .attr('fill', 'orange');

      rects
        .enter()
        .append('rect')
        .attr('x', (d) => x(d.name)!)
        .attr('width', x.bandwidth)
        .transition()
        .duration(1000)
        .attr('height', 0)
        .attr('y', dimensions.height)
        .delay(1000)
        .duration(1000)
        .ease(easeElastic)
        .attr('height', (d) => dimensions.height - y(d.units))
        .attr('y', (d) => y(d.units))
        .attr('fill', 'orange');
    }
  }, [data]);

  /**
   * functions to help add and remove elements to show transitions
   */
  const addData = () => {
    const dataToAdd = {
      name: Date(),
      units: Math.round(Math.random() * 80 + 20),
    };
    setData([...data, dataToAdd]);
  };

  const reset = () => {
    if (data.length === 0) {
      return;
    }
    setData(copy);
  };

  const removeData = () => {
    if (data.length === 0) {
      return;
    }
    setData([...data.slice(0, data.length - 1)]);
  };

  return (
    <>
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} />
      <div className="gap-30 flex">
        <button onClick={addData}>Add Data</button>
        <button onClick={removeData}>Remove Data</button>

        <button onClick={reset}>reset Data</button>
      </div>
    </>
  );
};

export default Transition;
