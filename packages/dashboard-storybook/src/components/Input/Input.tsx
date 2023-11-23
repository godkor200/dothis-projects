import { forwardRef, InputHTMLAttributes } from 'react';

import styles from './input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Input 컴포넌트 상단 영역에 요소가 추가됩니다. */
  label?: string;
  /** Input 컴포넌트 하단 영역에 요소가 추가됩니다. */
  description?: string;
  /** disabled 상태가 됩니다. */
  disabled?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', label, description, disabled, ...props }, ref) => {
    return (
      <>
        {label && (
          <label htmlFor="input" className={styles.label}>
            {label}
          </label>
        )}
        <input
          id="input"
          type={type}
          className={styles.input}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        {description && (
          <span className={styles.description}>{description}</span>
        )}
      </>
    );
  },
);
Input.displayName = 'Input';

export { Input };
