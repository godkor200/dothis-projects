import { Button as DesignButton } from 'dashboard-storybook/src/components/Button/Button';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import GNBSearchbar from '@/app/(keyword)/GNBSearchbar';
import type { TrendingQuery } from '@/app/(main)/(searchGNB)/trending/TrendingQueryContext';
import SvgComp from '@/components/common/SvgComp';
import { Button } from '@/components/MainContents/KeywordSearch/style';
import SearchBar from '@/components/Trending/TrendingFilter/SearchBar';

import MultiSelector from './TrendingFilter/MultiSelector';
import WeekDateSlider from './TrendingFilter/WeekDateSlider';

dayjs.extend(isSameOrAfter);

interface Props {
  selectOptions: { value: number; label: string }[];
  setSelectOptions: React.Dispatch<
    React.SetStateAction<{ value: number; label: string }[]>
  >;
  keywordList: string[];
  setKeywordList: React.Dispatch<React.SetStateAction<string[]>>;
  startDate: Dayjs;
  setStartDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  setTrendingQueryOption: React.Dispatch<React.SetStateAction<TrendingQuery>>;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const TrendingFilter = ({
  selectOptions,
  setSelectOptions,
  keywordList,
  setKeywordList,
  startDate,
  setStartDate,
  setTrendingQueryOption,
  setOpenFilter,
}: Props) => {
  const handleDeleteKeyword = (keyword: string) => {
    setKeywordList((prev) => prev.filter((item) => item !== keyword));
  };

  const handleSetKeywordList = (keyword: string) => {
    setKeywordList((prev) =>
      prev.indexOf(keyword) !== -1 ? prev : [...prev, keyword],
    );
  };

  return (
    <div
      className="bg-grey00 border-l-1 border-grey400 fixed inset-y-0 right-0  z-[200] w-[465px]  px-[26px]
    pt-[80px]"
    >
      <p className="text-grey600 mb-[20px] font-bold">검색 키워드 </p>

      <SearchBar setKeywordList={handleSetKeywordList} />
      {/* <GNBSearchbar /> */}
      {/* 자동완성 api 테스트 가능할 때 변경 예정 */}

      <p className="text-grey600 mb-[20px] mt-[80px] font-bold">검색 키워드</p>

      <div className="flex flex-wrap gap-[10px]">
        {keywordList.map((item) => (
          <Button key={item} $active={true}>
            {item.replace('#', '').replace('*', '')}

            <div className="group/remove">
              <SvgComp
                icon="KeywordDelete"
                size="1rem"
                className="group-hover/remove:[&_path]:stroke-white"
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteKeyword(item);
                }}
              />
            </div>
            {/* 여기서 X버튼으로 delete시 modal을 하나 생성하고 지우는게 좋을 듯 싶다. */}
          </Button>
        ))}
      </div>
      <p className="text-grey600 mb-[20px] mt-[80px] font-bold">
        분석 기간 선택
      </p>
      <WeekDateSlider startDate={startDate} setStartDate={setStartDate} />

      <p className="text-grey600 mb-[20px] mt-[80px]  font-bold  ">카테고리 </p>
      <MultiSelector
        selectOptions={selectOptions}
        setSelectOptions={setSelectOptions}
      />

      <div className="mt-[80px] flex justify-center gap-[40px]">
        <DesignButton
          size="L"
          theme="contained"
          onClick={() => {
            setTrendingQueryOption({ keywordList, selectOptions, startDate });
          }}
        >
          적용
        </DesignButton>
        <DesignButton
          size="L"
          theme="outlined"
          onClick={() => setOpenFilter(false)}
        >
          취소
        </DesignButton>
      </div>
    </div>
  );
};

export default TrendingFilter;
