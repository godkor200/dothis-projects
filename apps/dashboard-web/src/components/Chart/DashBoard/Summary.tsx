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
    <li className="grow w-[18.1rem] py-5 rounded-8 bg-primary50">
      <div className="pl-[25px] border-l-2 border-primary500 font-bold">
        <div className="text-[26px] text-primary500">{content}</div>
        <div className="mb-1 text-grey600">{title}</div>
      </div>
    </li>
  );
};

export default Summary;
