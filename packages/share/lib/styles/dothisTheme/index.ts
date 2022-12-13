import type { ThemeConfig } from '@chakra-ui/react';

import { Avatar, Divider, Popover } from './components';
import { breakpoints, colors, fonts, fontSizes, fontWeights, lineHeights, shadows } from './variable';

const config: ThemeConfig = {
  initialColorMode: 'light', 
  useSystemColorMode: false,
};

const components = {
  Divider,
  Avatar,
  Popover
}

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


export default dothisTheme


