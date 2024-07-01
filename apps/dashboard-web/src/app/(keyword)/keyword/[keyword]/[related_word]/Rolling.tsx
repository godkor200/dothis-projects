'use client';

import type { MotionValue } from 'framer-motion';
import {
  animate,
  AnimatePresence,
  motion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useState } from 'react';

import { cn } from '@/utils/cn';
const fontSize = 20;
const padding = 0;
const height = fontSize + padding;

export default function Counter({ value }: { value: number }) {
  const [num, setNum] = useState(0);

  useEffect(() => {
    let targetStr = value.toString();
    let currentNumber = '';

    // 500ms마다 숫자를 하나씩 추가
    const interval = setInterval(() => {
      if (currentNumber.length < targetStr.length) {
        currentNumber += targetStr[currentNumber.length];
        setNum(parseInt(currentNumber));
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval); // 컴포넌트가 언마운트 될 때 interval을 정리합니다
  }, [value]);

  return (
    <>
      <div
        style={{ fontSize }}
        className="flex justify-end overflow-hidden rounded bg-white px-2 leading-none text-gray-900"
      >
        {Array.from({ length: num.toString().length }, (_, i) =>
          Math.pow(10, i),
        )
          .reverse()
          .map((i, index, array) => {
            const isLastElement = index === array.length - 1;
            return (
              <motion.div
                key={i}
                className={cn('relative', {
                  'ml-1':
                    !isLastElement &&
                    !(index === 0) &&
                    (array.length - index) % 3 === 0,
                })}
              >
                {!isLastElement &&
                  !(index === 0) &&
                  (array.length - index) % 3 === 0 && (
                    <motion.span className="absolute left-[-4px] top-[-6px]">
                      ,
                    </motion.span>
                  )}
                <Digit place={i} value={num} key={i} />
              </motion.div>
            );
          })}
      </div>
    </>
  );
}

function Digit({ place, value }: { place: number; value: number }) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace, {
    stiffness: 500,
    duration: 200,
  });

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div style={{ height }} className="relative w-[14px] tabular-nums">
      {[...Array(10).keys()].map((i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Number({ mv, number }: { mv: MotionValue; number: number }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;

    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }

    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center "
    >
      {number}
    </motion.span>
  );
}

function Component() {
  let [count, setCount] = useState(0);
  return (
    <div>
      <p>Choose a number:</p>
      <input
        type="number"
        value={count}
        min={0}
        onChange={(e) => setCount(+e.target.value)}
      />
      <Counter value={count} />
    </div>
  );
}
