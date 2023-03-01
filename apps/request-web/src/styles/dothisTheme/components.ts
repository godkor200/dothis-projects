import type { ComponentStyleConfig } from '@chakra-ui/react';

import { colors } from '@/styles/dothisTheme/variable';

export const Divider: ComponentStyleConfig = {
  baseStyle: {
    borderColor: colors.border['2'],
    borderStyle: 'solid',
  },
};
export const Avatar: ComponentStyleConfig = {
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

export const Popover: ComponentStyleConfig = {
  parts: ['content', 'header', 'body', 'footer', 'arrow'],
  baseStyle: {
    content: {
      boxShadow: 'none',
    },
  },
};
