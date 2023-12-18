'use client';

import type { GridLabelProps } from '@nivo/radar';
import { ResponsiveRadar } from '@nivo/radar';
import { access } from 'fs';
import { useState } from 'react';

import { clustersCategories } from '@/constants/clusterCategories';
import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';
import useGetRelWords from '@/hooks/react-query/query/useGetRelWords';
import useGetVideoData from '@/hooks/react-query/query/useGetVideoData';
import { DUMMY_VIEW_DATA } from '@/mocks/monthlyReport/monthlyViewDummyData';
import { useSelectedWord } from '@/store/selectedWordStore';
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
  const selectedRelWord = useSelectedWord();
  const { data, isLoading: isWordLoading } = useGetRelWords();
  const { data: viewData, isLoading: isViewLoading } = useGetDailyView();
  const { data: videoData, isLoading: isVideoLoading } = useGetVideoData();

  // const isLoading = isViewLoading || isVideoLoading || isWordLoading;

  const clusterData: number[] = data && JSON.parse(data.cluster);

  const categoryViewData = viewData.map((item, idx) => {
    const result = (item ?? []).reduce(
      (acc, cur) => {
        acc.views = ((acc.views as number) || 0) + cur.increase_views;
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
    result.videoTotalCounts = (videoData[idx]?.total.value as number) || 0;

    return result;
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

  const onClickTitle = (type: TitleType) => {
    setSelectedType(type);
  };

  const toolTipProps = {
    maxViews,
    maxVideoTotalCounts,
    viewAndVideoMaxValue,
  };

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

      <div className="rounded-8 border-grey400 mt-10 flex flex-col border border-solid px-[30px] py-[40px] ">
        <div className="text-t2 text-grey400 flex items-center gap-[10px] font-bold">
          {TITLE_BUTTON.map((item, idx) => (
            <div key={idx} className="flex items-center gap-[10px]">
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
            </div>
          ))}
        </div>
        <div className="h-[315px] w-[406px] self-center [&_svg]:overflow-visible">
          {selectedType === 'category' ? (
            <ResponsiveRadar
              data={convertedDatas}
              keys={['views', 'videoTotalCounts']}
              indexBy="category"
              valueFormat=">-.2f"
              margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
              borderColor={{ from: 'color' }}
              gridLabelOffset={36}
              dotSize={10}
              dotColor={{ theme: 'background' }}
              dotBorderWidth={2}
              colors={{ scheme: 'nivo' }}
              theme={{
                legends: {
                  text: { fontSize: 12, fontWeight: 700 },
                },
                labels: {
                  text: { fontSize: 22, fontWeight: 900 },
                },
                textColor: '#999d3e',
              }}
              blendMode="multiply"
              motionConfig="wobbly"
              animate={false}
              gridLabel={LabelComponent}
              legends={[
                {
                  data: [
                    {
                      id: 'views',
                      label: '일일 조회 수',
                    },
                    {
                      id: 'videoTotalCounts',
                      label: '누적 영상 수 ',
                    },
                  ],
                  anchor: 'bottom-right',
                  direction: 'column',
                  translateX: -50,
                  translateY: -80,
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
              sliceTooltip={({ index, data }) => (
                <MonthlyDataGraphToolTip
                  data={data}
                  label={index}
                  {...toolTipProps}
                />
              )}
            />
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

const LabelComponent = ({ id, x, y, anchor }: GridLabelProps) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <text
        textAnchor={anchor}
        style={{
          fontSize: 14,
          fontWeight: 'bold',
        }}
      >
        {id}
      </text>
      {/* <text
        y={24}
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          fill: '#3a9896',
        }}
      >
        +{Math.round(Math.random() * 100)}%
      </text> */}
    </g>
  );
};
