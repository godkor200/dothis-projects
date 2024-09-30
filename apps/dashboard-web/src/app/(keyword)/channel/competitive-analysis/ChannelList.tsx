import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';

import SvgComp from '@/components/common/SvgComp';
import {
  clustersCategories,
  clustersCategoriesOptions,
} from '@/constants/clusterCategories';
import useGetChannelList from '@/hooks/react-query/query/useGetChannelList';

const ChannelList = () => {
  const { data } = useGetChannelList();

  console.log(data);
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
            <DropdownMenu.Root key={channelId}>
              <DropdownMenu.Trigger asChild>
                <div className="text-grey600 grid cursor-pointer  grid-cols-[40px,5fr,2fr,2fr,2fr,5fr,2fr,1.5fr] items-center gap-x-[20px] truncate p-[10px] text-[14px] font-[500] ">
                  <Image
                    src={channelThumbnail}
                    width={40}
                    height={40}
                    alt={channelId}
                    className="rounded-full"
                  />
                  <div className="truncate">{channelName}</div>
                  <div className="text-center">
                    {compactNumber.format(channelSubscribers)}
                  </div>
                  <div className="text-center">미정</div>
                  <div className="text-center">
                    {clustersCategories[channelCluster]}
                  </div>
                  <div className="truncate">{mainUsedKeywords.join(',')}</div>
                  <div className="text-center">
                    {channelAverageViews.toLocaleString('ko-kr')}
                  </div>
                  <div className="text-center">90%</div>
                </div>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="DropdownMenuContent"
                  sideOffset={5}
                >
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
                    <DropdownMenu.CheckboxItem
                      className="DropdownMenuCheckboxItem"
                      checked={value === 'channel_category'}
                      key={title}
                    >
                      <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                        <SvgComp icon="CheckIcon" size={12} />
                      </DropdownMenu.ItemIndicator>
                      {title}
                    </DropdownMenu.CheckboxItem>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          );
        },
      )}
    </>
  );
};

export default ChannelList;
