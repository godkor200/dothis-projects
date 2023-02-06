import { colors } from '@dothis/share';
import HorizonPostRequestItemWrap from '@dothis/share/components/layout/HorizonPostRequestItemWrap';
import { css } from '@emotion/react';
import { chunksOf } from '@fp-ts/core/ReadonlyArray';
import type { MutableRefObject } from 'react';
import React from 'react';
import { A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperProps } from 'swiper/react/swiper-react';
import type { Swiper as SwiperClass } from 'swiper/types';

import type { HorizonPostRequestItemProps } from '@/components/article/HorizonPostRequestItem';
import HorizonPostRequestItem from '@/components/article/HorizonPostRequestItem';

type Props = {
  postRequestList: HorizonPostRequestItemProps['requestPost'][];
  swiperRef?: MutableRefObject<SwiperClass | null>;
  onSlideChange?: SwiperProps['onSlideChange'];
};
export default function HotRequestListSwiper({
  postRequestList,
  swiperRef,
  onSlideChange,
}: Props) {
  return (
    <div css={swiperWrapperStyle}>
      <Swiper
        modules={[A11y]}
        slidesPerView={1}
        loop
        grabCursor
        spaceBetween={40}
        threshold={5}
        onSlideChange={onSlideChange}
        onSwiper={(swiperIns) => {
          if (swiperRef) swiperRef.current = swiperIns;
        }}
      >
        {/* 3개씩 묶어서 slide에 넣음 */}
        {chunksOf(3)(postRequestList).map((post3arr) => (
          <SwiperSlide
            key={`${post3arr[0].id}`}
            className="list-item-swiper_slide"
          >
            <HorizonPostRequestItemWrap>
              {post3arr.map((request) => (
                <HorizonPostRequestItem
                  key={`${request.id}`}
                  requestPost={request}
                />
              ))}
            </HorizonPostRequestItemWrap>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const swiperWrapperStyle = css`
  position: relative;
  width: 100%;

  .swiper,
  .swiper-wrapper {
    height: 100%;
  }

  .vertical-post-item {
    padding-bottom: 40px;
    padding-top: 40px;
    border-bottom: 1px solid ${colors.border['2']};

    &:first-of-type {
      padding-top: 0;
    }

    &:last-of-type {
      padding-bottom: 0;
      border-bottom: 0 none;
    }
  }
`;
