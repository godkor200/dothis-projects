import type { InputHTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

import styles from './Input.module.css';

type Props = InputHTMLAttributes<HTMLInputElement> & {};
const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <input className={styles.wrap} type="text" required {...props} ref={ref} />
  );
});

Input.displayName = 'Input';
