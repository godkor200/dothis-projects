'use client';

import './AdsBanner.css';

import Image from 'next/image';
import { useEffect, useState } from 'react';

function AdsBanner() {
  const [slide, setSlide] = useState(0);
  const delay = 2000;

  const slides = ['/AdsBanner.png'];
  useEffect(() => {
    const interval = setInterval(() => {
      goForward();
    }, delay);

    return () => clearInterval(interval);
  });
  const width = 222;
  let dotSize = (width - width * 0.2) / (slides.length - 1);
  if (dotSize > 30) {
    dotSize = 10;
  }
  const goForward = () => {
    setSlide(slide + 1);
    if (slide === slides.length - 1) {
      setSlide(0);
    }
  };
  const goBack = () => {
    setSlide(slide - 1);
    if (slide === 0) {
      setSlide(slides.length - 1);
    }
  };
  const dotNext = (numb: number) => {
    setSlide(numb);
  };

  return (
    <div className="slider">
      <button className="prev" onClick={goBack}>
        Previous
      </button>
      <button className="next" onClick={goForward}>
        Next
      </button>
      <div className="slideWrapper mx-auto  flex w-full">
        {slides.map((slider, i) => (
          <div
            className={
              slide === i ? 'active aspect-[1548/200]' : 'aspect-[1548/200]'
            }
            key={slider + i}
          >
            {' '}
            <Image
              src={slider}
              alt="text"
              fill={true}
              className={
                slide === i
                  ? 'active rounded-[16px] object-cover'
                  : 'rounded-[16px] object-cover'
              }
            />
            <div className="bg-grey600 text-grey00 absolute bottom-[24px] right-[24px] z-20 flex h-[34px] w-[70px] items-center  justify-center rounded-[9999px] text-center text-[16px]">
              <p>
                <span className="font-bold">{i + 1}</span> / {slides.length}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdsBanner;
