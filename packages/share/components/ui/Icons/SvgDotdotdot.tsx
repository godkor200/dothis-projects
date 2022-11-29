import type { SVGProps } from 'react';
import * as React from 'react';

export const SvgDotdotdot = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.2128 10.2449V14.33H14.2979V10.2449H10.2128ZM14.2979 17.9044H10.2128V21.9895H14.2979V17.9044Z"
    />
    <path d="M10.2128 2.58528V6.67038H14.2979V2.58528H10.2128Z" />
  </svg>
);
