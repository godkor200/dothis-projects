'use client';

import { ThemeProvider } from 'styled-components';

import theme from './theme';

const StyledTheme = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default StyledTheme;
