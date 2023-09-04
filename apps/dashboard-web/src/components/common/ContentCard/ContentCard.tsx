import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

interface ContentCardProps extends HTMLAttributes<HTMLDivElement> {}

const ContentCard = ({
  children,
  className,
}: StrictPropsWithChildren<ContentCardProps>) => {
  return (
    <div
      className={clsx(
        `pt-[2.5rem] px-[2.5rem] mx-[3rem] bg-grey00 border border-solid border-grey300 rounded-lg`,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ContentCard;
