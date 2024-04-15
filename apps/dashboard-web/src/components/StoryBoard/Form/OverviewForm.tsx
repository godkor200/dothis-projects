import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  STORYBOARD_OVERVIEW_SCHEMA,
  type StoryBoardOverviewFieldValues,
} from '@/constants/schema/storyboard';

import { InputField } from '../Field/InputField';
import { TextAreaField } from '../Field/TextareaField';

interface OverviewFormProps {
  storyBoardId: string;
  defaultValues: StoryBoardOverviewFieldValues;
  hidden?: boolean;
}

const OverviewForm = ({
  storyBoardId,
  defaultValues,
  hidden = false,
}: OverviewFormProps) => {
  const { register, reset } = useForm({
    resolver: zodResolver(STORYBOARD_OVERVIEW_SCHEMA),
    defaultValues: {} as StoryBoardOverviewFieldValues,
  });

  const mutates: Record<
    keyof StoryBoardOverviewFieldValues,
    (value: string) => void
  > = {
    actors: (value: string) => {
      storyBoardId;
    },
    location: (value: string) => {},
    description: (value: string) => {},
  };

  const update = (
    value: StoryBoardOverviewFieldValues[keyof StoryBoardOverviewFieldValues],
    fieldName: keyof StoryBoardOverviewFieldValues,
  ) => {
    if (defaultValues[fieldName] === value) return;
    mutates[fieldName](value);
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <form
      className={`flex flex-col gap-[10px] px-[30px] ${hidden ? 'hidden' : ''}`}
    >
      <InputField
        {...register('actors', {
          onBlur: (e: React.FocusEvent<HTMLInputElement>) =>
            update(e.target.value, 'actors'),
        })}
        label="출연진"
        placeholder="출연진을 적어주세요"
        maxLength={120}
      />
      <InputField
        {...register('location', {
          onBlur: (e: React.FocusEvent<HTMLInputElement>) =>
            update(e.target.value, 'location'),
        })}
        label="장소"
        placeholder="장소을 적어주세요"
        maxLength={5000}
      />
      <TextAreaField
        {...register('description', {
          onBlur: (e: React.FocusEvent<HTMLInputElement>) =>
            update(e.target.value, 'description'),
        })}
        label="설명"
        placeholder="설명을 적어주세요"
        maxLength={5000}
      />
    </form>
  );
};

export default OverviewForm;
