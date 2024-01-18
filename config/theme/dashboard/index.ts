import { px2rem } from '../utils/unit';
import { Config } from 'tailwindcss';
import { borderRadius } from 'tailwindcss/defaultTheme';
import { colors } from './colors';
import { shadow } from './shadow';
import { fontSize, fontWeight } from './font';
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
  fontSize,
  fontWeight,
  colors,
  shadow,
  screens: {
    // @media (min-width: 768px) { ... }
    tablet: '768px',

    // @media (min-width: 1280px) { ... }
    desktop: '1280px',

    // @media (min-width:1600px) { ... }

    expandSideBar: '1600px',
  },
  gap: {
    30: px2rem(30),
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

export const typography = plugin(({ addUtilities }) => {
  addUtilities({
    /* heading */
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

    /* title */
    '.typo-t1': {
      fontSize: theme.fontSize.t1,
      lineHeight: theme.lineHeight[36],
      fontWeight: theme.fontWeight.bold,
    },
    '.typo-t2': {
      fontSize: theme.fontSize.t2,
      lineHeight: theme.lineHeight[36],
      fontWeight: theme.fontWeight.bold,
    },
    '.typo-t3': {
      fontSize: theme.fontSize.t3,
      lineHeight: theme.lineHeight[30],
      fontWeight: theme.fontWeight.bold,
    },
    '.typo-t4': {
      fontSize: theme.fontSize.t4,
      lineHeight: theme.lineHeight[30],
      fontWeight: theme.fontWeight.bold,
    },

    /* body */
    '.typo-b1': {
      fontSize: theme.fontSize.b1,
      lineHeight: theme.lineHeight[24],
    },
    '.typo-b2': {
      fontSize: theme.fontSize.b2,
      lineHeight: theme.lineHeight[22],
    },

    /* caption */
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
