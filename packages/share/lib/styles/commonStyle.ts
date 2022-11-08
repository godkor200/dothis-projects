import { css } from '@emotion/react';

import { colors } from './chakraTheme';

const commonStyle = {
  grayBox: css`
    background: ${colors.bg.dark};
    border: 0 none;
    border-radius: 12px;
    transition: 0.15s filter;

    &:hover,
    &:focus-within {
      filter: brightness(0.95);
    }

    &.disabled {
      &:hover,
      &:focus-within {
        filter: none;
      }
    }
  `,
  whiteBox: css`
    background: ${colors.white};
    border: 1px solid ${colors.border['2']};
    border-radius: 12px;
    transition: 0.15s border-color;

    &:hover,
    &:focus-within {
      border-color: ${colors.border['4']};
    }

    &.disabled {
      background: ${colors.bg.dark};
    }

    &.disabled {
      &:hover,
      &:focus-within {
        border-color: ${colors.border['1']};
      }
    }
  `,
  scrollBarHidden: css`
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */

    ::-webkit-scrollbar {
      display: none;
    }
  `,
  invalidBorderStyle: css`
    border: 1px solid ${colors.primary.default};
    color: ${colors.primary.default};
  `,
};

export default commonStyle;
