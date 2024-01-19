import type { PropsWithChildren } from 'react';

interface CardHeaderProps {
  title: string;
}

const CardHeader = ({
  children,
  title,
}: PropsWithChildren<CardHeaderProps>) => {
  return (
    <header className="border-grey300 bg-grey00 border-b border-solid pb-[20px]">
      <h2 className="text-[20px] font-bold">{title}</h2>
      <div>{children}</div>
    </header>
  );
};

export default CardHeader;
