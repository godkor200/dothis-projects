import type { SVGProps } from 'react';
import * as React from 'react';

import { colors } from '../../../lib/styles';

export const SvgThumbDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill={colors.gray['50']}
    {...props}
  >
    <g clipPath="url(#clip0_3269_5520)">
      <path d="M18.3333 12.5L15.8333 12.5L15.8333 2.5L18.3333 2.5C18.5543 2.5 18.7663 2.5878 18.9226 2.74408C19.0789 2.90036 19.1667 3.11232 19.1667 3.33333L19.1667 11.6667C19.1667 11.8877 19.0789 12.0996 18.9226 12.2559C18.7663 12.4122 18.5543 12.5 18.3333 12.5ZM13.9225 13.5775L8.58917 18.9108C8.51828 18.9819 8.42412 19.025 8.32398 19.0322C8.22385 19.0394 8.12449 19.0102 8.04417 18.95L7.33333 18.4167C7.13592 18.2685 6.9868 18.0651 6.90479 17.8323C6.82278 17.5995 6.81154 17.3475 6.8725 17.1083L7.83333 13.3333L2.5 13.3333C2.05797 13.3333 1.63405 13.1577 1.32149 12.8452C1.00893 12.5326 0.833334 12.1087 0.833335 11.6667L0.833335 9.91333C0.83311 9.69553 0.875577 9.4798 0.958334 9.27833L3.5375 3.01583C3.60042 2.86315 3.70728 2.73261 3.84452 2.64076C3.98176 2.54892 4.1432 2.49993 4.30834 2.5L13.3333 2.5C13.5543 2.5 13.7663 2.5878 13.9226 2.74408C14.0789 2.90036 14.1667 3.11232 14.1667 3.33333L14.1667 12.9883C14.1666 13.2093 14.0788 13.4213 13.9225 13.5775Z" />
    </g>
    <defs>
      <clipPath id="clip0_3269_5520">
        <rect
          width="20"
          height="20"
          fill="white"
          transform="translate(20 20) rotate(-180)"
        />
      </clipPath>
    </defs>
  </svg>
);
