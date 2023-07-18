'use client';

import { SUMMARY, type SummaryItem } from '@/mocks/chart/summary';

import * as Style from './style';

const Summary = () => {
  return (
    <Style.SummaryList>
      {SUMMARY.map(({ title, content }) => (
        <SummaryItem key={title} title={title} content={content} />
      ))}
    </Style.SummaryList>
  );
};

const SummaryItem = ({ title, content }: SummaryItem) => {
  return (
    <Style.SummaryWrapper>
      <Style.Border>
        <Style.SummaryTitle>{title}</Style.SummaryTitle>
        <Style.Content>{content}</Style.Content>
      </Style.Border>
    </Style.SummaryWrapper>
  );
};

export default Summary;
