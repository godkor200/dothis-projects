import Image from 'next/image';

import useGetChannelList from '@/hooks/react-query/query/useGetChannelList';

import { useChannelFilterContext } from './ChannelFilterContext';

const RecommendedChanelList = () => {
  const { channelCategory, subscriberRange } = useChannelFilterContext(
    'RecommededChannelList',
  );

  const { data } = useGetChannelList({
    channelCluster: channelCategory?.value,

    subscriberRange: subscriberRange?.value,
  });

  return (
    <div className="custom-scroll-box relative h-[320px] overflow-hidden px-[20px]">
      <div className="pointer-events-none blur-sm">
        {data?.data.map(
          (
            {
              channelId,
              channelName,
              channelSubscribers,
              channelThumbnail,
              channelCluster,
              channelAverageViews,
              mainUsedKeywords,
            },
            index,
          ) => {
            const compactNumber = new Intl.NumberFormat('ko', {
              notation: 'compact',
            });

            return (
              <div key={channelId + index}>
                <div
                  className="text-grey600 grid cursor-pointer  grid-cols-[40px,5fr,2fr,2fr,2fr,5fr,2fr,1.5fr] items-center gap-x-[20px] truncate p-[10px] text-[14px] font-[500] "
                  onClick={(e) => {}}
                >
                  {channelThumbnail ? (
                    <Image
                      src={channelThumbnail}
                      width={40}
                      height={40}
                      alt={channelId}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="bg-sky h-10 w-10 rounded-full"></div>
                  )}
                  <div className="truncate">{channelName}</div>
                  <div className="text-center">
                    {channelSubscribers
                      ? compactNumber.format(channelSubscribers)
                      : channelSubscribers}
                  </div>
                  <div className="text-center"></div>
                  <div className="truncate text-center"></div>
                  <div className="truncate">{mainUsedKeywords.join(',')}</div>
                  <div className="text-center">
                    {channelAverageViews
                      ? channelAverageViews?.toLocaleString('ko-kr')
                      : channelAverageViews}
                  </div>
                  <div className="text-center">90%</div>
                </div>
              </div>
            );
          },
        )}
      </div>

      <div className="absolute inset-0 flex items-center justify-center  bg-opacity-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            채널을 등록하면 AI가 채널을 추천해드립니다.{' '}
          </h1>
          <p className="mt-2 text-lg">서비스 준비 중입니다.</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendedChanelList;
