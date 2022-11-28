import { css } from '@emotion/react';

import { colors } from './chakraTheme';

const globalStyle = css`

  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    font-display: swap;
    src: local('Pretendard Bold'),
      url('/fonts/Pretendard-Bold.woff2') format('woff2'),
      url('/fonts/Pretendard-Bold.woff') format('woff'),
      url('/fonts/Pretendard-Bold.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    font-display: swap;
    src: local('Pretendard SemiBold'),
      url('/fonts/Pretendard-SemiBold.woff2') format('woff2'),
      url('/fonts/Pretendard-SemiBold.woff') format('woff'),
      url('/fonts/Pretendard-SemiBold.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    font-display: swap;
    src: local('Pretendard Medium'),
      url('/fonts/Pretendard-Medium.woff2') format('woff2'),
      url('/fonts/Pretendard-Medium.woff') format('woff'),
      url('/fonts/Pretendard-Medium.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-display: swap;
    src: local('Pretendard Regular'),
      url('/fonts/Pretendard-Regular.woff2') format('woff2'),
      url('/fonts/Pretendard-Regular.woff') format('woff'),
      url('/fonts/Pretendard-Regular.ttf') format('truetype');
  }
  

  *,
  *::before,
  *::after {
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
      Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
      'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', sans-serif;
    box-sizing: border-box;
  }

  html,
  body,
  #__next {
    padding: 0;
    margin: 0;
    min-height: 100vh;
  }

  #__next {
    display: flex;
    flex-direction: column;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  li {
    list-style-type: none;
  }

  .chakra-modal__overlay {
    background: ${colors.overlay['20']};
  }

  :focus-visible {
    outline: ${colors.primary.default} auto 1px;
    outline-offset: 1px;
  }
  mark {
    background: transparent;
    color: ${colors.blue.default};
    font-weight: bold;
  }

  .tox-tinymce-aux {
    z-index: 2000 !important;
  }
`;

export default globalStyle;
