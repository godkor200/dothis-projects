'use client';

import { access } from 'fs';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import DashboardRadarChart from '@/components/common/Charts/DashboardRadarChart';
import { clustersCategories } from '@/constants/clusterCategories';
import type { CategoryTabNavDataCategoryType } from '@/constants/TabNav';
import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';
import useGetRelWords from '@/hooks/react-query/query/useGetRelWords';
import useGetVideoData from '@/hooks/react-query/query/useGetVideoData';
import { DUMMY_VIEW_DATA } from '@/mocks/monthlyReport/monthlyViewDummyData';
import { useSelectedWord } from '@/store/selectedWordStore';
import { handleZeroDivision } from '@/utils/common';
import { getMaxValues, getMaxValuesV2 } from '@/utils/contents/getMaxValues';

import AnalysisWidgetItem from '../AnalysisWidgetItem';

/**
 * 데이터 안정화 되면 custom hooks 주석 풀고 더미 데이터 제거 예정입니다.
 */

type TitleType = (typeof TITLE_BUTTON)[number]['type'];

export interface ViewData {
  views: number;
  videoTotalCounts: number;
}

const TITLE_BUTTON = [
  { label: '주요 카테고리', type: 'category' },
  { label: '채널비교', type: 'channel' },
] as const;

interface Props {
  currentTab: CategoryTabNavDataCategoryType;
}
const MonthlyViewData = ({ currentTab }: Props) => {
  const [selectedType, setSelectedType] = useState<TitleType>('category');

  const seletedWord = useSelectedWord();

  const { data, isLoading: isWordLoading } = useGetRelWords(
    seletedWord.keyword,
  );

  const { data: viewData, isLoading: isViewLoading } =
    useGetDailyView(seletedWord);

  const { data: videoData, isLoading: isVideoLoading } =
    useGetVideoData(seletedWord);

  // const isLoading = isViewLoading || isVideoLoading || isWordLoading;

  const clusterData: number[] = data && JSON.parse(data.cluster);

  const categoryViewData = viewData.map((item, idx) => {
    const result = (item ?? []).reduce(
      (acc, cur) => {
        acc.views = ((acc.views as number) || 0) + cur.videoViews;
        return acc;
      },
      {
        views: 0,
        videoTotalCounts: 0,
        category:
          clusterData &&
          clustersCategories[
            clusterData[idx] as keyof typeof clustersCategories
          ],
      },
    );

    result.views = result.views;
    result.videoTotalCounts = (videoData[idx]?.total as number) || 0;

    return result;
  });

  const categoryView = viewData.map((item, idx) => {
    const result = (item ?? []).reduce(
      (acc, cur) => {
        acc.y = ((acc.y as number) || 0) + cur.videoViews;
        return acc;
      },
      {
        y: 0,
        x:
          clusterData &&
          clustersCategories[
            clusterData[idx] as keyof typeof clustersCategories
          ],
      },
    );

    // result.views = result.views;
    // result.videoTotalCounts = (videoData[idx]?.total.value as number) || 0;

    return result;
  });

  const categoryVideo = videoData.map((item, idx) => {
    return {
      y: item?.total || 0,
      x:
        clusterData &&
        clustersCategories[clusterData[idx] as keyof typeof clustersCategories],
    };
  });

  const {
    maxViews: maxViewsV2,
    maxVideoTotalCounts: maxVideoTotalCountsV2,
    viewAndVideoMaxValue: viewAndVideoMaxValueV2,
  } = getMaxValuesV2(categoryView, categoryVideo);

  const convertedViews = categoryView.map(({ x, y }, idx) => {
    return {
      y: (y / maxViewsV2) * viewAndVideoMaxValueV2,
      x:
        clusterData &&
        clustersCategories[clusterData[idx] as keyof typeof clustersCategories],
    };
  });

  const convertedVideoCounts = categoryVideo.map(({ x, y }, idx) => {
    return {
      y: (y / maxVideoTotalCountsV2) * viewAndVideoMaxValueV2,
      x:
        clusterData &&
        clustersCategories[clusterData[idx] as keyof typeof clustersCategories],
    };
  });

  const { maxViews, maxVideoTotalCounts, viewAndVideoMaxValue } =
    getMaxValues(categoryViewData);

  // 최대값을 백분율로 구해서 서로 개별로 독립적인 백분율 대비 값을 보여준다.

  // 레이더 그래프는 최소가 저 그래프 안에들어온 최소값이 최소 레인지로 잡힌다.
  const convertedDatas = categoryViewData.map(
    ({ views, videoTotalCounts }, idx) => {
      return {
        views: (views / maxViews) * viewAndVideoMaxValue,
        videoTotalCounts:
          (videoTotalCounts / maxVideoTotalCounts) * viewAndVideoMaxValue,
        category:
          clusterData &&
          clustersCategories[
            clusterData[idx] as keyof typeof clustersCategories
          ],
      };
    },
  );

  const maxViewsObject = convertedDatas.reduce(
    (max, current) => (current.views > max.views ? current : max),
    convertedDatas[0],
  );

  const maxVideoCountObject = convertedDatas.reduce(
    (max, current) =>
      current.videoTotalCounts > max.videoTotalCounts ? current : max,
    convertedDatas[0],
  );

  let maxRatioElement = null;

  for (const element of categoryViewData) {
    const ratio =
      element.views /
      (element.videoTotalCounts !== 0 ? element.videoTotalCounts : 1); // Avoid division by zero

    if (!maxRatioElement || ratio > maxRatioElement.ratio) {
      maxRatioElement = { ...element, ratio }; // Store the ratio along with the element
    }
  }

  function getHighestCompetitiveCategory(
    views: typeof convertedViews,
    videoCounts: typeof convertedVideoCounts,
  ) {
    if (views.length !== videoCounts.length) {
      return '두 배열의 길이가 일치하지 않습니다.';
    }

    let averages: { ratio: number; category: string } = {
      ratio: 0,
      category: '',
    };

    // 초기 for in문 순회로 되어있었지만, 배열의 프로토타입 체인에서 열거 가능한 속성 또한 순회하기 때문에 for문으로 수정
    for (let index = 0; index < views.length; index++) {
      const ratio = handleZeroDivision(views[index].y, videoCounts[index].y);

      if (!averages.category || ratio > averages.ratio) {
        averages = {
          ratio,
          category: views[index].x,
        };
      }
    }

    return averages.category;
  }

  const onClickTitle = (type: TitleType) => {
    setSelectedType(type);
  };

  const toolTipProps = {
    maxViews,
    maxVideoTotalCounts,
    viewAndVideoMaxValue,
  };

  const analysisData = [
    {
      title: '조회수가 가장 높은 카테고리',
      content: maxViewsObject?.category || '조회중',
      hasTooltip: false,
      tooltipText: '',
    },

    {
      title: '발행 영상 수가 가장 많은 카테고리',
      content: maxVideoCountObject?.category || '조회중',
      hasTooltip: false,
      tooltipText: '',
    },
    {
      title: '경쟁강도가 가장 좋은 카테고리',
      content:
        getHighestCompetitiveCategory(convertedViews, convertedVideoCounts) ||
        '조회중',
      hasTooltip: false,
      tooltipText: '',
    },
  ];

  if (isWordLoading) return null;

  return (
    <>
      {/* <h3 className="typo-t2 mt-10 flex items-center gap-[4px]">
        월간 View
        <SvgComp icon="Question" size={18} />
      </h3>
      <ul className="mt-5 flex gap-[20px]">
        {MONTHLY_VIEW_DUMMY_DATA.map(({ title, content }) => (
          <SummaryItem key={title} title={title} content={content} />
        ))}
      </ul> */}

      <div className="mt-10 flex  justify-between px-[30px] py-[40px]">
        {currentTab === 'category' ? (
          <>
            <div className="flex flex-1 justify-center">
              <div className="h-[315px] w-[406px]  self-center  [&_svg]:overflow-visible">
                <DashboardRadarChart
                  series={[
                    {
                      name: '조회 수',
                      data: convertedViews.sort((a, b) =>
                        a.x < b.x ? -1 : a.x > b.x ? 1 : 0,
                      ),
                    },
                    {
                      name: '영상 수',
                      data: convertedVideoCounts.sort((a, b) =>
                        a.x < b.x ? -1 : a.x > b.x ? 1 : 0,
                      ),
                    },
                  ]}
                />
              </div>
            </div>
            <ul className="flex flex-col gap-[20px]">
              {analysisData.map(
                ({ title, content, tooltipText, hasTooltip }) => (
                  <AnalysisWidgetItem
                    key={title}
                    title={title}
                    content={content}
                    hasTooltip={hasTooltip}
                    tooltipText={tooltipText}
                  />
                ),
              )}
            </ul>
          </>
        ) : (
          <p className="text-t2 flex h-60 w-full items-center justify-center text-center font-bold">
            서비스 준비중 입니다.
          </p>
        )}
      </div>
    </>
  );
};

export default MonthlyViewData;
