import type { TagProps as ChakraTagProps } from '@chakra-ui/react';
import { Tag as ChakraTag } from '@chakra-ui/react';
import { css } from '@emotion/react';
import clsx from 'clsx';

import { colors, typo } from '../../../lib/styles/chakraTheme';

export type TagTheme = 'orange' | 'red' | 'purple' | 'green' | 'gray';
type Props = ChakraTagProps & { theme?: TagTheme };
const Tag = ({ className, theme = 'orange', ...props }: Props) => (
  <ChakraTag className={clsx(theme, className)} css={tagStyle} {...props} />
);

const tagStyle = css`
  padding: 3px 6px;
  border-radius: 3px;
  ${typo.t4};

  &.orange {
    background-color: ${colors.danger.light};
    color: #ff4f17;
  }

  &.red {
    background-color: ${colors.primary['10']};
    color: #ec1b36;
  }

  &.purple {
    background-color: ${colors.danger.light};
    color: #9747ff;
  }
  &.green {
    background-color: ${colors.success.light};
    color: #15b084;
  }
  &.gray {
    background-color: ${colors.bg.dark};
    color: ${colors.gray['60']};
  }
`;

export default Tag;
