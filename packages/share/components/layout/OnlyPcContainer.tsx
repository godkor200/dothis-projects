import { Box, chakra } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { mediaQueries } from '@/styles/chakraTheme/variable';

const OnlyPcContainer = chakra(Box, {
  baseStyle: {
    width: '100%',

    maxW: '960px',
    marginX: 'auto',
  },
});
export default OnlyPcContainer;
