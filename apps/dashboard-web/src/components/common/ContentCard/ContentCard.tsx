import type { HTMLAttributes } from 'react';

interface ContentCardProps extends HTMLAttributes<HTMLDivElement> {}

const ContentCard = ({
  children,
}: StrictPropsWithChildren<ContentCardProps>) => {
  return (
    <div className="border-grey300 bg-grey00 mx-[3rem] mb-[2.25rem] rounded-lg border border-solid px-[2.5rem] pt-[2.5rem]">
      {children}
    </div>
  );
};

export default ContentCard;
