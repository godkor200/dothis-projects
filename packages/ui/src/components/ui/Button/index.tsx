import InputCompound from '@components/ui/Input/compound/index';
import { useBoolean } from '@hooks/useBoolean';
import { polymorphicForwardRefPropsAsIs } from '@utils/reactUtils';
import clsx from 'clsx';
import React, { useEffect, useId, useImperativeHandle, useRef } from 'react';

import styles from './Button.module.css';

type Props = {
  theme: 'transparent' | 'primary' | 'secondary';
  isLoading?: boolean;
  size?: 'small' | 'medium' | 'large';
};

const Button = polymorphicForwardRefPropsAsIs('button')<Props>()(
  ({ size, theme, isLoading, className, children, ...props }, ref) => {
    return (
      <button
        {...props}
        data-theme={theme}
        data-size={size}
        className={clsx(styles.button, className)}
        ref={ref}
      >
        {/* TODO: 로딩 소스 구하면 그걸로 적용시켜야함 */}
        {isLoading ? 'loading' : children}
      </button>
    );
  },
);

export default Button;
