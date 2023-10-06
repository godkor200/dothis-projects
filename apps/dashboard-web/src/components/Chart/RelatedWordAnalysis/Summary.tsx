import { SUMMARY, type SummaryItem } from '@/mocks/chart/summary';

const Summary = () => {
  return (
    <ul className="flex gap-[22px]">
      {SUMMARY.map(({ title, content }) => (
        <SummaryItem key={title} title={title} content={content} />
      ))}
    </ul>
  );
};

const SummaryItem = ({ title, content }: SummaryItem) => {
  return (
    <li className="w-[18.1rem] grow rounded-8 bg-primary50 py-5">
      <div className="border-l-2 border-primary500 pl-[25px] font-bold">
        <div className="text-[26px] text-primary500">{content}</div>
        <div className="mb-1 text-grey600">{title}</div>
      </div>
    </li>
  );
};

export default Summary;
