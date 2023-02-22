import { Center } from '@chakra-ui/react';
import { PartialProps } from '@dothis/share/lib/utils/componentUtils';

import { SvgDotdotdot } from '@/components/ui/Icons';
import { colors } from '@/styles/dothisTheme';

import { ActionMenu } from './ActionMenu';

export const DotDotDotMenu = PartialProps(
  ActionMenu,
  'DotDotDotMenu',
)({
  children: (
    <Center as="div" w={40} h={40}>
      <SvgDotdotdot fill={colors.gray['90']} />
    </Center>
  ),
});
