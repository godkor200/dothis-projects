import { px2rem } from '../utils/unit';
import { Config } from 'tailwindcss';
import { borderRadius } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export const theme = {
  extend: {
    borderRadius: {
      '8': px2rem(8),
      '10': px2rem(10),
      none: borderRadius.none,
      full: borderRadius.full,
    },
    borderWidth: {
      1: '1px',
    },
    height: {
      '9.5': px2rem(38),
    },
  },
  fontSize: {
    /* heading */
    h1: px2rem(36),
    h2: px2rem(32),
    h3: px2rem(28),

    /* title */
    t1: px2rem(24),
    t2: px2rem(20),
    t3: px2rem(18),

    /* body */
    b1: px2rem(16),
    b2: px2rem(14),

    /* caption */
    c1: px2rem(12),
    c2: px2rem(10),
  },
  fontWeight: {
    bold: '700',
    regular: '400',
  },
  screens: {
    // tablet
    // @media (min-width: 768px) { ... }
    tablet: '768px',

    // pc
    // @media (min-width: 1280px) { ... }
    pc: '1280px',
  },
  gap: {
    30: px2rem(30),
  },
  colors: {
    transparent: 'transparent',

    /* gray */
    grey90: '#131313',
    grey80: '#2b2b2b',
    grey70: '#424242',
    grey60: '#5A5A5A',
    grey50: '#717171',
    grey40: '#898989',
    grey30: '#A1A1A1',
    grey20: '#B8B8B8',
    grey10: '#D0D0D0',
    grey05: '#E7E7E7',
    grey00: '#FFFFFF',

    /* background */
    background20: '#F1F1F1',
    background10: '#F5F5F5',

    /* primary */
    primary70: '#85091F',
    primary60: '#B50D2A',
    primary50: '#E71439',
    primary40: '#F17288',
    primary30: '#F7B4C0',
    primary20: '#FDE7EB',
    primary10: '#FEF3F5',

    /* system */
    error: '#FC5555',
    success: '#45D08B',

    /* sub */
    yellow: '#FFCE7B',
    orange: '#FD7B59',
    purple: '#C56CF0',
    indigo: '#636DF8',
  },
  lineHeight: {
    16: px2rem(16),
    18: px2rem(18),
    22: px2rem(22),
    24: px2rem(24),
    28: px2rem(28),
    30: px2rem(30),
    36: px2rem(36),
    42: px2rem(42),
    48: px2rem(48),
    54: px2rem(54),
  },
  boxShadow: {
    grey12: '0px 4px 12px rgba(113, 113, 113, 0.15)',
    grey24: '0px 6px 24px rgba(113, 113, 113, 0.15)',
    red12: '0px 4px 12px rgba(151, 5, 27, 0.1)',
    red24: '0px 6px 24px rgba(151, 5, 27, 0.1)',
  },
} satisfies Config['theme'];

// export const utilityPlugin = plugin(function ({ addUtilities }) {
//   addUtilities({
//     '.typo-h1': {
//       fontSize: theme.fontSize.h1,
//       lineHeight: theme.lineHeight[54],
//       fontWeight: theme.fontWeight.bold,
//     },
//     '.typo-h2': {
//       fontSize: theme.fontSize.h2,
//       lineHeight: theme.lineHeight[48],
//       fontWeight: theme.fontWeight.bold,
//     },
//     '.typo-h3': {
//       fontSize: theme.fontSize.h3,
//       lineHeight: theme.lineHeight[42],
//       fontWeight: theme.fontWeight.bold,
//     },
//     '.typo-t1': {
//       fontSize: theme.fontSize.t1,
//       lineHeight: theme.lineHeight[36],
//       fontWeight: theme.fontWeight.bold,
//     },
//     '.typo-t2': {
//       fontSize: theme.fontSize.t2,
//       lineHeight: theme.lineHeight[30],
//       fontWeight: theme.fontWeight.bold,
//     },
//     '.typo-t3': {
//       fontSize: theme.fontSize.t2,
//       lineHeight: theme.lineHeight[28],
//       fontWeight: theme.fontWeight.bold,
//     },
//     '.typo-b1': {
//       fontSize: theme.fontSize.b1,
//       lineHeight: theme.lineHeight[24],
//     },
//     '.typo-b2': {
//       fontSize: theme.fontSize.b2,
//       lineHeight: theme.lineHeight[22],
//     },
//     '.typo-c1': {
//       fontSize: theme.fontSize.c1,
//       lineHeight: theme.lineHeight[18],
//     },
//     '.typo-c2': {
//       fontSize: theme.fontSize.c2,
//       lineHeight: theme.lineHeight[16],
//       fontWeight: theme.fontWeight.regular,
//     },
//   });
// });
