import type { PropsWithChildren } from 'react';
import React from 'react';

interface SummaryCardProps extends PropsWithChildren {
  title: string;
  marginTop?: 'mt-10' | 'mt-5';
}

const SummaryCard = ({
  children,
  title,
  marginTop = 'mt-10',
}: SummaryCardProps) => {
  return (
    <div
      className={`border-grey300 rounded-8 ${marginTop} border border-solid px-[30px] py-10`}
    >
      <h3 className="text-t2 text-grey700 mb-5 font-bold">{title}</h3>
      {children}
    </div>
  );
};

export default SummaryCard;
