'use client';

import { useState } from 'react';

import Test from './Test';

const Page = () => {
  const [parent, setParent] = useState(false);
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns:
          'minmax(600px, 1.5fr) repeat(2, minmax(300px, 1fr))',
      }}
    >
      <Test test={parent}>
        <p>이거는 진짜 뭘까</p>
      </Test>

      <button onClick={() => setParent((prev) => !prev)}>
        {parent ? '부모 변경' : '자식변경'}
      </button>
      {/* Grid items go here */}
      <div className="bg-yellow">텍스트</div>
      <div className="bg-primary100">텍스트</div>
      <div className="bg-grey600">텍스트</div>
    </div>
  );
};

export default Page;
