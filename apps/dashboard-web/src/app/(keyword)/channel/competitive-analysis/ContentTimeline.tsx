import { useRef } from 'react';

import useDimensions from '@/hooks/useDimenstions';

const ContentTimeline = () => {
  const selectRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(selectRef);

  return (
    <>
      {' '}
      {['정민', '정민소'].map((item) => (
        <div className="rounded-10 border-grey400 mb-5 flex gap-[10px] overflow-hidden border p-5">
          <div className="flex flex-col justify-evenly">
            <div className="mb-10 flex items-center gap-[16px] ">
              <div className="bg-primary400 h-[100px] w-[100px] rounded-full"></div>

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
        </div>
      ))}
    </>
  );
};

export default ContentTimeline;
