import { Player } from '@lottiefiles/react-lottie-player';
import { polymorphicForwardRefPropsAsIs } from '@utils/reactUtils';
import clsx from 'clsx';
import React from 'react';

import buttonLoadingLottie from '../../../assets/lottie/button-loading.json';
import styles from './Button.module.css';

type Props = {
  theme: 'transparent' | 'primary' | 'secondary';
  isLoading?: boolean;
  size?: 'small' | 'medium' | 'large';
};

const Button = polymorphicForwardRefPropsAsIs('button')<Props>()(
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
        {/* TODO: 로딩 소스 구하면 그걸로 적용시켜야함 */}
        {isLoading ? (
          <Player src={buttonLoadingLottie} autoplay={true} loop={true} />
        ) : (
          children
        )}
      </button>
    );
  },
);

export default Button;
