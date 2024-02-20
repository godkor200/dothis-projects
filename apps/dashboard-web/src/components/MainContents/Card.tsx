import type { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

interface ContentCardProps extends HTMLAttributes<HTMLDivElement> {
  withoutMargin?: boolean;
}

const Card = ({
  withoutMargin,
  children,
}: StrictPropsWithChildren<ContentCardProps>) => {
  return (
    <div
      className={cn(
        'border-grey400 bg-grey00 mx-[3rem] mb-[30px] rounded-[20px] border border-solid p-[2.5rem]',
        {
          'mx-0': withoutMargin,
        },
      )}
    >
      {children}
    </div>
  );
};

export default Card;
