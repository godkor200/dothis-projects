import { useEffect, useState } from 'react';

export default function useScroll({
  el = document.body,
  scrollEl = typeof window === 'undefined' ? undefined : window,
  defaultDirection = 'UP' as 'DOWN' | 'UP',
} = {}) {
  // storing this to get the scroll direction
  const [lastScrollTop, setLastScrollTop] = useState(0);
  // the offset of the document.body
  const [bodyOffset, setBodyOffset] = useState(
    document.body.getBoundingClientRect(),
  );
  // the vertical direction
  const [scrollY, setScrollY] = useState(bodyOffset.top);
  // the horizontal direction
  const [scrollX, setScrollX] = useState(bodyOffset.left);
  // scroll direction would be either up or down
  const [scrollDirection, setScrollDirection] = useState<'DOWN' | 'UP'>(
    defaultDirection,
  );

  const listener = (e: Event) => {
    setBodyOffset(document.body.getBoundingClientRect());
    setScrollY(-bodyOffset.top);
    setScrollX(bodyOffset.left);
    const direction = lastScrollTop > -bodyOffset.top ? 'DOWN' : 'UP';
    if (scrollDirection !== direction) setScrollDirection(direction);
    setLastScrollTop(-bodyOffset.top);
  };

  useEffect(() => {
    scrollEl?.addEventListener('scroll', listener);
    return () => {
      scrollEl?.removeEventListener('scroll', listener);
    };
  });

  return {
    scrollY,
    scrollX,
    scrollDirection,
  };
}
