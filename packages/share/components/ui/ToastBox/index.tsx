import type { BoxProps, CenterProps, UseToastOptions } from '@chakra-ui/react';
import { Center } from '@chakra-ui/react';
import { css } from '@emotion/react';
import clsx from 'clsx';
import { flow } from 'fp-ts/function';
import { pipe } from 'fp-ts/lib/function';
import { uid } from 'uid';

import SvgClose from '@/components/ui/Icons/SvgClose';
import type { Message } from '@/lib/models';
import { errorMessage, message, standaloneToast, successMessage } from '@/lib/models';
import { colors, fontWeights, shadows } from '@/lib/styles/chakraTheme/variable';

import Button from '../Button';

export type ToastBoxProps = Pick<CenterProps, 'children' | 'className'> & {
  onClose?: () => void;
};

const ToastBox = ({ onClose, children, ...props }: ToastBoxProps) => (
  <Center css={style} {...props}>
    <div>{children}</div>
    {onClose && (
      <Button className="ui_toast-close-button" onClick={onClose}>
        <SvgClose fill={colors.white} />
      </Button>
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

    .ui_toast-close-button {
      path {
        fill: ${colors.gray['60']};
      }

      width: 40px;
      height: 40px;
    }
  }
  &.waring {
  }

  .ui_toast-close-button {
    width: 40px;
    height: 40px;
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
          onClose={!overrideOpt?.isClosable ? () => standaloneToast.toast.close(id) : undefined}
          className={status}
        >
          <b>{message}</b>
        </ToastBox>
      );
    },
    ...overrideOpt,
  };
};

ToastBox.toast = flow(message, ToastBox.getMessageOptions, standaloneToast.toast);
ToastBox.successToast = (message: string) =>
  pipe(successMessage({ message }), ToastBox.getMessageOptions, standaloneToast.toast);
ToastBox.errorToast = (message: string) =>
  pipe(errorMessage({ message }), ToastBox.getMessageOptions, standaloneToast.toast);
ToastBox.infoToast = (_message: string) =>
  pipe(
    message({ status: 'info', message: _message }),
    ToastBox.getMessageOptions,
    standaloneToast.toast,
  );

export default ToastBox;
