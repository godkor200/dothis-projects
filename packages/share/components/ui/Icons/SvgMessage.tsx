import type { SVGProps } from 'react';
import * as React from 'react';

import { colors } from '@/lib/styles/chakraTheme';

const SvgMessage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    stroke={colors.gray['50']}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_2625_3533)">
      <path d="M6.955 19.25L2.5 22.75V4.25C2.5 3.98478 2.60536 3.73043 2.79289 3.54289C2.98043 3.35536 3.23478 3.25 3.5 3.25H21.5C21.7652 3.25 22.0196 3.35536 22.2071 3.54289C22.3946 3.73043 22.5 3.98478 22.5 4.25V18.25C22.5 18.5152 22.3946 18.7696 22.2071 18.9571C22.0196 19.1446 21.7652 19.25 21.5 19.25H6.955ZM7.5 10.25V12.25H9.5V10.25H7.5ZM11.5 10.25V12.25H13.5V10.25H11.5ZM15.5 10.25V12.25H17.5V10.25H15.5Z" />
    </g>
    <defs>
      <clipPath id="clip0_2625_3533">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="translate(0.5 0.25)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default SvgMessage;
