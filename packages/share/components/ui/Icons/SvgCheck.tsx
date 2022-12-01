import type { SVGProps } from 'react';


import { colors } from '../../../lib/styles/dothisTheme';

export const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill={colors.white}
    {...props}
  >
    <path d="M10 15.172L19.192 5.979L20.607 7.393L10 18L3.636 11.636L5.05 10.222L10 15.172Z" />
  </svg>
);
