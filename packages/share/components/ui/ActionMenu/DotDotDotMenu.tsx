import { Center } from '@chakra-ui/react';

import ActionMenu from '../../../components/ui/ActionMenu/index';
import SvgDotdotdot from '../../../components/ui/Icons/SvgDotdotdot';
import { colors } from '../../../lib/styles/chakraTheme';
import { PartialProps } from '../../../lib/utils';

const DotDotDotMenu = PartialProps(ActionMenu)({
  children: (
    <Center as="div" w={40} h={40}>
      <SvgDotdotdot fill={colors.gray['90']} />
    </Center>
  ),
});

export default DotDotDotMenu;
