import D3Donut from '@/components/common/Charts/D3Donut';
import D3TextBorder from '@/components/common/Charts/D3TextBorder';
import D3Transition from '@/components/common/Charts/D3Transition';

import GPT from './Gpt';
import D3MergeExample from './MergeTest';
import Test from './Test';
import Transition from './YoutubeD3';

const Page = () => {
  const data = [
    { value: 50, color: '#008' },
    { value: 100, color: '#00C' },
    { value: 150, color: '#00f' },
  ];
  return (
    <div>
      <D3Donut />
      <GPT />
      <D3MergeExample />
      <Transition />
      <D3TextBorder />
      <Test />
    </div>
  );
};

export default Page;
