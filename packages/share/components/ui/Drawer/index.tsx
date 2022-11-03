import type { DrawerProps } from '@chakra-ui/react';
import { Box, Drawer as ChakraDrawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import { css } from '@emotion/react';
import type { ReactNode } from 'react';
import React from 'react';

type Props = {
  isOpen: boolean;
  onClose(): void;
  children: ReactNode;
} & DrawerProps;

export default function Drawer({ isOpen, onClose, children, ...props }: Props) {
  return (
    <ChakraDrawer
      placement='right'
      isOpen={isOpen}
      onClose={onClose}
      {...props}
    >
      <Box css={style}>
        <DrawerOverlay className='drawer-overlay' />
        <DrawerContent className='drawer-contents'>{children}</DrawerContent>
      </Box>
    </ChakraDrawer>
  );
}
const style = css`
  .drawer-overlay {
    z-index: var(--chakra-zIndices-overlay);
  }

  .chakra-modal__content-container {
    z-index: var(--chakra-zIndices-modal);
  }

  .drawer-contents {
    width: auto !important;
    height: auto !important;
  }
`;
