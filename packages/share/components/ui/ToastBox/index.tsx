import type { CenterProps, UseToastOptions } from '@chakra-ui/react';
import { Box, Center } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { flow } from 'fp-ts/function';
import { pipe } from 'fp-ts/lib/function';
import { uid } from 'uid';

import type { Message } from '../../../lib';
import {
  colors,
  errorMessage,
  fontWeights,
  message,
  shadows,
  standaloneToast,
  successMessage,
} from '../../../lib';
import { Button } from '../Button';
import { SvgClose } from '../Icons';

export type ToastBoxProps = Pick<CenterProps, 'children' | 'className'> & {
  onClose?: () => void;
};

export const ToastBox = ({ onClose, children, ...props }: ToastBoxProps) => (
  <Center css={style} {...props}>
    <div>{children}</div>
    {onClose && (
      <button className="ui_toast-close-button" onClick={onClose}>
        <SvgClose fill={colors.white} />
      </button>
    )}
  </Center>
);

const style = css`
  display: flex;
  justify-content: space-between;
  position: relative;
  min-width: 180px;
  min-height: 54px;
  padding-left: 16px;
  padding-right: 8px;

  color: ${colors.white};
  font-weight: ${fontWeights.b};
  box-shadow: ${shadows.base};

  .ui_toast-close-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;

    svg {
      min-width: 24px;
    }
    svg path {
      fill: ${colors.white};
    }
    width: 40px;
    height: 40px;
  }

  &.success {
    background-color: ${colors.success.default};
  }

  &.error {
    background-color: ${colors.primary.default};
  }

  &.info {
    background-color: ${colors.bg.dark};
    color: ${colors.gray['70']};
    font-weight: ${fontWeights.sb};

    .ui_toast-close-button svg path {
      fill: ${colors.gray['60']};
    }
  }

  &.waring {
  }
`;

ToastBox.getMessageOptions = (
  { status, message }: Omit<Message, 'kind' | '_URI'>,
  overrideOpt?: UseToastOptions,
): UseToastOptions => {
  const id = uid(7);

  return {
    id,
    status,
    position: 'bottom-left',
    render() {
      return (
        <ToastBox
          onClose={
            !overrideOpt?.isClosable
              ? () => standaloneToast.toast.close(id)
              : undefined
          }
          className={status}
        >
          <b>{message}</b>
        </ToastBox>
      );
    },
    icon: (
      <Box minW={24}>
        <SvgClose />
      </Box>
    ),
    ...overrideOpt,
  };
};

ToastBox.toast = flow(
  message,
  ToastBox.getMessageOptions,
  standaloneToast.toast,
);
ToastBox.successToast = (message: string) =>
  pipe(
    successMessage({ message }),
    ToastBox.getMessageOptions,
    standaloneToast.toast,
  );
ToastBox.errorToast = (message: string) =>
  pipe(
    errorMessage({ message }),
    ToastBox.getMessageOptions,
    standaloneToast.toast,
  );
ToastBox.infoToast = (_message: string) =>
  pipe(
    message({ status: 'info', message: _message }),
    ToastBox.getMessageOptions,
    standaloneToast.toast,
  );
