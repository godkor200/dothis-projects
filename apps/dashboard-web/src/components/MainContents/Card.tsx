import type { HTMLAttributes } from 'react';

interface ContentCardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = ({ children }: StrictPropsWithChildren<ContentCardProps>) => {
  return (
    <div className="border-grey400 bg-grey00 mx-[3rem] mb-[2.25rem] rounded-[20px] border border-solid p-[2.5rem]">
      {children}
    </div>
  );
};

export default Card;
