'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Button as DesignButton } from 'dashboard-storybook/src/components/Button/Button';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import LoginFrame from '@/components/Auth/LoginFrame';
import SignUpModal from '@/components/common/Modal/ModalContent/SignUpModal';
import TrendingModal from '@/components/common/Modal/ModalContent/TrendingModal';
import SvgComp from '@/components/common/SvgComp';
import { Button } from '@/components/MainContents/KeywordSearch/style';
import TrendingFilter from '@/components/Trending/TrendingFilter';
import { clustersCategories } from '@/constants/clusterCategories';
import { WEEKLY_SORT_OPTION } from '@/constants/weeklySortOption';
import type { Weekly_Sort_Key } from '@/hooks/react-query/query/useGetTrendingKeywords';
import useGetTrendingKeywords from '@/hooks/react-query/query/useGetTrendingKeywords';
import useGetTrendingKeywordsV2 from '@/hooks/react-query/query/useGetTrendingKeywordsV2';
import { useAuthActions, useIsSignedIn } from '@/store/authStore';
import { useModalActions } from '@/store/modalStore';
import { cn } from '@/utils/cn';
import {
  CompetitionTag,
  convertCompetitionFormat,
  convertCompetitionScoreFormat,
} from '@/utils/contents/competitionScore';

import { useOpenFilterContext } from './OpenFilterContext';
import { useTrendingQueryContext } from './TrendingQueryContext';

type SortParamsState = {
  sort: Weekly_Sort_Key;
  order: 'asc' | 'desc';
};

type UseGetTrendingKeywordsV2Data = ReturnType<
  typeof useGetTrendingKeywordsV2
>['data'];

