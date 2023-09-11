import type { PropsWithChildren } from 'react';

interface ContentCardHeaderProps {
  title: string;
}

const ContentCardHeader = ({
  children,
  title,
}: PropsWithChildren<ContentCardHeaderProps>) => {
  return (
    <header className="border-b border-solid border-grey300 bg-grey00 pb-[30px]">
      <h1 className="text-[32px] font-bold">{title}</h1>
      <div>{children}</div>
    </header>
  );
};

export default ContentCardHeader;
