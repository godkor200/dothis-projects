import { Center } from '@chakra-ui/react';

import { colors, PartialProps } from '../../../lib';
import { SvgDotdotdot } from '../Icons';
import { ActionMenu } from './ActionMenu';

export const DotDotDotMenu = PartialProps(ActionMenu)({
  children: (
    <Center as="div" w={40} h={40}>
      <SvgDotdotdot fill={colors.gray['90']} />
    </Center>
  ),
});
