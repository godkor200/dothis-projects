import type { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

interface ArticleInfoProps {
  profile?: string;
  secondText: string;
  thirdText: string;
  date: string;
  isList?: boolean;
}

const ArticleInfo = ({
  secondText,
  thirdText,
  date,
  isList,
}: ArticleInfoProps) => {
  return (
    <div
      className={cn('flex items-center gap-[0.5rem] ', {
        'mb-[30px]': !isList,
      })}
    >
      {secondText && (
        <span
          className={cn(
            'text-grey500 font-semibold max-w-[100px] whitespace-nowrap overflow-hidden text-ellipsis',
            {
              'text-[0.75rem]': isList,
            },
          )}
        >
          {secondText}
        </span>
      )}
      {secondText && <div className="bg-grey400 h-4 w-[1px]" />}
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

export default ArticleInfo;
