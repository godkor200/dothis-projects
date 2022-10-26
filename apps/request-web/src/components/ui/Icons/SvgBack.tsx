import type { SVGProps } from 'react';
import * as React from 'react';

import { colors } from '@/styles/chakraTheme/variable';

const SvgBack = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M9.828 12.5427L16.778 19.4927L15.364 20.9067L7 12.5427L15.364 4.17872L16.778 5.59272L9.828 12.5427Z" />
  </svg>
);

export default SvgBack;
