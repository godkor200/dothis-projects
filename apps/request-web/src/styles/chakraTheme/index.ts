import type { ThemeConfig } from '@chakra-ui/react';

import components from './components';
import { breakpoints, colors, fonts, fontSizes, fontWeights, lineHeights, shadows } from './variable';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const chakraTheme = {
  components,
  config,
  breakpoints,
  lineHeights,
  fontWeights,
  fontSizes,
  fonts,
  colors,
  shadows,
};

export default chakraTheme;
