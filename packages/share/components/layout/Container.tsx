import { Box, chakra } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { mediaQueries } from '../../lib/styles/chakraTheme';

const Container = styled(Box)`
  padding: 0 12px;

  ${mediaQueries.tablet} {
    padding: 0 16px;
  }

  ${mediaQueries.pc} {
    padding: initial;
    max-width: 960px;
    margin: 0 auto;
  }
`;

export default Container;
