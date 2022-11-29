import type { SVGProps } from 'react';
import * as React from 'react';

import { colors } from '../../../lib/styles/dothisTheme';

export const SvgHeart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="18"
    height="16"
    viewBox="0 0 18 16"
    xmlns="http://www.w3.org/2000/svg"
    fill={colors.primary['60']}
    {...props}
  >
    <path d="M15.7996 2.16648C14.9162 1.28082 13.7453 0.740262 12.4982 0.642454C11.2511 0.544646 10.0102 0.896034 8.99958 1.63315C7.93929 0.84451 6.61957 0.486905 5.30618 0.632343C3.99279 0.777782 2.78328 1.41546 1.92122 2.41697C1.05917 3.41847 0.608597 4.70941 0.660246 6.02982C0.711895 7.35024 1.26193 8.60204 2.19958 9.53315L7.37458 14.7165C7.80793 15.143 8.39157 15.382 8.99958 15.382C9.60759 15.382 10.1912 15.143 10.6246 14.7165L15.7996 9.53315C16.7726 8.5542 17.3187 7.23004 17.3187 5.84981C17.3187 4.46958 16.7726 3.14542 15.7996 2.16648Z" />
  </svg>
);
