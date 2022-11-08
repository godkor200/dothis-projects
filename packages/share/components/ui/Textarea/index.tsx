import type { TextareaProps as ChakraTextareaProps } from '@chakra-ui/react';
import { forwardRef, Textarea as ChakraTextarea } from '@chakra-ui/react';
import { css } from '@emotion/react';
import clsx from 'clsx';

import { colors, fontWeights } from '../../../lib/styles/chakraTheme';
import commonStyle from '../../../lib/styles/commonStyle';

export type TextareaProps = ChakraTextareaProps & {
  isInvalid?: boolean;
  theme?: 'white' | 'gray';
};

const Textarea = forwardRef<TextareaProps, 'textarea'>(
  ({ className, isInvalid, theme, ...props }, ref) => {
    return (
      <ChakraTextarea
        ref={ref}
        css={style}
        className={clsx(isInvalid && 'invalid', theme, clsx(className))}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';

const style = css`
  font-size: 16px;
  outline: none;
  padding: 16px;

  font-weight: ${fontWeights.r};
  &.gray {
    ${commonStyle.grayBox};
  }
  &.white {
    ${commonStyle.whiteBox};
  }

  &.invalid {
    border: 1px solid ${colors.primary.default};
    color: ${colors.primary.default};
  }
`;

export default Textarea;
