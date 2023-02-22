import { colors } from '@/styles/dothisTheme';
import type { SVGProps } from 'react';

export const SvgDonate = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill={colors.gray['70']}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_2965_4939)">
      <path d="M8 15.1882C4.318 15.1882 1.33333 12.2035 1.33333 8.52148C1.33333 4.83948 4.318 1.85482 8 1.85482C11.682 1.85482 14.6667 4.83948 14.6667 8.52148C14.6667 12.2035 11.682 15.1882 8 15.1882ZM8 5.69282L5.17133 8.52148L8 11.3502L10.8287 8.52148L8 5.69282Z" />
    </g>
    <defs>
      <clipPath id="clip0_2965_4939">
        <rect
          width="16"
          height="17"
          fill="white"
          transform="translate(0 0.521484)"
        />
      </clipPath>
    </defs>
  </svg>
);
