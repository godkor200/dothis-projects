import type { ComponentStyleConfig } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

import { colors } from './variable';

const Divider: ComponentStyleConfig = {
  baseStyle: {
    borderColor: colors.border['2'],
    borderStyle: 'solid',
  },
};
const Avatar: ComponentStyleConfig = {
  parts: ['container', 'excessLabel', 'label'],
  baseStyle: {
    container: {
      backgroundColor: colors.gray['40'],
      borderRadius: '50%',
      overflow: 'hidden',
    },
    excessLabel: {},
    label: {},
  },
  variants: {
    square: {
      container: {
        borderRadius: '33%',
      },
    },
  },
  sizes: {},
};

const Popover: ComponentStyleConfig = {
  parts: ['content', 'header', 'body', 'footer', 'arrow'],
  baseStyle: {
    content: {
      boxShadow: 'none',
    },
  },
};

export default  { Divider, Avatar, Popover };
