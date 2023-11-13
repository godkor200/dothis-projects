'use client';

import { ResponsiveRadar } from '@nivo/radar';
import { useState } from 'react';

import { clustersCategories } from '@/constants/clusterCategories';
import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';
import useGetRelWords from '@/hooks/react-query/query/useGetRelWords';
import useGetVideoData from '@/hooks/react-query/query/useGetVideoData';
import { DUMMY_VIEW_DATA } from '@/mocks/monthlyReport/monthlyViewDummyData';
import getMaxValues from '@/utils/contents/getMaxValues';

import MonthlyDataGraphToolTip from './MonthlyDataGraphToolTip';

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

const MonthlyViewData = () => {
  const [selectedType, setSelectedType] = useState<TitleType>('category');
  const { data, isLoading: isWordLoading } = useGetRelWords();
  const { data: viewData, isLoading: isViewLoading } = useGetDailyView();
  const { data: videoData, isLoading: isVideoLoading } = useGetVideoData();

  // const isLoading = isViewLoading || isVideoLoading || isWordLoading;

  if (isWordLoading) return null;

  const categoryViewData: ViewData[] = viewData.map((item, idx) => {
    const result: ViewData = (item ?? []).reduce(
      (acc: ViewData, cur) => {
        acc.views = ((acc.views as number) || 0) + cur.increase_views;
        return acc;
      },
      { views: 0, videoTotalCounts: 0 },
    );

    result.views = result.views || 200;
    result.videoTotalCounts = (videoData[idx]?.total.value as number) ?? 200;

    return result;
  });

  const { maxViews, maxVideoTotalCounts, viewAndVideoMaxValue } =
    getMaxValues(DUMMY_VIEW_DATA);

  // const clusterData: number[] = data && JSON.parse(data.cluster);

  // const convertedDatas = DUMMY_VIEW_DATA.map(
  //   ({ views, videoTotalCounts }, idx) => {
  //     return {
  //       views: (views / maxViews) * viewAndVideoMaxValue,
  //       videoTotalCounts:
  //         (videoTotalCounts / maxVideoTotalCounts) * viewAndVideoMaxValue,
  //       category:
  //         clustersCategories[
  //           clusterData[idx] as keyof typeof clustersCategories
  //         ],
  //     };
  //   },
  // );

  const onClickTitle = (type: TitleType) => {
    setSelectedType(type);
  };

  const toolTipProps = {
    maxViews,
    maxVideoTotalCounts,
    viewAndVideoMaxValue,
  };

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
      <div className="rounded-8 border-grey400 mt-10 flex flex-col border border-solid px-[30px] py-[40px] ">
        <div className="text-t2 text-grey400 flex items-center gap-[10px] font-bold">
          {TITLE_BUTTON.map((item, idx) => (
            <>
              <button
                className={`${
                  selectedType === item.type ? 'text-grey700' : ''
                }`}
                onClick={() => onClickTitle(item.type)}
              >
                {item.label}
              </button>
              {idx !== TITLE_BUTTON.length - 1 && (
                <span className="bg-grey400 h-1 w-1 rounded"></span>
              )}
            </>
          ))}
        </div>
        <div className="h-[315px] w-[406px] self-center">
          {selectedType === 'category' ? (
            <div>
              {/* <ResponsiveRadar
                data={convertedDatas}
                keys={['views', 'videoTotalCounts']}
                indexBy="category"
                valueFormat=">-.2f"
                margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                borderColor={{ from: 'color' }}
                gridLabelOffset={20}
                dotSize={10}
                dotColor={{ theme: 'background' }}
                theme={{
                  labels: { text: { fontSize: '20px' } },
                  axis: {
                    legend: {
                      text: {
                        textColor: '#eee',
                        fontSize: '14px',
                        tickColor: '#eee',
                      },
                    },
                  },
                  fontSize: 16,
                }}
                dotBorderWidth={2}
                colors={{ scheme: 'nivo' }}
                blendMode="multiply"
                motionConfig="wobbly"
                sliceTooltip={({ index, data }) => (
                  <MonthlyDataGraphToolTip
                    data={data}
                    label={index}
                    {...toolTipProps}
                  />
                )}
                legends={[
                  {
                    anchor: 'top-left',
                    direction: 'column',
                    translateX: -50,
                    translateY: -40,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemTextColor: '#999',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemTextColor: '#000',
                        },
                      },
                    ],
                  },
                ]}
              /> */}
            </div>
          ) : (
            <p className="text-t2 flex h-60 w-full items-center justify-center text-center font-bold">
              서비스 준비중 입니다.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MonthlyViewData;
