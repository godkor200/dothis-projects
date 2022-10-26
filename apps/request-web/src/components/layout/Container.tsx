import { Box, chakra } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { mediaQueries } from '@/styles/chakraTheme/variable';

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
