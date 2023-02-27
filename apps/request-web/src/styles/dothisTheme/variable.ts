import { theme } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { map } from '@fp-ts/core/ReadonlyRecord';

export const colors = {
  white: '#fff',
  black: '#000',

  blue: {
    default: '#3665f3',
  },

  primary: {
    10: '#FDE7EB',
    20: '#FBC6CF',
    30: '#F896A7',
    40: '#F4677F',
    50: '#F13757',
    60: '#E41035',
    default: '#E41035',
    70: '#B50D2A',
    80: '#85091F',
    90: '#560614',
    99: '#260309',
  },
  gray: {
    10: '#F7F8F9',
    20: '#E8EBED',
    30: '#C9CDD2',
    40: '#ABB3BB',
    50: '#9DA7B0',
    60: '#72787F',
    70: '#454C53',
    80: '#26282B',
    90: '#131415',
  },
  point: {
    light: '#FCF3D3',
    default: '#FFCE22',
  },
  bg: {
    light: '#FAFAFB',
    dark: '#F2F3F5',
    darkest: '#E7E9EE',
  },
  border: {
    1: '#ECEFF2',
    2: '#DCE1E5',
    3: '#C9CDD2',
    4: '#BDC3CA',
  },
  danger: {
    light: '#FFF0EA',
    default: '#FF4F17',
    dark: '#B02E04',
  },
  success: {
    light: '#D6FBE1',
    default: '#3FC96E',
    dark: '#229041',
  },
  overlay: {
    40: 'rgba(0, 0, 0, 0.4)',
    20: 'rgba(0, 0, 0, 0.2)',
  },
};

export const shadows = theme.shadows;

const fontSizeToRem = (f: string) => `${parseInt(f) / 16}rem`;

export const fontSizes = {
  h1: '24px',
  h2: '22px',
  h3: '20px',
  t1: '18px',
  t2: '16px',
  t3: '15px',
  t4: '14px',
  b1: '16px',
  b2: '14px',
  b3: '13px',
  b4: '12px',
} as const;

export const breakpoints = {
  lgMobile: 600,
  tablet: 768,
  pc: 1024,
} as const;

export const fontWeights = {
  r: '400',
  m: '500',
  sb: '600',
  b: '700',
};
export const lineHeights = {
  1: '1.2',
  2: '1.4',
};
export const fonts = {
  pt: "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif",
};

export const mediaQueries = map(
  (breakpoint: number) => `@media (min-width: ${breakpoint}px)`,
)(breakpoints);

export const typo = {
  h1: css`
    font-size: ${fontSizes.h1};
    font-weight: ${fontWeights.b};
    line-height: 38px;
  `,
  h2: css`
    font-size: ${fontSizes.h2};
    font-weight: ${fontWeights.b};
    line-height: 30px;
  `,
  h3: css`
    font-size: ${fontSizes.h3};
    font-weight: ${fontWeights.b};
    line-height: 26px;
  `,
  t1: css`
    font-size: ${fontSizes.t1};
    font-weight: ${fontWeights.b};
    line-height: 24px;
  `,
  t2: css`
    font-size: ${fontSizes.t2};
    font-weight: ${fontWeights.b};
    line-height: 20px;
  `,
  t3: css`
    font-size: ${fontSizes.t3};
    font-weight: ${fontWeights.sb};
    line-height: 18px;
  `,
  t4: css`
    font-size: ${fontSizes.t4};
    font-weight: ${fontWeights.sb};
    line-height: 18px;
  `,
  t5: css`
    font-size: ${fontSizes.b2};
    font-weight: ${fontWeights.sb};
    line-height: 18px;
  `,
  t6: css`
    font-size: ${fontSizes.b4};
    font-weight: ${fontWeights.sb};
    line-height: 14px;
  `,
  b1: css`
    font-size: ${fontSizes.b1};
    font-weight: ${fontWeights.m};
    line-height: 150%;
  `,
  b2: css`
    font-size: ${fontSizes.b2};
    font-weight: ${fontWeights.m};
    line-height: 150%;
  `,
  b3: css`
    font-size: ${fontSizes.b3};
    font-weight: ${fontWeights.m};
    line-height: 150%;
  `,
  b4: css`
    font-size: ${fontSizes.b4};
    font-weight: ${fontWeights.m};
    line-height: 150%;
  `,
};
