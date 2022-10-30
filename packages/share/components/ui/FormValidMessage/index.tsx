import type { BoxProps } from '@chakra-ui/react';
import { Box, Text, TextProps } from '@chakra-ui/react';
import { css } from '@emotion/react';
import clsx from 'clsx';
import { isString } from 'fp-ts/lib/string';
import type { ComponentPropsWithoutRef } from 'react';

import { colors, typo } from '@/styles/chakraTheme/variable';
import { isNil } from '@/utils/common';

type Props = BoxProps & {
  errorMessage?: boolean | string | null;
};
const FormValidMessage = ({
  className,
  errorMessage,
  children,
  ...props
}: Props) => {
  const hasError = isString(errorMessage) ? true : !!errorMessage;
  return (
    <Box
      css={style}
      className={clsx(hasError && 'valid-error', className)}
      {...props}
    >
      {hasError && isString(errorMessage) && (
        <span className="form-valid-error-message">{errorMessage}</span>
      )}
      <span className="form-valid-child-wrap">{children}</span>
    </Box>
  );
};

const style = css`
  display: flex;

  color: ${colors.gray['50']};
  ${typo.b4};

  &.valid-error {
    color: ${colors.primary.default};
  }

  .form-valid-child-wrap {
    margin-left: auto;
  }
`;
export default FormValidMessage;
