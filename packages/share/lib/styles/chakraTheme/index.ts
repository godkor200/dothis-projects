import type { ThemeConfig } from '@chakra-ui/react';

import components from './components';
import { breakpoints, colors, fonts, fontSizes, fontWeights, lineHeights, shadows } from './variable';

const config: ThemeConfig = {
  initialColorMode: 'light', 
  useSystemColorMode: false,
};

const dothisTheme = {  
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


export * from './variable';
export default dothisTheme;
