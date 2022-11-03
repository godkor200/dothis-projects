import type { FieldValuesFromFieldErrors } from '@hookform/error-message';
import { ErrorMessage } from '@hookform/error-message';
import type { ComponentProps } from 'react';
import type { FieldName, FieldValues } from 'react-hook-form';

import FormValidMessage from '@/components/ui/FormValidMessage';

type Props<T extends FieldValues> = Pick<ComponentProps<typeof ErrorMessage<T>>,
  'errors'>;

// 모든 에러를 받아서 맨 첫번째 에러를 보여줌
const FormErrorMessages = <TFieldErrors extends FieldValues>({
                                                               errors,
                                                             }: Props<TFieldErrors>) => {
  const firstKey = errors
    ? (Object.keys(errors)[0] as FieldName<FieldValuesFromFieldErrors<TFieldErrors>>)
    : undefined;

  return (
    <>
      {firstKey && (
        <ErrorMessage
          errors={errors}
          name={firstKey}
          render={({ message }) => <FormValidMessage errorMessage={message} />}
        />
      )}
    </>
  );
};
export default FormErrorMessages;
