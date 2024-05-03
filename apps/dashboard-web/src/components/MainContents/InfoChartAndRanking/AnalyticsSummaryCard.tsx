import { cn } from '@/utils/cn';

interface Props {
  title: string;
  view: number;
  unit?: string;
}

const AnalyticsSummaryCard = ({ title, view, unit }: Props) => {
  return (
    <div
      className={cn(
        'rounded-8 border-grey400 bg-grey00 mb-5 flex h-fit justify-between border px-6 py-[12px] font-bold',
      )}
    >
      <div className="text-grey600">{title}</div>
      <div>
        <span className="text-primary500">
          {new Intl.NumberFormat('ko', {
            notation: 'compact',
          }).format(view)}
          {unit}
        </span>
        {Math.sign(view) === 0 ? '증가' : '감소'}
      </div>
    </div>
  );
};

export default AnalyticsSummaryCard;
