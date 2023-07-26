import type { CSSProp } from 'styled-components';
import styled, { css } from 'styled-components';

const CheckBoxSizeStyles = {
  sm: css`
    width: 1.25rem;
    height: 1.25rem;
  `,
  md: css`
    width: 1.5rem;
    height: 1.5rem;
  `,
};

export type CheckBoxSize = keyof typeof CheckBoxSizeStyles;

interface BaseCheckBoxProps {
  $size: CheckBoxSize;
  $css?: CSSProp;
}

export const CheckBox = styled.input<BaseCheckBoxProps>`
  appearance: none;

  border: 2px solid ${({ theme }) => theme.colors.grey300};

  border-radius: 0.25rem;

  background-color: ${({ theme }) => theme.colors.grey00};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary500};
  }

  &:checked {
    border-color: ${({ theme }) => theme.colors.primary500};

    background: center;
    background-color: ${({ theme }) => theme.colors.primary500};
    background-image: url('/check.svg');
    background-repeat: no-repeat;
  }

  &:disabled {
    border: 2px solid ${({ theme }) => theme.colors.grey400};

    background-color: ${({ theme }) => theme.colors.grey300};
  }

  ${({ $size, $css }) => css`
    ${CheckBoxSizeStyles[$size]}
    ${$css}
  `}
`;
