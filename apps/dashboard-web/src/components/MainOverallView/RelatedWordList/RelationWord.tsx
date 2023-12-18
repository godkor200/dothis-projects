import useGetRelWords from '@/hooks/react-query/query/useGetRelWords';
import { cn } from '@/utils/cn';

interface Props {
  keyword: string;
  relword: string;
  index: number;
  arr: {
    relword: string;
    keyword: string;
  }[];
}

const RelationWord = ({ keyword, relword, index, arr }: Props) => {
  // const { data: relword } = useGetRelWords(keyword);

  return (
    <div
      key={relword + index}
      className={cn(
        'grid grid-cols-[minmax(250px,1fr)_140px_110px_110px_100px_100px_minmax(150px,1fr)_minmax(150px,1fr)] items-center gap-[12px] ',
        {
          'shadow-[inset_0_-2px_0_0_#f4f4f5]': index !== arr.length - 1,
        },
      )}
    >
      <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
        {relword}
      </div>
      <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
        {keyword}
      </div>
      <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
        기대 조회 수(배)
      </div>
      <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
        일일 조회 수
      </div>
      <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
        누적 영상 수
      </div>
      <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
        경쟁강도
      </div>
      <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
        구독자 10만 이상 채널
      </div>
      <div className="text-grey700 py-[26px] pl-[8px] text-[14px] font-bold ">
        구독자 수 비슷한 채널
      </div>
    </div>
  );
};

export default RelationWord;
