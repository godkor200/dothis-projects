import * as D3 from 'd3';
import { useEffect, useRef } from 'react';

import {
  useDailyViewV2,
  useUploadVideoCountFormatterD3,
} from '@/hooks/contents/useChartFormatter';
import useDimensions from '@/hooks/useDimenstions';

import useD3Bar from '../../keyword/[keyword]/[related_word]/summary/useD3Bar';
import useD3Line from '../../keyword/[keyword]/[related_word]/summary/useD3Line';
import useXAxis from '../../keyword/[keyword]/[related_word]/summary/useXAxis';
import useYAxis from '../../keyword/[keyword]/[related_word]/summary/useYAxis';
import TimelineCard from './TimelineCard';

const ContentTimeline = () => {
  return (
    <>
      {['대한민국', '아이돌'].map((item, index) => (
        <div
          className="rounded-10 border-grey400 mb-5 flex gap-[10px] overflow-hidden border p-5"
          key={item + index}
        >
          <div className="flex flex-col justify-evenly">
            <div className="mb-10 flex items-center gap-[16px] ">
              <div className=" h-[100px] w-[100px] rounded-full"></div>

              <p className="text-grey900 font-bold">{item}</p>
            </div>
            <div className="flex text-center">
              <div className="w-[100px]">
                <p className="text-grey400 mb-[10px] text-[14px] font-[400]">
                  구독자 수
                </p>
                <p className="text-grey900 font-bold">1.05만명</p>
              </div>

              <div className="w-[100px]">
                <p className="text-grey400 mb-[10px] text-[14px] font-[400]">
                  평균 조회수
                </p>
                <p className="text-grey900 font-bold">987,321</p>
              </div>
              <div className="w-[100px]">
                <p className="text-grey400 mb-[10px] text-[14px] font-[400]">
                  영상 수
                </p>
                <p className="text-grey900 font-bold">3,456</p>
              </div>
            </div>
          </div>

          <TimelineCard keyword={item} relword={'여행'} index={index} />
        </div>
      ))}
    </>
  );
};

export default ContentTimeline;
