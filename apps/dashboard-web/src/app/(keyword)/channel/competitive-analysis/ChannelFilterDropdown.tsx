'use client';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import SvgComp from '@/components/common/SvgComp';

const CHANNEL_DATA_FILTER = [
  {
    title: '채널명',
    value: 'channel_name',
  },
  {
    title: '썸네일',
    value: 'channel_thumbnail',
  },
  {
    title: '카테고리',
    value: 'channel_category',
  },
  {
    title: '주사용키워드',
    value: 'mainly_used_keyword',
  },
];

const CHANNEL_HISTORY_FILTER = [
  {
    title: '구독자',
    value: 'channel_subscriber',
  },
  {
    title: '평균조회수',
    value: 'channel_average_views',
  },
];

const ChannelFilterDropdown = () => {
  return (
    <div className="ml-auto flex">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <div className="border-grey400 rounded-s-10 group flex cursor-pointer items-center gap-[10px] border px-[40px] py-[10px]">
            {/* Step 2: Add peer class to the <p> tag */}
            <p className="text-grey500 text-[14px] font-[500]">카테고리</p>
            <SvgComp
              icon="DropdownArrow"
              width={10}
              height={5}
              className="group-data-[state=open]:rotate-180"
            />
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
            {CHANNEL_DATA_FILTER.map(({ title, value }) => (
              <DropdownMenu.CheckboxItem
                className="DropdownMenuCheckboxItem"
                checked={value === 'channel_category'}
              >
                <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                  <SvgComp icon="CheckIcon" size={12} />
                </DropdownMenu.ItemIndicator>
                {title}
              </DropdownMenu.CheckboxItem>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>{' '}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <div className="border-grey400 rounded-e-10 group  flex items-center gap-[10px] border px-[40px] py-[10px]">
            <p className="text-grey500 text-[14px] font-[500]">구독자</p>
            <SvgComp
              icon="DropdownArrow"
              width={10}
              height={5}
              className="group-data-[state=open]:rotate-180"
            />
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
            {CHANNEL_HISTORY_FILTER.map(({ title, value }) => (
              <DropdownMenu.CheckboxItem
                className="DropdownMenuCheckboxItem"
                checked={value === 'channel_category'}
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
    </div>
  );
};

export default ChannelFilterDropdown;
