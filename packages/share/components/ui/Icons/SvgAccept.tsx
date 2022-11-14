import type { SVGProps } from 'react';
import * as React from 'react';

const SvgAccept = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_3382_4670)">
      <path d="M12.5 22.5427C6.977 22.5427 2.5 18.0657 2.5 12.5427C2.5 7.01972 6.977 2.54272 12.5 2.54272C18.023 2.54272 22.5 7.01972 22.5 12.5427C22.5 18.0657 18.023 22.5427 12.5 22.5427ZM11.503 16.5427L18.573 9.47172L17.159 8.05772L11.503 13.7147L8.674 10.8857L7.26 12.2997L11.503 16.5427Z" />
    </g>
    <defs>
      <clipPath id="clip0_3382_4670">
        <rect width="24" height="24" transform="translate(0.5 0.542725)" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgAccept;
