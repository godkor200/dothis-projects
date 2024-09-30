import Image from 'next/image';
import { Item, Menu, useContextMenu } from 'react-contexify';

import SvgComp from '@/components/common/SvgComp';
import {
  clustersCategories,
  clustersCategoriesOptions,
} from '@/constants/clusterCategories';
import useGetChannelList from '@/hooks/react-query/query/useGetChannelList';

import { useChannelFilterContext } from './ChannelFilterContext';

const ChannelList = () => {
  const { channelCategory, subscriberRange } =
    useChannelFilterContext('ChannelList');

  const { data } = useGetChannelList({
    channelCluster: channelCategory?.value,

    subscriberRange: subscriberRange?.value,
  });

  const { show } = useContextMenu();

  const onContextMenu = ({ event, id }: { event: any; id: string }): void => {
    show({
      event,
      id,
    });
  };

  return (
    <>
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
            <div>
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

              <Menu id={channelId + index} className="">
                {[
                  {
                    title: '유튜브 채널로 이동',
                    value: 'move_channel',
                  },
                  {
                    title: '모니터링 추가',
                    value: 'add_channel',
                  },
                ].map(({ title, value }) => (
                  <Item>
                    <SvgComp icon="CheckIcon" size={12} />

                    {title}
                  </Item>
                ))}
              </Menu>
            </div>
          );
        },
      )}
    </>
  );
};

export default ChannelList;
