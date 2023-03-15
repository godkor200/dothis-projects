import { polymorphicForwardRefPropsAsIs } from '@utils/reactUtils';
import clsx from 'clsx';
import React from 'react';

type Props = {
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};
const Input = polymorphicForwardRefPropsAsIs('input')<Props>()(
  ({ onEnter, ...props }, ref) => {
    return (
      <input
        {...props}
        className={clsx('w-full bg-transparent', props.className)}
        ref={ref}
        onKeyUp={(e) => {
          props.onKeyUp?.(e);
          if (e.key === 'Enter') onEnter?.(e);
        }}
      />
    );
  },
);

export default Input;
