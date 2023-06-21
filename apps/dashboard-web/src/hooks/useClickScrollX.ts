import type { MutableRefObject } from 'react';
import { useRef } from 'react';

const useClickScrollX = <
  T extends HTMLDivElement & HTMLButtonElement & HTMLDivElement,
>(): [
  (target: MutableRefObject<T | null>) => void,
  MutableRefObject<HTMLDivElement | null>,
] => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const tapScrollX = useRef<number | undefined>(0);

  function handleTapScrollX(target: MutableRefObject<T | null>) {
    tapScrollX.current = target?.current?.getBoundingClientRect().x;

    containerRef.current?.scrollTo({
      behavior: 'smooth',
      left: containerRef.current?.scrollLeft + tapScrollX.current! - 500,
    });
  }
  return [handleTapScrollX, containerRef];
};

export default useClickScrollX;
