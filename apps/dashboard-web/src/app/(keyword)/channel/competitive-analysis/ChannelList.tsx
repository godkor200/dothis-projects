import 'react-contexify/dist/ReactContexify.css';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Item, Menu, useContextMenu } from 'react-contexify';

import SvgComp from '@/components/common/SvgComp';
import {
  clustersCategories,
  clustersCategoriesOptions,
} from '@/constants/clusterCategories';
import useAddAnalysisChannel from '@/hooks/react-query/mutation/useAddAnalysisChannel';
import useGetChannelList from '@/hooks/react-query/query/useGetChannelList';

import { useChannelFilterContext } from './ChannelFilterContext';

const YOUTUBE_URL = 'https://www.youtube.com';

const ChannelList = () => {
  const { channelCategory, subscriberRange } =
    useChannelFilterContext('ChannelList');

  const router = useRouter();

  const { data } = useGetChannelList({
    channelCluster: channelCategory?.value,

    subscriberRange: subscriberRange?.value,
  });

  const { show, hideAll } = useContextMenu();

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const onContextMenu = ({ event, id }: { event: any; id: string }): void => {
    show({
      event,
      id,
    });
  };

  const { mutate } = useAddAnalysisChannel();

  const handleContextMenuClick = (
    type: 'add_channel' | 'move_channel',
    channelId: string,
  ) => {
    if (type === 'add_channel') {
      mutate(channelId);
      return;
    }

    window.open(`${YOUTUBE_URL}/channel/${channelId}`, '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      // 드롭다운 닫기 로직을 추가 (react-contexify scroll 시 hide 이벤트는 browser event에 바인딩 되어있어서 독립적인 div overflow에 미적용 이슈)
      hideAll();
    };

    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  console.log(data);
  return (
    <div
      className="custom-scroll-box h-[320px] overflow-y-scroll px-[20px]"
      ref={scrollContainerRef}
    >
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
                onClick={(e) =>
                  onContextMenu({ event: e, id: channelId + index })
                }
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
                <div className="truncate text-center">
                  {clustersCategories[channelCluster]}
                </div>
                <div className="truncate">{mainUsedKeywords.join(',')}</div>
                <div className="text-center">
                  {channelAverageViews
                    ? channelAverageViews?.toLocaleString('ko-kr')
                    : channelAverageViews}
                </div>
                <div className="text-center">90%</div>
              </div>

              <Menu id={channelId + index}>
                {[
                  {
                    title: '유튜브 채널로 이동',
                    value: 'move_channel' as const,
                  },
                  {
                    title: '모니터링 추가',
                    value: 'add_channel' as const,
                  },
                ].map(({ title, value }) => (
                  <Item
                    key={value}
                    className="[&_*]:hover:!bg-primary200"
                    // react-contexify 스타일 우선순위로 인한 important 추가 (css 파일을 별도로 만들기 대신 사용)
                    onClick={() => handleContextMenuClick(value, channelId)}
                  >
                    {/* <SvgComp icon="CheckIcon" size={12} /> */}

                    {title}
                  </Item>
                ))}
              </Menu>
            </div>
          );
        },
      )}
    </div>
  );
};

export default ChannelList;
