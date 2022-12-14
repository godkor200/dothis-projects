import { Box, chakra } from '@chakra-ui/react';

export const Container = chakra(Box, {
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
});