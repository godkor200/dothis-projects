'use client';

import { ResponsiveRadar } from '@nivo/radar';
import { useState } from 'react';

import SvgComp from '@/components/common/SvgComp';
import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';
import useGetVideoData from '@/hooks/react-query/query/useGetVideoData';
import {
  DUMMY_VIEW_DATA,
  MONTHLY_VIEW_DUMMY_DATA,
} from '@/mocks/monthlyReport/monthlyViewDummyData';

import SummaryItem from '../AnalysisWidgetItem';

type TitleType = 'category' | 'channel';

const TITLE_BUTTON = [
  { label: '주요 카테고리', type: 'category' },
  { label: '채널비교', type: 'channel' },
] as const;

const MonthlyViewData = () => {
  const [selectedType, setSelectedType] = useState('category');
  const { data: viewData, isLoading: isViewLoading } = useGetDailyView();
  const { data: videoData, isLoading: isVideoLoading } = useGetVideoData();
  const isLoading = isViewLoading || isVideoLoading;

  // if (isLoading) return null;

  const categoryViewData = viewData.map((item, idx) => {
    const result = item?.reduce((acc: Record<string, string | number>, cur) => {
      acc.views = ((acc.views as number) || 0) + cur.increase_views;

      return acc;
    }, {});

    if (result) {
      result.views = result.views || 200;
      result.videoTotalCounts = videoData[idx]?.total.value as number;
    }

    return result;
  });

  const onClickTitle = (type: TitleType) => {
    setSelectedType(type);
  };

  return (
    <>
      <h3 className="mt-10 flex items-center gap-[4px] typo-t2">
        월간 View
        <SvgComp icon="Question" size={18} />
      </h3>
      <ul className="mt-5 flex gap-[20px]">
        {MONTHLY_VIEW_DUMMY_DATA.map(({ title, content }) => (
          <SummaryItem key={title} title={title} content={content} />
        ))}
      </ul>
      <div className="mt-10 flex flex-col rounded-8 border border-solid border-grey400 px-[30px] py-[40px] ">
        <div className="flex items-center gap-[10px] text-t2 font-bold text-grey400">
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
                <span className="h-1 w-1 rounded bg-grey400"></span>
              )}
            </>
          ))}
        </div>
        <div className="h-[315px] w-[406px] self-center">
          <ResponsiveRadar
            data={DUMMY_VIEW_DATA}
            keys={['views', 'videoTotalCounts']}
            indexBy="videoTotalCounts"
            valueFormat=">-.2f"
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            borderColor={{ from: 'color' }}
            gridLabelOffset={36}
            dotSize={10}
            dotColor={{ theme: 'background' }}
            dotBorderWidth={2}
            colors={{ scheme: 'nivo' }}
            blendMode="multiply"
            motionConfig="wobbly"
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
          />
        </div>
      </div>
    </>
  );
};

export default MonthlyViewData;
