import type { DrawerProps as ChakraDrawerProps } from '@chakra-ui/react';
import {
  Box,
  Drawer as ChakraDrawer,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import type { ReactNode } from 'react';
import React from 'react';

export type DrawerProps = {
  isOpen: boolean;
  onClose(): void;
  children: ReactNode;
} & ChakraDrawerProps;

export function Drawer({ isOpen, onClose, children, ...props }: DrawerProps) {
  return (
    <ChakraDrawer
      placement="right"
      isOpen={isOpen}
      onClose={onClose}
      {...props}
    >
      <Box css={style}>
        <DrawerOverlay className="drawer-overlay" />
        <DrawerContent className="drawer-contents">{children}</DrawerContent>
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