const Page = () => {
  const pathName = usePathname();

  const { trendingQueryOption, setTrendingQueryOption } =
    useTrendingQueryContext('RankPage');

  const { openFilter, setOpenFilter } = useOpenFilterContext('RankPage');

  // const { setIsModalOpen, setModalContent } = useModalActions();
  const { setIsRouterModalOpen, setModalContent, setIsModalOpen } =
    useModalActions();
  const [sortingParams, setSortingParams] = useState<SortParamsState>({
    sort: 'weeklyViews',
    order: 'desc',
  });

  const [selectOptions, setSelectOptions] = useState<
    { value: number; label: string }[]
  >([]);

  const [keywordList, setKeywordList] = useState<string[]>([]);

  const [startDate, setStartDate] = useState(
    dayjs().startOf('week').subtract(2, 'week').add(1, 'day'),
  );

  const isSignedIn = useIsSignedIn();

  const isEnableRouterScroll = isSignedIn;

  const { setIsOpenSignUpModal } = useAuthActions();

  const router = useRouter();

  const { data, total, fetchNextPage, hasNextPage, isLoading, isFetching } =
    useGetTrendingKeywordsV2({
      selectOptions: trendingQueryOption.selectOptions,
      keywordList: trendingQueryOption.keywordList,
      startDate: trendingQueryOption.startDate,
      order: sortingParams.order,
      sort: sortingParams.sort,
    });

  const handleFetchNextPage = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (isSignedIn) {
      event.preventDefault();
      fetchNextPageWithCheck();
    }

    // if(basic){
    // 회원 레벨 조건
    // }
  };

  const fetchNextPageWithCheck = () => {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  };

  const sortData = (
    data: UseGetTrendingKeywordsV2Data,
    sortingParams: SortParamsState,
  ) => {
    if (!data) return;

    const { sort, order } = sortingParams;

    const sortedData = [...data].sort((a, b) => {
      let compareA = a[sort];
      let compareB = b[sort];

      // 숫자형, 문자형 데이터 모두를 비교하기 위해 일반적인 비교 함수를 사용
      if (typeof compareA === 'number' && typeof compareB === 'number') {
        return order === 'asc' ? compareA - compareB : compareB - compareA;
      } else if (typeof compareA === 'string' && typeof compareB === 'string') {
        return order === 'asc'
          ? compareA.localeCompare(compareB)
          : compareB.localeCompare(compareA);
      } else {
        return 0; // 다른 경우의 비교 로직 추가 가능
      }
    });

    return sortedData;
  };

  // 데이터 정렬
  const sortedData = sortData(data, sortingParams);

  const handleDeleteKeyword = (keyword: string) => {
    setKeywordList((prev) => prev.filter((item) => item !== keyword));

    setTrendingQueryOption((prev) => ({
      ...prev,
      keywordList: prev.keywordList.filter((item) => item !== keyword),
    }));
  };

  const handleDeleteCategory = (categoryOption: {
    value: number;
    label: string;
  }) => {
    setSelectOptions((prev) =>
      prev.filter((item) => item.value !== categoryOption.value),
    );
    setTrendingQueryOption((prev) => ({
      ...prev,
      selectOptions: prev.selectOptions.filter(
        (item) => item.value !== categoryOption.value,
      ),
    }));
  };

  const sortByTableKey = (key: Weekly_Sort_Key) => {
    if (key === 'ranking' || key === 'category') {
      return;
    }
    setSortingParams((prev) => {
      if (prev.sort === key) {
        return { ...prev, order: prev.order === 'asc' ? 'desc' : 'asc' };
      }
      return { ...prev, sort: key };
    });
  };

  return (
    <>
      <div className="relative">
        <div className="min-h-[1200px] px-[66px] pb-[300px]">
          <div className=" mx-auto max-w-[1546px] ">
            <div className="flex items-center gap-[28px] py-[30px]">
              <p className="text-grey700 font-bold text-[16x]">
                키워드 {total || 0}개
              </p>
              <p className="text-grey500 text-[14px]">
                {trendingQueryOption.startDate.format('YYYY-MM-DD') +
                  ' ~ ' +
                  trendingQueryOption.startDate
                    .add(6, 'day')
                    .format('YYYY-MM-DD')}
              </p>

              <div
                className={cn(
                  'rounded-8 border-grey400  flex h-[52px] w-[52px] items-center justify-center border cursor-pointer',
                  { '[&_path]:stroke-[#F0516D] bg-primary100': openFilter },
                )}
                onClick={() => setOpenFilter((prev) => !prev)}
              >
                <SvgComp icon="Filter" size={22} />
              </div>
            </div>
            {(!!trendingQueryOption.keywordList.length ||
              !!trendingQueryOption.selectOptions.length) && (
              <div className="flex  items-center gap-[20px]  py-[24px]">
                <h3 className="text-grey600 font-bold">검색 키워드</h3>
                <ul className="flex items-center gap-[10px]">
                  {trendingQueryOption.keywordList.map((item) => (
                    <li key={item}>
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
                    </li>
                  ))}
                  {trendingQueryOption.selectOptions.map((item) => (
                    <li key={item.value}>
                      {/* <Button key={item.value} $active={true}> */}
                      <button className="bg-chip-blueBg rounded-8 relative flex shrink-0 items-center gap-[8px] px-[20px] py-[8px] text-[14px] text-[#818cf8] shadow-[0_0_0_2px_rgba(129,140,248,0.6)] ">
                        {item.label.replace('#', '').replace('*', '')}

                        <div className="group/remove">
                          <SvgComp
                            icon="KeywordDelete"
                            size="1rem"
                            className="[&_path]:fill-[#818cf8] [&_path]:stroke-[#818cf8] group-hover/remove:[&_path]:stroke-white"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleDeleteCategory(item);
                            }}
                          />
                        </div>
                      </button>
                      {/* 여기서 X버튼으로 delete시 modal을 하나 생성하고 지우는게 좋을 듯 싶다. */}
                      {/* </Button> */}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="bg-grey00 rounded-8 min-w-[1050px] px-5 pt-5 shadow-[inset_0_0_0_2px_rgb(228,228,231)]">
              <div className="grid grid-cols-[1fr_4fr_3fr_3fr_minmax(160px,4fr)_3fr_3fr_3fr_2fr] gap-[12px] py-[18px] pl-[18px] shadow-[inset_0_-1px_0_0_#d4d4d8]">
                {WEEKLY_SORT_OPTION.map(({ label, key }) => (
                  <div
                    key={key}
                    className={cn(
                      'text-grey500 before:bg-grey00 relative mx-auto w-fit cursor-pointer text-center text-[14px] font-bold',
                      {
                        ' before:absolute before:right-[-12px] before:top-1/2  before:mt-[-9px]  before:block before:h-0 before:w-0 before:border-4 before:border-transparent before:border-b-[#bfbfbf] after:absolute after:right-[-12px] after:top-1/2 after:mt-[1px] after:block after:h-0 after:w-0 after:border-4 after:border-transparent after:border-t-[#bfbfbf]':
                          key !== 'ranking' &&
                          key !== 'category' &&
                          key !== 'competitive',
                        'before:border-b-[#000]':
                          sortingParams.sort === key &&
                          sortingParams.order === 'asc',
                        'after:border-t-[#000]':
                          sortingParams.sort === key &&
                          sortingParams.order === 'desc',
                      },
                    )}
                    onClick={() => {
                      sortByTableKey(key);
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>
              <ul>
                {data?.map((item, index, arr) => {
                  const competitionConfig = convertCompetitionFormat({
                    competitionScore: item.competitive,
                    totalDailyView: item.weeklyViews,
                    videoCount: item.videoCount,
                  });

                  const formattedCluster = parseInt(
                    item.category ?? '0',
                    10,
                  ).toString();
                  const repCategory = extractValue(
                    clustersCategories[formattedCluster],
                  );

                  return (
                    <li
                      key={index}
                      className={cn(
                        'grid grid-cols-[1fr_4fr_3fr_3fr_minmax(160px,4fr)_3fr_3fr_3fr_2fr] pl-[18px] items-center gap-[12px] group font-[500]',
                        {
                          'shadow-[inset_0_-2px_0_0_#f4f4f5]':
                            index !== arr.length - 1 || hasNextPage,
                        },
                      )}
                    >
                      <div className=" items-center gap-[10px]">
                        <div className="text-grey700 py-[26px]  text-center text-[14px]  ">
                          {Number(item.ranking)}
                        </div>
                      </div>
                      <div className="text-grey700 truncate py-[26px] text-center text-[14px]">
                        {item.keyword}
                      </div>
                      <div className="text-grey600 py-[26px]  text-center text-[14px]  ">
                        {Number(item.weeklyViews)?.toLocaleString('ko-kr')}
                      </div>
                      <div className="text-grey600 py-[26px]  text-center text-[14px]  ">
                        {item.videoCount?.toLocaleString('ko-kr')}
                      </div>
                      <div className="text-grey700    w-full py-[26px] text-center text-[14px] font-[400]">
                        {clustersCategories[formattedCluster] && (
                          <button className="border-grey500  text-grey900 max-w-[160px] truncate rounded-[4px] border  px-5 py-[6px]">
                            {repCategory}
                          </button>
                        )}
                        {/* clustersCategories 갱신필요 */}
                      </div>
                      <div className="text-grey700 py-[26px] text-center text-[14px]  ">
                        <span
                          style={{
                            color: competitionConfig.color,
                            backgroundColor: competitionConfig.backgroundColor,
                          }}
                          className="rounded-8 px-[10px] py-[6px]"
                        >
                          {competitionConfig.content}
                        </span>
                      </div>
                      <div className="text-grey700 py-[26px] text-center text-[14px] font-bold ">
                        {item.lastRanking?.toLocaleString('ko-kr')}
                      </div>
                      <div className="text-grey700 py-[26px] text-center text-[14px] font-bold ">
                        {item.megaChannel?.toLocaleString('ko-kr')}
                      </div>
                      <div className="invisible group-hover:visible">
                        <Link
                          href={`/login?previous_url=${pathName}`}
                          onClick={(event) => {
                            if (isSignedIn) {
                              event.preventDefault();

                              router.push(`/keyword/${item.keyword}`);
                            }
                          }}
                          scroll={isEnableRouterScroll}
                        >
                          <DesignButton theme="outlined" size="S">
                            자세히
                          </DesignButton>
                        </Link>
                      </div>
                    </li>
                  );
                })}

                {hasNextPage && (
                  <div className="flex justify-center py-[42px]">
                    <Link
                      href={`/login?previous_url=${pathName}`}
                      onClick={(event) => handleFetchNextPage(event)}
                      scroll={isEnableRouterScroll}
                    >
                      <DesignButton theme="outlined" size="L">
                        더보기
                      </DesignButton>
                    </Link>
                  </div>
                )}
              </ul>
            </div>

            {openFilter && (
              <TrendingFilter
                selectOptions={selectOptions}
                setSelectOptions={setSelectOptions}
                keywordList={keywordList}
                setKeywordList={setKeywordList}
                startDate={startDate}
                setStartDate={setStartDate}
                setTrendingQueryOption={setTrendingQueryOption}
                setOpenFilter={setOpenFilter}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

const extractValue = (str: string) => {
  if (!str) return;

  const parts = str.split('>');

  return parts[parts.length - 1].trim(); // `>` 뒤의 부분 반환
};
