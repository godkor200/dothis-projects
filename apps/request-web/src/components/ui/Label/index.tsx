import type { ChakraComponent } from '@chakra-ui/react';
import { styled } from '@chakra-ui/react';

import { colors, fontWeights, typo } from '@/styles/dothisTheme';

export const Label: ChakraComponent<'label', {}> = styled('label', {
  color: colors.gray['70'],
  fontWeight: fontWeights.b,
  ...typo.t4,
});
