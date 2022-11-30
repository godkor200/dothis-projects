import type { ModalProps as ChakraModalProps } from '@chakra-ui/react';
import {
  Box,
  Modal as ChakraModal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { css } from '@emotion/css';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import { colors, commonStyle, mediaQueries } from '../../../lib';
import { ModalTitle } from '../ModalTitle';

export type ModalProps = Required<
  Pick<ChakraModalProps, 'isOpen' | 'children' | 'onClose'>
> & {
  title?: ReactNode;
  trapFocus?: ChakraModalProps['trapFocus'];
  closeOnOverlayClick?: ChakraModalProps['closeOnOverlayClick'];
  hiddenOnMobile?: boolean;
  isFull?: boolean;
  zIndex?: number
};

export const Modal = ({
  title,
  children,
  onClose,
  closeOnOverlayClick = true,
  hiddenOnMobile = false,
  isFull,
  zIndex = 1000,
  ...modalProps
}: ModalProps) => {
  return (
    <ChakraModal
      onClose={onClose}
      closeOnOverlayClick={closeOnOverlayClick}
      aria-labelledby={title}
      motionPreset={'slideInBottom'}
      {...modalProps}
    >
      <Box className={style}>
        <ModalOverlay className="modal-overlay" />
        <ModalContent
          className={clsx('modal-contents', isFull && 'full')}
          zIndex={zIndex}
        >
          {title && (
            <ModalTitle onClose={onClose} hiddenOnMobile={hiddenOnMobile}>
              {title}
            </ModalTitle>
          )}
          <ModalBody className="modal-body">{children}</ModalBody>
        </ModalContent>
      </Box>
    </ChakraModal>
  );
};

const style = css`
  display: flex;
  flex-direction: column;

  overflow: hidden;
  -webkit-overflow-scrolling: touch;

  .modal-overlay {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: ${colors.overlay['20']};

    z-index: var(--chakra-zIndices-modal);
  }

  .chakra-modal__content-container {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    z-index: var(--chakra-zIndices-modal);
  }

  .modal-contents {
    position: fixed;
    display: flex;
    flex-direction: column;
    width: auto;
    max-height: 100%;

    &.full {
      height: 100%;
    }

    ${mediaQueries.tablet} {
      overflow: hidden;
      border-radius: 12px;
      bottom: initial;
      max-height: 88%;

      &.full {
        height: 88%;
      }
    }

    .modal-body {
      display: flex;
      flex-direction: column;
      position: relative;
      flex: auto;
      overflow: auto;
      background: ${colors.white};
    }

    .modal-body > *:first-child {
      position: relative;
      display: flex;
      flex-direction: column;
      ${commonStyle.scrollBarHidden};
      -webkit-overflow-scrolling: touch;
      min-width: 100vw;
      max-width: 100vw;
      flex: auto;

      ${mediaQueries.tablet} {
        min-width: auto;
        max-width: 724px;
      }

      ${mediaQueries.pc} {
        max-width: 968px;
      }

      footer {
        border-top: 1px solid ${colors.border['2']};
      }
    }
  }
`;