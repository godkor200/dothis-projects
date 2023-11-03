import type { SVGProps } from 'react';

import { colors } from '../../../styles';

export const SvgAlarmWarning = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    xmlns="http://www.w3.org/2000/svg"
    fill={colors.gray['50']}
    {...props}
  >
    <g clipPath="url(#clip0_2625_3530)">
      <path d="M4.5 20.25V14.25C4.5 12.1283 5.34285 10.0934 6.84315 8.59315C8.34344 7.09285 10.3783 6.25 12.5 6.25C14.6217 6.25 16.6566 7.09285 18.1569 8.59315C19.6571 10.0934 20.5 12.1283 20.5 14.25V20.25H21.5V22.25H3.5V20.25H4.5ZM6.5 14.25H8.5C8.5 13.1891 8.92143 12.1717 9.67157 11.4216C10.4217 10.6714 11.4391 10.25 12.5 10.25V8.25C10.9087 8.25 9.38258 8.88214 8.25736 10.0074C7.13214 11.1326 6.5 12.6587 6.5 14.25ZM11.5 2.25H13.5V5.25H11.5V2.25ZM20.278 5.058L21.692 6.472L19.572 8.593L18.157 7.179L20.278 5.058ZM3.308 6.472L4.722 5.058L6.843 7.178L5.43 8.594L3.308 6.472Z" />
    </g>
    <defs>
      <clipPath id="clip0_2625_3530">
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
