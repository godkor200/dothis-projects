import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  textSize?: number;
  bold?: boolean;
  message?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { type = 'text', label, textSize = 14, bold = false, message, ...props },
    ref,
  ) => {
    return (
      <>
        <div
          className="grid items-center"
          style={{ gridTemplateColumns: label ? '8% 92%' : '100%' }}
        >
          {label && (
            <label
              htmlFor="input"
              className="text-grey700 inline-block auto-cols-max text-[14px]"
            >
              {label}
            </label>
          )}
          <div className="flex flex-col">
            <input
              id="input"
              type={type}
              className={clsx(
                'border-grey400 bg-grey00 text-grey900 placeholder:text-grey500 focus:border-primary500 disabled:bg-grey200 rounded-lg border px-6 py-3 focus:outline-none disabled:cursor-not-allowed ',
                `text-[${textSize}px]`,
                bold && 'font-bold',
              )}
              ref={ref}
              {...props}
            />
            {message && (
              <span className="text-grey400 absolute mt-12 inline-block text-[12px]">
                {message}
              </span>
            )}
          </div>
        </div>
      </>
    );
  },
);
InputField.displayName = 'InputField';

export { InputField };
