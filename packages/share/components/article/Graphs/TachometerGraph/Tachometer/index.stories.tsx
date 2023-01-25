import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';

import type { TachometerGraphProps } from './index';
import { TachometerGraph } from './index';
import { defaultPercentValueInfo } from './utils';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'visx/TachometerGraph',
  component: TachometerGraph,
} as ComponentMeta<typeof TachometerGraph>;

const data: TachometerGraphProps['data'] = [
  { color: '#ff0000', label: '매우 높음' },
  { color: '#ff9900', label: '높음' },
  { color: '#ffc000', label: '보통' },
  { color: '#92d050', label: '낮음' },
  { color: '#00b050', label: '매우 낮음' },
];

const valueInfo: TachometerGraphProps['valueInfo'] = {
  ...defaultPercentValueInfo,
  maxLabel: '좋음',
  minLabel: '나쁨',
};

export const Sample = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(0);

  return (
    <div style={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
      경쟁 강도&nbsp;
      <input
        type="number"
        style={{ padding: 8, width: 80, border: '1px solid #ccc' }}
        min={0}
        max={100}
        defaultValue={value}
        ref={inputRef}
      />
      <button
        style={{
          padding: 8,
          backgroundColor: '#444',
          color: '#fff',
        }}
        onClick={() => {
          if (inputRef.current) setValue(Number(inputRef.current.value));
        }}
      >
        0~100 값 적용
      </button>
      <TachometerGraph data={data} value={value} valueInfo={valueInfo} />
    </div>
  );
};
