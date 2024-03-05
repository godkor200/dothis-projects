import { cn } from '@/utils/cn';

interface DailyViewProps {
  hasMarginTop: boolean;
  title: string;
  view: number;
}

const Test = ({ hasMarginTop, title, view }: DailyViewProps) => {
  return (
    <div
      className={cn(
        'rounded-8 border-grey400 bg-grey00 mb-5 flex h-fit justify-between border px-6 py-[12px] font-bold',
        {
          'mt-5': hasMarginTop,
        },
      )}
    >
      <div className="text-grey600">조회수 변동</div>
      <div>
        <span className="text-primary500">
          {new Intl.NumberFormat('ko', {
            notation: 'compact',
          }).format(view)}
          %
        </span>
        {Math.sign(view) === 0 ? '증가' : '감소'}
      </div>
    </div>
  );
};

export default Test;
