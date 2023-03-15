import { px2rem } from '../utils/unit';
import { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export const theme = {
  extend: {},
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
    /* gray */
    gray90: '#131313',
    gray80: '#2b2b2b',
    gray70: '#424242',
    gray60: '#5A5A5A',
    gray50: '#717171',
    gray40: '#898989',
    gray30: '#A1A1A1',
    gray20: '#B8B8B8',
    gray10: '#D0D0D0',
    gray05: '#E7E7E7',
    gray00: '#FFFFFF',

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

    /* other */
    danger: '#FC5555',
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
} satisfies Config['theme'];

export const utilityPlugin = plugin(function ({ addUtilities }) {
  addUtilities({
    '.typo-h1': {
      fontSize: theme.fontSize.h1,
      lineHeight: theme.lineHeight[54],
      fontWeight: theme.fontWeight.bold,
    },
    '.typo-h2': {
      fontSize: theme.fontSize.h2,
      lineHeight: theme.lineHeight[48],
      fontWeight: theme.fontWeight.bold,
    },
    '.typo-h3': {
      fontSize: theme.fontSize.h3,
      lineHeight: theme.lineHeight[42],
      fontWeight: theme.fontWeight.bold,
    },
    '.typo-t1': {
      fontSize: theme.fontSize.t1,
      lineHeight: theme.lineHeight[36],
      fontWeight: theme.fontWeight.bold,
    },
    '.typo-t2': {
      fontSize: theme.fontSize.t2,
      lineHeight: theme.lineHeight[30],
      fontWeight: theme.fontWeight.bold,
    },
    '.typo-t3': {
      fontSize: theme.fontSize.t2,
      lineHeight: theme.lineHeight[28],
      fontWeight: theme.fontWeight.bold,
    },
    '.typo-b1': {
      fontSize: theme.fontSize.b1,
      lineHeight: theme.lineHeight[24],
    },
    '.typo-b2': {
      fontSize: theme.fontSize.b2,
      lineHeight: theme.lineHeight[22],
    },
    '.typo-c1': {
      fontSize: theme.fontSize.c1,
      lineHeight: theme.lineHeight[18],
    },
    '.typo-c2': {
      fontSize: theme.fontSize.c2,
      lineHeight: theme.lineHeight[16],
      fontWeight: theme.fontWeight.regular,
    },
  });
});
