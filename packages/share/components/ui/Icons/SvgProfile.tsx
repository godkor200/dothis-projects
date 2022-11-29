import type { SVGProps } from 'react';
import * as React from 'react';

import { colors } from '../../../lib/styles';

export const SvgProfile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    stroke={colors.gray['70']}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="10" cy="5" r="3" strokeWidth="2" />
    <path
      d="M4 17C4 14.0833 7.072 12 10 12C12.928 12 16 14.0833 16 17"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
