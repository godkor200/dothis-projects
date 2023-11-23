import type { ChakraComponent } from '@chakra-ui/react';

import { styled } from '@chakra-ui/react';

const ViewPostRequestContainer = styled('div', {
  baseStyle: {
    paddingX: '16px',
  },
}) as ChakraComponent<'div', {}>;

export default ViewPostRequestContainer;
