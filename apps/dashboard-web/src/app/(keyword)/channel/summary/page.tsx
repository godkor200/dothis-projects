import BoxFrame from '../../keyword/BoxFrame';
import MediaImageCard from '../../keyword/MediaImageCard';

const Page = () => {
  const channelSummaryList = [
    {
      label: '구독자 수',
      value: '1.05만명',
    },

    {
      label: '평균 조회수',
      value: '993,244,111',
    },
    {
      label: '영상 수',
      value: '1,233',
    },
    {
      label: '평균 좋아요',
      value: '1,234',
    },
    {
      label: '평균 댓글',
      value: '4,222',
    },
  ];
  return (
    <div className="mb-[80px] mt-[20px] flex flex-col gap-[20px]">
      <div>
        <BoxFrame>
          <div className="flex h-[160px] flex-col">
            <div className="text-grey600 mb-[30px] flex gap-[10px] text-[14px] font-[500]">
              <p>조회수 성과</p>
            </div>

            <div className="text-grey900 flex flex-1 items-center justify-normal text-[20px] font-bold">
              <div className="bg-primary300 mr-[30px] h-[100px] w-[100px] rounded-full"></div>
              <div className=" shrink-0 grow">침착맨 채널</div>

              {channelSummaryList.map((summary) => {
                return (
                  <div className="flex w-[196px] flex-col items-center justify-center gap-[5px]">
                    <p className="text-grey500 text-[14px] font-[400]">
                      {summary.label}
                    </p>
                    <p>{summary.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </BoxFrame>
      </div>

      <div>
        <BoxFrame>
          <div className="flex h-[160px] flex-col ">
            <div className="text-grey600 mb-[30px] flex gap-[10px] text-[14px] font-[500]">
              <p>지난 30일 동안의 성장 현황</p>
            </div>

            <div className="text-grey900 flex flex-1 items-center justify-between text-[20px] font-bold">
              {channelSummaryList.map((summary) => {
                return (
                  <div className="flex w-[196px] flex-col items-center justify-center gap-[5px]">
                    <p className="text-grey500 text-[14px] font-[400]">
                      {summary.label}
                    </p>
                    <p>{summary.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </BoxFrame>
      </div>

      <div className="grid grid-cols-[repeat(2,minmax(600px,1fr))] gap-[20px]">
        <BoxFrame>
          <div className="">
            <div className="text-grey600 mb-[40px] flex gap-[10px] text-[14px] font-[500]">
              <p>연간 조회수 BEST</p>
            </div>

            <div className="flex-1 ">
              <MediaImageCard keyword={'여행'} size={2} />
            </div>
          </div>
        </BoxFrame>

        <BoxFrame>
          <div className=" ">
            <div className="text-grey600 mb-[40px] flex gap-[10px] text-[14px] font-[500]">
              <p>연간 참여율 BEST</p>
            </div>

            <div className=" flex-1">
              <MediaImageCard keyword={'여행'} size={2} />
            </div>
          </div>
        </BoxFrame>
      </div>

      <div className="grid grid-cols-[repeat(3,minmax(450px,1fr))] gap-[20px]">
        <BoxFrame>
          <div className="">
            <div className="text-grey600 mb-[40px] flex gap-[10px] text-[14px] font-[500]">
              <p>내 채널 인기 키워드</p>
            </div>

            <div className="h-[250px] flex-1">=</div>
          </div>
        </BoxFrame>

        <BoxFrame>
          <div className=" ">
            <div className="text-grey600 mb-[40px] flex gap-[10px] text-[14px] font-[500]">
              <p>경쟁 채널 신규 영상 키워드</p>
            </div>

            <div className="h-[250px] flex-1">=</div>
          </div>
        </BoxFrame>

        <BoxFrame>
          <div className="">
            <div className="text-grey600 mb-[40px] flex gap-[10px] text-[14px] font-[500]">
              <p>내 핵심 시청자의 관심 키워드</p>
            </div>

            <div className="h-[250px] flex-1">=</div>
          </div>
        </BoxFrame>
      </div>
    </div>
  );
};

export default Page;
