import type { ChakraComponent } from '@chakra-ui/react';
import { Box, styled } from '@chakra-ui/react';

const OnlyPcContainer = styled(Box, {
  baseStyle: {
    width: '100%',

    maxW: '960px',
    marginX: 'auto',
  },
}) as ChakraComponent<'div', {}>;
export default OnlyPcContainer;
