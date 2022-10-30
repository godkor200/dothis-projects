import type { ButtonProps } from '@chakra-ui/react';
import { Button as ChakraButton, forwardRef } from '@chakra-ui/react';
import { css } from '@emotion/react';
import clsx from 'clsx';

import { colors, fontWeights } from '@/styles/chakraTheme/variable';

type ButtonThemes = 'primary' | 'primaryOutline' | 'white';

type Props = ButtonProps & {
  theme?: ButtonThemes;
  size?: 'sm' | 'md';
  round?: boolean;
};
const Button = forwardRef<Props, 'button'>(
  ({ className, theme, size = 'md', round, ...props }, ref) => {
    return (
      <ChakraButton
        type="button"
        css={style}
        ref={ref}
        className={clsx(theme, size, className, round && 'round')}
        fontSize={size === 'sm' ? 12 : 14}
        fontWeight={fontWeights.b}
        onClick={props?.disabled ? undefined : props?.onClick}
        tabIndex={props?.disabled ? -1 : 0}
        {...props}
      />
    );
  },
);

const style = css`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.1s all;

  &.md {
    &.round {
      border-radius: 12px;
    }
  }

  &.sm {
    min-height: 24px;
    font-size: 12px;

    &.round {
      border-radius: 6px;
    }
  }

  &.primary {
    background-color: ${colors.primary.default};
    color: ${colors.white};
  }

  &.primaryOutline {
    border: 1px solid ${colors.primary['50']};
    color: ${colors.primary.default};
  }

  &.white {
    border: 1px solid ${colors.border['2']};
  }

  &:hover,
  &:focus-visible {
    filter: brightness(0.95);
  }

  &:focus-visible {
    outline: 1px auto ${colors.primary.default};
  }

  &:active {
    transform: translateY(1.5px);
    filter: brightness(0.87);
  }

  &.white:disabled,
  &.primary:disabled,
  &.gray:disabled {
    background: ${colors.gray['20']};
    > * {
      filter: grayscale(1) opacity(0.3);
    }
  }
  &:disabled {
    cursor: default;

    &:hover,
    &:focus-visible,
    &:active {
      transform: none;
      filter: none;
      //filter: grayscale(1) opacity(0.5);
    }
  }
`;

export default Button;
