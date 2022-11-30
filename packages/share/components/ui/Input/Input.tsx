import type {
  InputGroupProps,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { Input as ChakraInput, InputGroup, useBoolean } from '@chakra-ui/react';
import { css } from '@emotion/react';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { forwardRef, useEffect, useRef } from 'react';

import { colors, commonStyle, fontWeights, typo } from '../../../lib';

type Size = 'sm' | 'md' | 'lg';
type Theme = 'gray' | 'white';

export type InputProps = ChakraInputProps & {
  isInvalid?: boolean;
  Left?: ReactNode;
  Right?: ReactNode;
  size?: Size;
  theme?: Theme;
  wrapProps?: InputGroupProps;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size = 'md',
      theme = 'gray',
      Left,
      Right,
      wrapProps,
      isInvalid,
      ...props
    },
    ref,
  ) => {
    const [isFocused, { on, off }] = useBoolean();
    const groupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!groupRef.current) return;
      const inputEl = groupRef.current.querySelector('input');

      inputEl?.addEventListener('focusin', on);
      inputEl?.addEventListener('focusout', off);

      return () => {
        groupRef.current?.removeEventListener('focusin', on);
        groupRef.current?.removeEventListener('focusout', off);
      };
    }, [groupRef.current, on, off]);

    return (
      <InputGroup
        css={style}
        className={clsx(
          'ui_input',
          isFocused && 'input-focused',
          isInvalid && '--invalid',
          props.isDisabled && '--disabled',
          theme,
          size,
        )}
        ref={groupRef}
        onClick={(e) => {
          groupRef.current?.querySelector('input')?.focus();
        }}
        {...wrapProps}
      >
        <>
          {Left}
          <ChakraInput className={className} ref={ref} {...props} />
          {Right}
        </>
      </InputGroup>
    );
  },
);

Input.displayName = 'Input';

const style = css`
  input {
    outline: none;
    width: 100%;
    ${typo.t4};
    font-size: 16px;
    font-weight: ${fontWeights.r};

    &::placeholder {
      color: ${colors.gray['60']};
    }
  }

  &.gray {
    ${commonStyle.grayBox};
    border-radius: 12px;

    input {
      background: ${colors.bg.dark};
    }

    &.input-focused {
      filter: brightness(0.95);
    }
  }

  &.white {
    border-radius: 4px;
    border: 1px solid ${colors.border['2']};
    background: ${colors.white};

    &.input-focused {
      border: 1px solid ${colors.border['3']};
    }
  }

  &.sm {
    height: 40px;
    padding-left: 12px;
    padding-right: 12px;
  }

  &.md {
    height: 50px;
    padding-left: 16px;
    padding-right: 16px;
  }

  &.--invalid {
    ${commonStyle.invalidBorderStyle};

    &.input-focused {
      filter: none;
    }
  }

  &.--disabled {
    color: ${colors.gray['30']};

    &:hover,
    &:focus-within {
      filter: none;
    }

    input::placeholder {
      color: ${colors.gray['30']};
    }
  }
`;

export default Input;
