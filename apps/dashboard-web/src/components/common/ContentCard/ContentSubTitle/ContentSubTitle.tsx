import type { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

interface ContentSubTitleProps {
  profile?: string;
  secondText: string;
  thirdText: string;
  date: string;
  isList?: boolean;
}

const ContentSubTitle = ({
  secondText,
  thirdText,
  date,
  isList,
}: ContentSubTitleProps) => {
  return (
    <div
      className={cn('flex items-center gap-[0.5rem] ', {
        'mb-10': !isList,
      })}
    >
      <span
        className={cn('text-grey500 font-semibold', {
          'text-[0.75rem]': isList,
        })}
      >
        {secondText}
      </span>
      <div className="bg-grey400 h-4 w-[1px]" />
      <span
        className={cn('text-grey600 font-semibold', {
          'text-[0.75rem]': isList,
        })}
      >
        {thirdText}
      </span>
      <div className="bg-grey400 h-4 w-[1px]" />
      <span
        className={cn('text-grey500 font-semibold', {
          'text-[0.75rem]': isList,
        })}
      >
        {date}
      </span>
    </div>
  );
};

export default ContentSubTitle;
