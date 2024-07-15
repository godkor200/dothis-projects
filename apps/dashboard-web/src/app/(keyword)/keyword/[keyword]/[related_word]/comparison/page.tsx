import Link from 'next/link';
import { usePathname } from 'next/navigation';

import SvgComp from '@/components/common/SvgComp';
import { cn } from '@/utils/cn';

import BoxFrame from '../../../BoxFrame';
import SummaryChart from '../summary/SummaryChart';

const Page = ({
  params,
}: {
  params: { keyword: string; related_word: string };
}) => {
  const baseKeyword = decodeURIComponent(params.keyword);
  const relatedKeyword = decodeURIComponent(params.related_word);

  return (
    <div className="mb-[80px] mt-[20px] flex flex-col gap-[20px]">
      <Link
        href={`/keyword/${baseKeyword}/${relatedKeyword}/comparison`}
        className="text-[20px] font-bold"
      >
        비교
      </Link>

      <div className="grid grid-cols-[minmax(300px,1fr)_minmax(1000px,3fr)] gap-[20px]">
        <BoxFrame>
          <div>
            <p className="text-grey600 mb-[30px] text-[14px] font-[500]">
              {baseKeyword}의 다른 연관 키워드
            </p>
            <ul className="gap-30 flex flex-col py-[25px]">
              {['치킨매니아', '가라아게', '맥도날드'].map(
                (item, index, arr) => {
                  const [blue, green] = arr.filter(
                    (item) => item !== '맥도날드',
                  );

                  return (
                    <li
                      className={cn(
                        'flex  items-center justify-between px-[36px] text-error ',
                        {
                          'text-[#34D399]': green === item,
                          'text-[#818CF8]': blue === item,
                        },
                      )}
                    >
                      <span className="bg-grey200 h-[24px] w-[24px] rounded-[4px] text-center ">
                        {index + 1}
                      </span>
                      <span className="text-[20px] font-bold">{item}</span>
                    </li>
                  );
                },
              )}
            </ul>
          </div>
        </BoxFrame>
        <BoxFrame>
          <div>
            <p className="text-grey600 mb-[30px] text-[14px] font-[500]">
              키워드 분석 결과 비교
            </p>
            <SummaryChart />
          </div>
        </BoxFrame>
      </div>
    </div>
  );
};

export default Page;
