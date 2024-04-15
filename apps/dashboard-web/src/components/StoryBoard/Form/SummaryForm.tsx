import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  STORYBOARD_SUMMARY_SCHEMA,
  type StoryBoardSummaryFieldValues,
} from '@/constants/schema/storyboard';
import { useUpdateStoryBoardTitleMutation } from '@/hooks/react-query/mutation/useStoryboardMutation';

import CalendarField from '../Field/CalendarField';
import { InputField } from '../Field/InputField';

interface SummaryFormProps {
  storyBoardId: string;
  defaultValues: StoryBoardSummaryFieldValues;
}

const SummaryForm = ({ storyBoardId, defaultValues }: SummaryFormProps) => {
  const { setValue, register, reset, watch } = useForm({
    resolver: zodResolver(STORYBOARD_SUMMARY_SCHEMA),
    defaultValues: {} as StoryBoardSummaryFieldValues,
  });

  const mutates: Record<
    keyof StoryBoardSummaryFieldValues,
    (value: string) => void
  > = {
    title: useUpdateStoryBoardTitleMutation({
      storyBoardId,
    }).mutate,
    author: (value: string) => {},
    createdDate: (value: string) => {},
    uploadDate: (value: string) => {},
  };

  const update = (
    value: StoryBoardSummaryFieldValues[keyof StoryBoardSummaryFieldValues],
    fieldName: keyof StoryBoardSummaryFieldValues,
  ) => {
    if (defaultValues[fieldName] === value) return;
    mutates[fieldName](value);
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <form className="flex flex-col gap-[30px] px-[30px]">
      <InputField
        {...register('title', {
          required: true,
          onBlur: (e: React.FocusEvent<HTMLInputElement>) =>
            update(e.target.value, 'title'),
        })}
        textSize={32}
        bold
        placeholder="제목"
        maxLength={120}
      />
      <InputField
        {...register('author', {
          required: true,
          onBlur: (e: React.FocusEvent<HTMLInputElement>) =>
            update(e.target.value, 'author'),
        })}
        label="작성자"
        placeholder="작성자를 적어주세요"
        maxLength={120}
      />
      <div className="item-center flex flex-row px-[200px] text-center">
        <div className="flex grow flex-col">
          <CalendarField
            label="작성일자"
            inputProps={{
              ...register('createdDate', {
                required: true,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  update(e.target.value, 'createdDate'),
              }),
              placeholder: '00.00.00',
              readOnly: true,
              maxLength: 8,
            }}
            defaultDate={watch('createdDate')}
            handleSelectDate={(value) => {
              setValue('createdDate', value);
              if (watch('uploadDate') < value) setValue('uploadDate', value);
            }}
          />
        </div>
        <p>&gt;</p>
        <div className="flex grow flex-col">
          <CalendarField
            label="업로드예정일"
            inputProps={{
              ...register('uploadDate', {
                required: true,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  update(e.target.value, 'uploadDate'),
              }),
              placeholder: '00.00.00',
              readOnly: true,
              maxLength: 8,
            }}
            handleSelectDate={(value: string) => {
              setValue('uploadDate', value);
            }}
            defaultDate={watch('uploadDate') ?? watch('createdDate')}
            validAfterDate={watch('createdDate')}
          />
        </div>
      </div>
    </form>
  );
};

export default SummaryForm;
