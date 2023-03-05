import type { ChakraComponent } from '@chakra-ui/react';

import { Box, styled } from '@chakra-ui/react';

export const Container = styled(Box, {
  baseStyle: {
    width: '100%',
    paddingX: {
      base: '12px',
      tablet: '16px',
      pc: 'initial',
    },

    maxW: '960px',
    marginX: 'auto',
  },
}) as ChakraComponent<'div', {}>;
