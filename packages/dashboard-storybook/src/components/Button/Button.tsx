import clsx from 'clsx';
import { forwardRef, PropsWithChildren } from 'react';

import styles from './button.module.css';

interface ButtonProps {
  /**
   Button Style Type (primary, outlined,taxted )
   */
  theme: 'primary' | 'outlined' | 'contained';
  /**
   Button 비활성화 유무
   */
  disabled?: boolean;
  /**
   Button 사이즈 (S,M,L)
   */
  size: 'S' | 'M' | 'L';
}

/**
 * Primary UI component for user interaction
 */

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  (
    { theme = 'primary', size = 'S', disabled = false, children, ...props },
    ref,
  ) => {
    const rootClassName = clsx(styles.root, styles[theme], styles[size]);

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
