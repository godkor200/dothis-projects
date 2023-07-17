import { px2rem } from '../utils/unit';

type ThemeFontSize =
  | 'h1'
  | 'h2'
  | 'h3'
  | 't1'
  | 't2'
  | 't3'
  | 't4'
  | 'b1'
  | 'b2'
  | 'c1'
  | 'c2';

type ThemeFontWeight = 'bold' | 'regular';

export const fontSize: Record<ThemeFontSize, string> = {
  /* heading */
  h1: px2rem(36),
  h2: px2rem(32),
  h3: px2rem(28),

  /* title */
  t1: px2rem(26),
  t2: px2rem(24),
  t3: px2rem(20),
  t4: px2rem(18),

  /* body */
  b1: px2rem(16),
  b2: px2rem(14),

  /* caption */
  c1: px2rem(12),
  c2: px2rem(10),
};

export const fontWeight: Record<ThemeFontWeight, string> = {
  bold: '700',
  regular: '400',
};
