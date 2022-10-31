// regenerate by running
// npx @chakra-ui/cli tokens path/to/your/theme.(js|ts)
export interface ThemeTypings {
  blur: string & {};
  borders: string & {};
  borderStyles: string & {};
  borderWidths: string & {};
  breakpoints: 'lgMobile' | 'tablet' | 'pc' | (string & {});
  colors:
    | 'white'
    | 'black'
    | 'blue.default'
    | 'primary.10'
    | 'primary.20'
    | 'primary.30'
    | 'primary.40'
    | 'primary.50'
    | 'primary.60'
    | 'primary.70'
    | 'primary.80'
    | 'primary.90'
    | 'primary.99'
    | 'primary.default'
    | 'gray.10'
    | 'gray.20'
    | 'gray.30'
    | 'gray.40'
    | 'gray.50'
    | 'gray.60'
    | 'gray.70'
    | 'gray.80'
    | 'gray.90'
    | 'point.light'
    | 'point.default'
    | 'bg.light'
    | 'bg.dark'
    | 'bg.darkest'
    | 'border.1'
    | 'border.2'
    | 'border.3'
    | 'border.4'
    | 'danger.light'
    | 'danger.default'
    | 'danger.dark'
    | 'success.light'
    | 'success.default'
    | 'success.dark'
    | 'overlay.20'
    | 'overlay.40'
    | (string & {});
  colorSchemes: string & {};
  fonts: 'pt' | (string & {});
  fontSizes:
    | 'h1'
    | 'h2'
    | 'h3'
    | 't1'
    | 't2'
    | 't3'
    | 't4'
    | 'b1'
    | 'b2'
    | 'b3'
    | 'b4'
    | (string & {});
  fontWeights: 'r' | 'm' | 'sb' | 'b' | (string & {});
  layerStyles: string & {};
  letterSpacings: string & {};
  lineHeights: '1' | '2' | (string & {});
  radii: string & {};
  shadows:
    | 'xs'
    | 'sm'
    | 'base'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | 'outline'
    | 'inner'
    | 'none'
    | 'dark-lg'
    | (string & {});
  sizes: string & {};
  space: string & {};
  textStyles: string & {};
  transition: string & {};
  zIndices: string & {};
  components: {
    Divider: {
      sizes: string & {};
      variants: string & {};
    };
    Avatar: {
      sizes: string & {};
      variants: 'square' | (string & {});
    };
    Popover: {
      sizes: string & {};
      variants: string & {};
    };
  };
}
