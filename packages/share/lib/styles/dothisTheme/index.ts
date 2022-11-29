import type { ThemeConfig } from '@chakra-ui/react';

import components from './components';
import { breakpoints, colors, fonts, fontSizes, fontWeights, lineHeights, shadows } from './variable';

const config: ThemeConfig = {
  initialColorMode: 'light', 
  useSystemColorMode: false,
};

export const dothisTheme = {  
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



