import clsx from 'clsx';
import { forwardRef, PropsWithChildren } from 'react';

import styles from './button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button Style Type (primary, outlined,taxted )
   */
  theme: 'primary' | 'outlined' | 'contained';
  /**
   * Button 비활성화 유무
   */
  disabled?: boolean;
  /**
   * Button 사이즈 (S,M,L)
   */
  size: 'S' | 'M' | 'L';
  /**
   * Button 좌우패딩 커스터마이징
   */
  paddingX?: string;
}

/**
 * Primary UI component for user interaction
 */

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  (
    {
      theme = 'primary',
      size = 'S',
      disabled = false,

      paddingX,
      children,
      ...props
    },
    ref,
  ) => {
    const rootClassName = clsx(
      styles.root,
      styles[theme],
      styles[size],

      {
        [paddingX!]: paddingX,
      },
    );

    return (
      <button
        type="button"
        className={rootClassName}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

export { Button };
