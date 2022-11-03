import { Box, chakra } from '@chakra-ui/react';

const Container = chakra(Box, {
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
export default Container;
