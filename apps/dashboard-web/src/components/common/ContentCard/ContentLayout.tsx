import type { HTMLAttributes } from 'react';

interface ContentLayoutProps extends HTMLAttributes<HTMLDivElement> {}

const ContentLayout = ({
  children,
}: StrictPropsWithChildren<ContentLayoutProps>) => {
  return (
    <div className="border-grey300 bg-grey00 mx-[3rem] mb-[2.25rem] rounded-lg border border-solid px-[2.5rem] pt-[2.5rem]">
      {children}
    </div>
  );
};

export default ContentLayout;
