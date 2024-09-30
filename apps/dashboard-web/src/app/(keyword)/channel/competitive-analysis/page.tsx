'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';
import type { Route } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import SvgComp from '@/components/common/SvgComp';
import ParamsTabNav from '@/components/common/Tab/ParamsTabNav';
import { cn } from '@/utils/cn';

import GNBSearchbar from '../../GNBSearchbar';
import {
  CHANNEL_COMPARISON_TAB_LIST,
  CHANNEL_VIEW_TYPE_TAB_LIST,
} from '../../keyword/[keyword]/[related_word]/tabList';
import BoxFrame from '../../keyword/BoxFrame';
import MainSearchbar from '../../MainSearchbar';
import AnalysisChannelList from './AnalysisChannelList';
import ChannelFilterContextProvider from './ChannelFilterContext';
import ChannelFilterDropdown from './ChannelFilterDropdown';
import ChannelList from './ChannelList';
import ChannelSearchbar from './ChannelSearchbar';
import ContentComparison from './ContentComparison';
import ContentView from './ContentView';
import RecommendedChanelList from './RecommendedChannelList';
import SearchFilterDropdown from './SearchFilterDropdown';

const Page = () => {
  const searchParams = useSearchParams();

  const channelViewType = searchParams?.get('channel-views');
  return (
    <>
      <div className="mt-5 flex justify-center ">
        <ChannelSearchbar />
      </div>
      {/* <Test></Test> */}
      <div className="grid grid-cols-[minmax(900px,3fr),minmax(300px,1fr)] gap-[20px] pt-[20px]">
        {/* box frame px커스텀 */}
        <div
          className={cn(
            'border-grey400 rounded-10  border px-[0px] py-[20px] flex flex-col',
          )}
        >
          <div>
            <ChannelFilterContextProvider>
              <div className="px-[20px]">
                <div className="text-grey600 mb-[40px] flex gap-[10px] text-[14px] font-[500]">
                  <p>모니터링 채널 추천</p>
                </div>
                <div className="flex ">
                  <div>
                    <ParamsTabNav
                      tabList={CHANNEL_VIEW_TYPE_TAB_LIST}
                      baseRoute={`/channel` as Route}
                      tabKey="channel-views"
                      paramsKey="channel-views"
                    />
                  </div>
                  <ChannelFilterDropdown />
                </div>

                <div className="border-b-1 border-grey400 font[500] text-grey600  grid select-none grid-cols-[40px,5fr,2fr,2fr,2fr,5fr,2fr,1.5fr] items-center gap-[20px] p-[10px] text-[14px]">
                  <div></div>
                  <div>채널명</div>
                  <div className="text-center ">구독자</div>
                  <div className="text-center">영상 수</div>
                  <div className="text-center">카테고리</div>
                  <div>주 사용 카테고리</div>
                  <div className="text-center">평균 조회수</div>
                  <div className="text-center">유사도</div>
                </div>
              </div>

              {channelViewType === 'recommended-channels' ||
              !channelViewType ? (
                <RecommendedChanelList />
              ) : (
                <ChannelList />
              )}
            </ChannelFilterContextProvider>
          </div>
        </div>
        <BoxFrame isPaddingX={true}>
          <div>
            <div className="px-[20px]">
              <div className="text-grey600 mb-[40px] flex gap-[10px] text-[14px] font-[500]">
                <p>분석채널</p>
              </div>

              <div className="border-b-1 border-grey400 font[500] text-grey600  grid grid-cols-[40px,3fr,2fr] items-center gap-[20px] p-[10px] text-[14px]">
                <div></div>
                <div>채널명</div>
                <div>구독자</div>
              </div>
            </div>
            <AnalysisChannelList />
          </div>
        </BoxFrame>
      </div>
      <div className="my-5">
        <ParamsTabNav
          tabList={CHANNEL_COMPARISON_TAB_LIST}
          baseRoute={`/channel` as Route}
          tabKey="content-view"
          paramsKey="content-view"
        />
      </div>
      <div className="mb-5 flex items-center gap-[20px]">
        <GNBSearchbar callback={() => {}} />
        <SearchFilterDropdown />

        <div className="border-grey400 rounded-10 ml-auto flex items-center  gap-[20px] border px-[20px] py-[8px]">
          <p className="text-grey600 mr-[10px] text-[14px] font-[500]">
            주요 키워드
          </p>

          {[].map((item) => (
            <div
              className="border-grey500 rounded-8 text-grey600 border px-[20px] py-[8px] font-[400]"
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      </div>{' '}
      <ContentView />
    </>
  );
};

export default Page;
