import { Button, colors, typo } from '@dothis/share';
import { SvgNext , SvgPrev } from '@dothis/share/components/ui';
import { css } from '@emotion/react';
import { useRef, useState } from 'react';
import { A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper/types';

type Props = {
  Banners: React.ComponentType[];
};
const MainSwiper = ({ Banners }: Props) => {
  const swiper = useRef<SwiperClass | null>(null);
  const [swiperIndex, setSwiperIndex] = useState(0);

  return (
    <div css={swiperWrapperStyle}>
      <Swiper
        modules={[A11y]}
        slidesPerView={1}
        loop
        threshold={5}
        enabled={Banners.length > 1}
        grabCursor={true}
        onSlideChange={({ realIndex }) => {
          setSwiperIndex(realIndex);
        }}
        onSwiper={(swiperIns) => {
          swiper.current = swiperIns;
        }}
      >
        {Banners.map((Banner, i) => (
          <SwiperSlide key={i} className="main-swiper_slide">
            <Banner />
          </SwiperSlide>
        ))}
      </Swiper>
      {Banners.length > 1 && (
        <>
          <Button
            className="main-swiper_nav-prev-button"
            aria-label="Previous slide"
            // disabled={swiperIndex === 0}
            onClick={() => swiper.current?.slidePrev()}
          >
            <SvgPrev />
          </Button>
          <Button
            className="main-swiper_nav-next-button"
            aria-label="Next slide"
            // disabled={swiperIndex + 1 === banners.length}
            onClick={() => swiper.current?.slideNext()}
          >
            <SvgNext />
          </Button>
          <div className="main-swiper_pagination">
            <span className="current-slide-index">{swiperIndex + 1}</span>
            <span className="max-slide-index">
              &nbsp;/&nbsp;{Banners.length}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

const bannerStyle = css`
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;

  .banner-content {
    position: absolute;

    left: 120px;
    top: 47px;

    .banner-sub-title {
      color: ${colors.success.dark};
      ${typo.t1};
    }

    .banner-title {
      margin-top: 12px;
      ${typo.h1};
      line-height: 150%;
    }
  }
`;

const swiperWrapperStyle = css`
  position: relative;

  .swiper,
  .swiper-wrapper {
    width: 100%;
    height: 100%;
  }

  .main-swiper_nav-prev-button,
  .main-swiper_nav-next-button {
    position: absolute;
    display: flex;
    width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
    top: 50%;
    border-radius: 50%;
    background: ${colors.white};
    border: 1px solid ${colors.border['2']};

    z-index: 1;
    transform: translateY(-50%);

    &:disabled {
      opacity: 0.4;
    }

    &:active {
      transform: translateY(calc(-50% + 2px));
    }
  }

  .main-swiper_nav-prev-button {
    left: 16px;
  }

  .main-swiper_nav-next-button {
    right: 16px;
  }

  .main-swiper_pagination {
    position: absolute;
    width: 82px;
    height: 24px;
    text-align: center;
    right: 46px;
    bottom: 24px;
    z-index: 1;

    border-radius: 35px;
    background: ${colors.overlay['40']};
    color: ${colors.white};

    .current-slide-index {
      opacity: 0.4;
    }
  }
`;

export default MainSwiper;
