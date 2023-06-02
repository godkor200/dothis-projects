import { Player } from '@lottiefiles/react-lottie-player';
import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ComponentRef } from 'react';
import React, { forwardRef } from 'react';

import buttonLoadingLottie from '../../../assets/lottie/button-loading.json';
import styles from './Button.module.css';

type Props = {
  theme: 'transparent' | 'primary' | 'secondary';
  isLoading?: boolean;
  size?: 'small' | 'medium' | 'large';
} & ComponentPropsWithoutRef<'button'>;

type Ref = ComponentRef<'button'>;

const Button = forwardRef<Ref, Props>(
  (
    { size, theme, isLoading, className, children, disabled, ...props },
    ref,
  ) => {
    return (
      <button
        {...props}
        data-theme={theme}
        data-size={size}
        disabled={isLoading || disabled}
        className={clsx(styles.button, className)}
        ref={ref}
      >
        {isLoading ? (
          <Player src={buttonLoadingLottie} autoplay loop />
        ) : (
          children
        )}
      </button>
    );
  },
);

export default Button;
