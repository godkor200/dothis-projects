import { css } from '@emotion/react';
import clsx from 'clsx';
import type { ComponentProps } from 'react';

import { colors } from '../../../lib';
import { SvgNext, SvgPrev } from '../Icons';
import { Button } from './Button';

type Props = ComponentProps<typeof Button> & {
  size?: 'full' | 'md';
  dir: 'prev' | 'next';
};
export function SwiperButton({
  size = 'md',
  dir,
  className,
  ...props
}: Props) {
  return (
    <Button
      className={clsx(size, className)}
      aria-label={dir === 'prev' ? 'Previous slide' : 'Next Slide'}
      css={style}
      {...props}
    >
      <div className="swiper-button-wrap">
        {dir === 'prev' ? <SvgPrev /> : <SvgNext />}
      </div>
    </Button>
  );
}
const style = css`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 100%;
  aspect-ratio: 1;

  .swiper-button-wrap {
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    background: ${colors.white};
    border: 1px solid ${colors.border['2']};
  }

  &.md .swiper-button-wrap {
    width: 34px;
    height: 34px;
  }

  &:disabled {
    opacity: 0.4;
  }
`;
