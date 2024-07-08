import { cn } from '@/utils/cn';

import type { MediaDigestData } from '.';

interface Props
  extends Pick<MediaDigestData, 'provider' | 'element' | 'uploadDate'> {
  profile?: string;
  isList?: boolean;
}

const MediaDigestSummary = ({
  provider,
  element,
  uploadDate,
  isList,
}: Props) => {
  return (
    <div
      className={cn('flex items-center gap-[0.5rem] ', {
        // 'mb-[30px]': !isList,
      })}
    >
      {provider && (
        <span
          className={cn(
            'text-grey500 font-semibold max-w-[60px] whitespace-nowrap overflow-hidden text-ellipsis text-[12px]',
            {
              'text-[10px]': isList,
            },
          )}
        >
          {provider}
        </span>
      )}
      {provider && <div className="bg-grey400 h-4 w-[1px]" />}
      <span
        className={cn(
          'text-grey600 font-semibold  whitespace-nowrap overflow-hidden text-ellipsis text-[12px]',
          {
            'text-[10px]': isList,
          },
        )}
      >
        {element}
      </span>

      {provider && <div className="bg-grey400 h-4 w-[1px]" />}
      <span
        className={cn(
          'text-grey500 font-semibold  whitespace-nowrap overflow-hidden text-ellipsis text-[12px]',
          {
            'text-[10px]': isList,
          },
        )}
      >
        {uploadDate}
      </span>
    </div>
  );
};

export default MediaDigestSummary;
