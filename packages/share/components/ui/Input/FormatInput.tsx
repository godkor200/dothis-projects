import type { ChangeEvent, ComponentProps, KeyboardEvent } from 'react';
import { forwardRef, useCallback, useMemo } from 'react';

import { removeSeparators, thousandsSeparators } from '../../../lib/utils';
import Input from './index';

const formats = {
  thousandsSeparators: {
    encode: thousandsSeparators,
    decode: removeSeparators,
    filterKeyRegexp: /[0-9]|Backspace|Enter|Tab|ArrowLeft|ArrowRight/,
    filterKey: (v: string) =>
      formats.thousandsSeparators.filterKeyRegexp.test(v),
  },
} as const;

type Props = Omit<ComponentProps<typeof Input>, 'type'> & {
  format: keyof typeof formats;
};

const FormatInput = forwardRef<HTMLInputElement, Props>(
  ({ onChange, onKeyDown, format, ...props }, ref) => {
    const inputFormat = useMemo(() => formats[format], [format]);
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        e.target.ariaValueNow = inputFormat.decode(e.target.value);
        e.target.value = inputFormat.encode(e.target.ariaValueNow);
        onChange?.(e);
      },
      [onChange],
    );
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.metaKey || inputFormat?.filterKey(e.key)) {
          onKeyDown?.(e);
        } else {
          e.preventDefault();
        }
      },
      [onKeyDown],
    );
    return (
      <Input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...props}
        ref={ref}
      />
    );
  },
);

FormatInput.displayName = 'FormatInput';

export default FormatInput;
