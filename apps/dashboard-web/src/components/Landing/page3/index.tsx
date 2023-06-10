import Image from 'next/image';
import { useState } from 'react';

export default function Page3() {
  const [state, setState] = useState<number>(0);
  const titles = ['test', 'test', 'test', 'test', 'test'];

  return (
    <div>
      <h2>test text</h2>
      <p>test text</p>
      <div>
        {titles.map((value: string, key: number) => {
          return (
            <button
              key={`page3_menu_${key}`}
              onClick={() => {
                setState(key);
              }}
              //select={state === key ? 1 : 0}
            >
              {value}
            </button>
          );
        })}
      </div>
      <div>
        <Image
          src={`/images/landing/page3_${state}.png`}
          alt={`${state} image`}
          width={100}
          height={100}
        />
        <button
          onClick={() => {
            console.log('move');
          }}
        >
          test
        </button>
      </div>
    </div>
  );
}
