import type { SVGProps } from 'react';
import * as React from 'react';

import { colors } from '@/styles/chakraTheme/variable';

const SvgDelete = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_3382_4738)">
      <path d="M17 4.54272H22V6.54272H20V21.5427C20 21.8079 19.8946 22.0623 19.7071 22.2498C19.5196 22.4374 19.2652 22.5427 19 22.5427H5C4.73478 22.5427 4.48043 22.4374 4.29289 22.2498C4.10536 22.0623 4 21.8079 4 21.5427V6.54272H2V4.54272H7V2.54272H17V4.54272ZM9 9.54272V17.5427H11V9.54272H9ZM13 9.54272V17.5427H15V9.54272H13Z" />
    </g>
    <defs>
      <clipPath id="clip0_3382_4738">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="translate(0 0.542725)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default SvgDelete;
