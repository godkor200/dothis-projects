import { forwardRef } from 'react';

interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  message?: string;
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, message, ...props }, ref) => {
    return (
      <>
        <div
          className="grid "
          style={{ gridTemplateColumns: label ? '8% 92%' : '100%' }}
        >
          {label && (
            <label
              htmlFor="textarea"
              className="text-grey700 inline-block auto-cols-max text-[14px]"
            >
              {label}
            </label>
          )}
          <div className="flex flex-col">
            <textarea
              id="textarea"
              className={`border-grey400 bg-grey00 text-grey900 placeholder:text-grey500 focus:border-primary500 disabled:bg-grey200 h-40 rounded-lg border border-solid px-6 py-3 text-[14px] focus:outline-none disabled:cursor-not-allowed`}
              ref={ref}
              {...props}
            />
          </div>
        </div>
      </>
    );
  },
);

export { TextAreaField };
